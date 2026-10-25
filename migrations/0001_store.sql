PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS user (id TEXT PRIMARY KEY,name TEXT NOT NULL,email TEXT NOT NULL UNIQUE,emailVerified INTEGER NOT NULL DEFAULT 0,image TEXT,createdAt INTEGER NOT NULL,updatedAt INTEGER NOT NULL,role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('user','admin')));
CREATE TABLE IF NOT EXISTS session (id TEXT PRIMARY KEY,expiresAt INTEGER NOT NULL,token TEXT NOT NULL UNIQUE,createdAt INTEGER NOT NULL,updatedAt INTEGER NOT NULL,ipAddress TEXT,userAgent TEXT,userId TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE);
CREATE INDEX IF NOT EXISTS session_user ON session(userId);
CREATE TABLE IF NOT EXISTS account (id TEXT PRIMARY KEY,accountId TEXT NOT NULL,providerId TEXT NOT NULL,userId TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,accessToken TEXT,refreshToken TEXT,idToken TEXT,accessTokenExpiresAt INTEGER,refreshTokenExpiresAt INTEGER,scope TEXT,password TEXT,createdAt INTEGER NOT NULL,updatedAt INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS account_user ON account(userId);
CREATE TABLE IF NOT EXISTS verification (id TEXT PRIMARY KEY,identifier TEXT NOT NULL,value TEXT NOT NULL,expiresAt INTEGER NOT NULL,createdAt INTEGER,updatedAt INTEGER);
CREATE INDEX IF NOT EXISTS verification_identifier ON verification(identifier);
CREATE TABLE IF NOT EXISTS products(id TEXT PRIMARY KEY,slug TEXT NOT NULL UNIQUE,sku TEXT NOT NULL UNIQUE,name TEXT NOT NULL,category TEXT NOT NULL,subcategory TEXT NOT NULL,collection TEXT NOT NULL,description TEXT NOT NULL,composition TEXT NOT NULL,care TEXT NOT NULL,fit TEXT NOT NULL,price INTEGER NOT NULL CHECK(price>=0),old_price INTEGER CHECK(old_price IS NULL OR old_price>price),images TEXT NOT NULL DEFAULT '[]',is_new INTEGER NOT NULL DEFAULT 0,rank INTEGER NOT NULL DEFAULT 0,status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('published','draft','archived')));
CREATE INDEX IF NOT EXISTS products_category ON products(status,category,collection);
CREATE TABLE IF NOT EXISTS variants(id TEXT PRIMARY KEY,product_id TEXT NOT NULL REFERENCES products(id),sku TEXT NOT NULL UNIQUE,color TEXT NOT NULL,color_hex TEXT NOT NULL,size TEXT NOT NULL,stock INTEGER NOT NULL CHECK(stock>=0),UNIQUE(product_id,color,size));
CREATE INDEX IF NOT EXISTS variants_product ON variants(product_id);
CREATE TABLE IF NOT EXISTS shop_settings(id TEXT PRIMARY KEY,value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS user_state(user_id TEXT PRIMARY KEY REFERENCES user(id) ON DELETE CASCADE,cart TEXT NOT NULL DEFAULT '[]',favorites TEXT NOT NULL DEFAULT '[]');
CREATE TABLE IF NOT EXISTS addresses(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,name TEXT NOT NULL,city TEXT NOT NULL,address TEXT NOT NULL,postal_code TEXT NOT NULL DEFAULT '',phone TEXT NOT NULL DEFAULT '');
CREATE INDEX IF NOT EXISTS addresses_user ON addresses(user_id);
CREATE TABLE IF NOT EXISTS promos(code TEXT PRIMARY KEY,percent INTEGER NOT NULL CHECK(percent BETWEEN 1 AND 90),active INTEGER NOT NULL DEFAULT 1,expires_at TEXT,min_subtotal INTEGER NOT NULL DEFAULT 0 CHECK(min_subtotal>=0),max_uses INTEGER CHECK(max_uses IS NULL OR max_uses>0),uses INTEGER NOT NULL DEFAULT 0 CHECK(uses>=0));
INSERT OR IGNORE INTO promos(code,percent,active,min_subtotal) VALUES('LEGACY10',10,1,0);
CREATE TABLE IF NOT EXISTS orders(id TEXT PRIMARY KEY,number TEXT NOT NULL UNIQUE,user_id TEXT REFERENCES user(id),guest_hash TEXT NOT NULL,idempotency_key TEXT NOT NULL UNIQUE,request_hash TEXT NOT NULL,created_at TEXT NOT NULL,status TEXT NOT NULL CHECK(status IN ('awaiting_payment','paid','processing','shipped','delivered','cancelled')),payment_status TEXT NOT NULL CHECK(payment_status IN ('pending','paid','declined','cancelled','refunded')),subtotal INTEGER NOT NULL CHECK(subtotal>=0),discount INTEGER NOT NULL CHECK(discount>=0 AND discount<=subtotal),shipping INTEGER NOT NULL CHECK(shipping>=0),total INTEGER NOT NULL CHECK(total=subtotal-discount+shipping),shipping_method TEXT NOT NULL,contact TEXT NOT NULL,promo_code TEXT REFERENCES promos(code),expires_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS orders_user ON orders(user_id,created_at);
CREATE INDEX IF NOT EXISTS orders_expiry ON orders(status,expires_at);
CREATE TABLE IF NOT EXISTS order_items(id TEXT PRIMARY KEY,order_id TEXT NOT NULL REFERENCES orders(id),variant_id TEXT NOT NULL REFERENCES variants(id),name TEXT NOT NULL,slug TEXT NOT NULL,image TEXT NOT NULL,color TEXT NOT NULL,size TEXT NOT NULL,quantity INTEGER NOT NULL CHECK(quantity BETWEEN 1 AND 99),price INTEGER NOT NULL CHECK(price>=0));
CREATE INDEX IF NOT EXISTS order_items_order ON order_items(order_id);
CREATE TABLE IF NOT EXISTS order_history(id TEXT PRIMARY KEY,order_id TEXT NOT NULL REFERENCES orders(id),status TEXT NOT NULL,created_at TEXT NOT NULL,comment TEXT NOT NULL DEFAULT '');
CREATE TABLE IF NOT EXISTS payments(id TEXT PRIMARY KEY,order_id TEXT NOT NULL REFERENCES orders(id),scenario TEXT NOT NULL,created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS rate_limits(key TEXT PRIMARY KEY,count INTEGER NOT NULL,expires_at INTEGER NOT NULL);
CREATE TRIGGER IF NOT EXISTS order_promo BEFORE INSERT ON orders WHEN NEW.promo_code IS NOT NULL BEGIN
 SELECT CASE WHEN NOT EXISTS(SELECT 1 FROM promos WHERE code=NEW.promo_code AND active=1 AND (expires_at IS NULL OR expires_at>NEW.created_at) AND min_subtotal<=NEW.subtotal AND NEW.discount=CAST(NEW.subtotal*percent/100 AS INTEGER) AND (max_uses IS NULL OR uses<max_uses)) THEN RAISE(ABORT,'PROMO_UNAVAILABLE') END;
 UPDATE promos SET uses=uses+1 WHERE code=NEW.promo_code;
END;
CREATE TRIGGER IF NOT EXISTS reserve_stock BEFORE INSERT ON order_items BEGIN
 SELECT CASE WHEN NOT EXISTS(SELECT 1 FROM variants v JOIN products p ON p.id=v.product_id WHERE v.id=NEW.variant_id AND v.stock>=NEW.quantity AND p.status='published') THEN RAISE(ABORT,'STOCK_UNAVAILABLE') END;
 SELECT CASE WHEN NOT EXISTS(SELECT 1 FROM variants v JOIN products p ON p.id=v.product_id WHERE v.id=NEW.variant_id AND p.price=NEW.price) THEN RAISE(ABORT,'PRICE_CHANGED') END;
 UPDATE variants SET stock=stock-NEW.quantity WHERE id=NEW.variant_id;
END;
CREATE TRIGGER IF NOT EXISTS valid_status BEFORE UPDATE OF status ON orders WHEN OLD.status<>NEW.status BEGIN
 SELECT CASE WHEN NOT(
 (OLD.status='awaiting_payment' AND NEW.status IN ('paid','cancelled')) OR
 (OLD.status='paid' AND NEW.status IN ('processing','cancelled')) OR
 (OLD.status='processing' AND NEW.status IN ('shipped','cancelled')) OR
 (OLD.status='shipped' AND NEW.status='delivered')
 ) THEN RAISE(ABORT,'INVALID_STATUS') END;
END;
CREATE TRIGGER IF NOT EXISTS release_stock AFTER UPDATE OF status ON orders WHEN NEW.status='cancelled' AND OLD.status<>'cancelled' BEGIN
 UPDATE variants SET stock=stock+COALESCE((SELECT SUM(quantity) FROM order_items WHERE order_id=NEW.id AND variant_id=variants.id),0) WHERE id IN(SELECT variant_id FROM order_items WHERE order_id=NEW.id);
 UPDATE promos SET uses=uses-1 WHERE code=NEW.promo_code;
END;
CREATE TRIGGER IF NOT EXISTS initial_order_history AFTER INSERT ON orders BEGIN
 INSERT INTO order_history(id,order_id,status,created_at,comment) VALUES(lower(hex(randomblob(16))),NEW.id,NEW.status,NEW.created_at,'Заказ создан. Резерв на 30 минут.');
END;
CREATE TRIGGER IF NOT EXISTS changed_order_history AFTER UPDATE OF status ON orders WHEN OLD.status<>NEW.status BEGIN
 INSERT INTO order_history(id,order_id,status,created_at,comment) VALUES(lower(hex(randomblob(16))),NEW.id,NEW.status,strftime('%Y-%m-%dT%H:%M:%fZ','now'),'');
END;
