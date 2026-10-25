# Integration contract
Root owns build config, worker entry, SSR, integration. Frontend owns src/App.tsx, src/client.tsx, src/styles.css and UI components. Backend owns src/server/* and migrations/*. Catalog agent owns src/catalog.ts, seed.sql, public/images and licenses.
Worker calls handleApi(request, env): Promise<Response | null> from src/server/api.ts for /api/*; export loadBootstrap(request,env): Promise<Bootstrap> and cleanup(env): Promise<void>. Env will be generated, has DB D1, BETTER_AUTH_SECRET, BASE_URL, optional RESEND_API_KEY, MAIL_FROM. Backend owns auth configuration and SQL auth migrations.
JSON endpoints:
GET /api/products?q=&category=&subcategory=&size=&color=&min=&max=&inStock=1&collection=&sale=1&sort=new|price-asc|price-desc|discount|recommended&page=1 => {products,total,page,pages}.
GET /api/products/:slug => {product}; GET /api/config => config. GET /api/me => {user}.
Better Auth standard /api/auth/* endpoints. POST /api/auth/sign-up/email {name,email,password}; /sign-in/email {email,password}; /sign-out {}; /request-password-reset {email,redirectTo}; /reset-password {newPassword,token}.
GET /api/state => {cart:CartLine[],favorites:string[]}; PUT /api/state {cart,favorites}; POST /api/state/merge {cart,favorites} => merged state. Guests use localStorage; authenticated users sync server.
POST /api/quote {items:CartLine[],promoCode?,shippingMethod?} => {items:CartItem[],subtotal,discount,shipping,total,promoCode?,warnings:string[]}.
POST /api/orders {items,promoCode?,shippingMethod,contact,idempotencyKey} => {order,accessToken?}.
GET /api/orders => {orders}; GET /api/orders/:id with X-Order-Token header for guest => {order}.
POST /api/orders/:id/pay {scenario:'success'|'declined'|'cancelled'} + guest token header => {order}.
POST /api/orders/:id/cancel => {order}.
GET/PUT /api/profile => {name,addresses:[{id,name,city,address,postalCode,phone}]}.
Admin server checks role. GET /api/admin => {products,orders,promos,config}; PUT /api/admin/products/:id {product}; POST /api/admin/products {product}; POST /api/admin/orders/:id/status {status,comment}; PUT /api/admin/promos {code,percent,active,expiresAt,minSubtotal,maxUses}; PUT /api/admin/config config.
All errors {error:string,fields?:Record<string,string>} HTTP 4xx/5xx.
Catalog SSR loads all published 32 items initially, frontend filters use GET API. User-specific bootstrap never cached. Guest secure order token stays in session/local storage, not URL query.
App export default App({bootstrap}: {bootstrap:Bootstrap}), no router wrapping internally. Root wraps BrowserRouter / StaticRouter. Home hero image /images/hero.webp; editorial /images/editorial.webp. Use original local SVG products if generated photography cannot be produced, honestly distinguish demo illustrations.
