import type { Product } from './shared';

/** Original LegacyLab demo products. All monetary values are integer kopecks. */
export const demoProducts: Product[] = [
  {
    "id": "p001",
    "slug": "core-01-tee",
    "sku": "LL-001",
    "name": "Футболка Core 01",
    "category": "clothing",
    "subcategory": "t-shirts",
    "collection": "Core Collection",
    "description": "Плотный хлопок, свободный силуэт и небольшой знак LL на груди. Базовый слой, который держит форму и легко сочетается с широкими брюками.",
    "composition": "100% хлопок, джерси 240 г/м²",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Свободная посадка, спущенное плечо.",
    "price": 390000,
    "oldPrice": null,
    "images": [
      "/images/core-01-tee.svg",
      "/images/core-01-tee-study.svg",
      "/images/core-01-tee-graphite.svg"
    ],
    "variants": [
      {
        "id": "p001-c0-s0",
        "productId": "p001",
        "sku": "LL-001-0-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XS",
        "stock": 0
      },
      {
        "id": "p001-c0-s1",
        "productId": "p001",
        "sku": "LL-001-0-1",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "S",
        "stock": 5
      },
      {
        "id": "p001-c0-s2",
        "productId": "p001",
        "sku": "LL-001-0-2",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "M",
        "stock": 6
      },
      {
        "id": "p001-c0-s3",
        "productId": "p001",
        "sku": "LL-001-0-3",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "L",
        "stock": 7
      },
      {
        "id": "p001-c0-s4",
        "productId": "p001",
        "sku": "LL-001-0-4",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XL",
        "stock": 8
      },
      {
        "id": "p001-c1-s0",
        "productId": "p001",
        "sku": "LL-001-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 5
      },
      {
        "id": "p001-c1-s1",
        "productId": "p001",
        "sku": "LL-001-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 6
      },
      {
        "id": "p001-c1-s2",
        "productId": "p001",
        "sku": "LL-001-1-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 7
      },
      {
        "id": "p001-c1-s3",
        "productId": "p001",
        "sku": "LL-001-1-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 8
      },
      {
        "id": "p001-c1-s4",
        "productId": "p001",
        "sku": "LL-001-1-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 9
      }
    ],
    "isNew": true,
    "rank": 0,
    "status": "published"
  },
  {
    "id": "p002",
    "slug": "archive-type-tee",
    "sku": "LL-002",
    "name": "Футболка Archive Type",
    "category": "clothing",
    "subcategory": "t-shirts",
    "collection": "Urban Archive",
    "description": "Графическая футболка с авторской типографикой LegacyLab на спине. Мягкий ворот и удлинённый рукав задают спокойные пропорции.",
    "composition": "100% хлопок, джерси 260 г/м²",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Оверсайз. Для более собранного силуэта выбирайте на размер меньше.",
    "price": 490000,
    "oldPrice": 590000,
    "images": [
      "/images/archive-type-tee.svg",
      "/images/archive-type-tee-study.svg",
      "/images/archive-type-tee-graphite.svg"
    ],
    "variants": [
      {
        "id": "p002-c0-s0",
        "productId": "p002",
        "sku": "LL-002-0-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 7
      },
      {
        "id": "p002-c0-s1",
        "productId": "p002",
        "sku": "LL-002-0-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 8
      },
      {
        "id": "p002-c0-s2",
        "productId": "p002",
        "sku": "LL-002-0-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 9
      },
      {
        "id": "p002-c0-s3",
        "productId": "p002",
        "sku": "LL-002-0-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 10
      },
      {
        "id": "p002-c0-s4",
        "productId": "p002",
        "sku": "LL-002-0-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 11
      },
      {
        "id": "p002-c1-s0",
        "productId": "p002",
        "sku": "LL-002-1-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XS",
        "stock": 8
      },
      {
        "id": "p002-c1-s1",
        "productId": "p002",
        "sku": "LL-002-1-1",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "S",
        "stock": 9
      },
      {
        "id": "p002-c1-s2",
        "productId": "p002",
        "sku": "LL-002-1-2",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "M",
        "stock": 10
      },
      {
        "id": "p002-c1-s3",
        "productId": "p002",
        "sku": "LL-002-1-3",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "L",
        "stock": 11
      },
      {
        "id": "p002-c1-s4",
        "productId": "p002",
        "sku": "LL-002-1-4",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XL",
        "stock": 12
      }
    ],
    "isNew": false,
    "rank": 1,
    "status": "published"
  },
  {
    "id": "p003",
    "slug": "form-box-tee",
    "sku": "LL-003",
    "name": "Футболка Form Box",
    "category": "clothing",
    "subcategory": "t-shirts",
    "collection": "Future Heritage",
    "description": "Квадратный силуэт, чистый перед и плотная горловина. Футболка спроектирована как самостоятельная вещь: носите навыпуск или под лёгкую куртку.",
    "composition": "100% хлопок, джерси 280 г/м²",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Укороченная свободная посадка.",
    "price": 450000,
    "oldPrice": null,
    "images": [
      "/images/form-box-tee.svg",
      "/images/form-box-tee-study.svg",
      "/images/form-box-tee-graphite.svg"
    ],
    "variants": [
      {
        "id": "p003-c0-s0",
        "productId": "p003",
        "sku": "LL-003-0-0",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "XS",
        "stock": 10
      },
      {
        "id": "p003-c0-s1",
        "productId": "p003",
        "sku": "LL-003-0-1",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "S",
        "stock": 11
      },
      {
        "id": "p003-c0-s2",
        "productId": "p003",
        "sku": "LL-003-0-2",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "M",
        "stock": 12
      },
      {
        "id": "p003-c0-s3",
        "productId": "p003",
        "sku": "LL-003-0-3",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "L",
        "stock": 13
      },
      {
        "id": "p003-c0-s4",
        "productId": "p003",
        "sku": "LL-003-0-4",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "XL",
        "stock": 14
      },
      {
        "id": "p003-c1-s0",
        "productId": "p003",
        "sku": "LL-003-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 11
      },
      {
        "id": "p003-c1-s1",
        "productId": "p003",
        "sku": "LL-003-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 12
      },
      {
        "id": "p003-c1-s2",
        "productId": "p003",
        "sku": "LL-003-1-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 13
      },
      {
        "id": "p003-c1-s3",
        "productId": "p003",
        "sku": "LL-003-1-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 14
      },
      {
        "id": "p003-c1-s4",
        "productId": "p003",
        "sku": "LL-003-1-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 0
      }
    ],
    "isNew": false,
    "rank": 2,
    "status": "published"
  },
  {
    "id": "p004",
    "slug": "line-long-tee",
    "sku": "LL-004",
    "name": "Лонгслив Line Study",
    "category": "clothing",
    "subcategory": "t-shirts",
    "collection": "Everyday Objects",
    "description": "Лонгслив из гладкого хлопка с едва заметной линией на рукаве. Прямой крой помогает собрать многослойный образ без лишнего объёма.",
    "composition": "95% хлопок, 5% эластан",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Прямая посадка, длина до середины бедра.",
    "price": 590000,
    "oldPrice": null,
    "images": [
      "/images/line-long-tee.svg",
      "/images/line-long-tee-study.svg",
      "/images/line-long-tee-graphite.svg"
    ],
    "variants": [
      {
        "id": "p004-c0-s0",
        "productId": "p004",
        "sku": "LL-004-0-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XS",
        "stock": 13
      },
      {
        "id": "p004-c0-s1",
        "productId": "p004",
        "sku": "LL-004-0-1",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "S",
        "stock": 14
      },
      {
        "id": "p004-c0-s2",
        "productId": "p004",
        "sku": "LL-004-0-2",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "M",
        "stock": 15
      },
      {
        "id": "p004-c0-s3",
        "productId": "p004",
        "sku": "LL-004-0-3",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "L",
        "stock": 16
      },
      {
        "id": "p004-c0-s4",
        "productId": "p004",
        "sku": "LL-004-0-4",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XL",
        "stock": 0
      },
      {
        "id": "p004-c1-s0",
        "productId": "p004",
        "sku": "LL-004-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 14
      },
      {
        "id": "p004-c1-s1",
        "productId": "p004",
        "sku": "LL-004-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 15
      },
      {
        "id": "p004-c1-s2",
        "productId": "p004",
        "sku": "LL-004-1-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 16
      },
      {
        "id": "p004-c1-s3",
        "productId": "p004",
        "sku": "LL-004-1-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 0
      },
      {
        "id": "p004-c1-s4",
        "productId": "p004",
        "sku": "LL-004-1-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 5
      }
    ],
    "isNew": false,
    "rank": 3,
    "status": "published"
  },
  {
    "id": "p005",
    "slug": "heavy-core-hoodie",
    "sku": "LL-005",
    "name": "Худи Heavy Core",
    "category": "clothing",
    "subcategory": "hoodies",
    "collection": "Core Collection",
    "description": "Объёмный капюшон без шнурков, глубокий карман и тяжёлый футер. Вещь с ощутимой фактурой, которую хочется носить каждый день.",
    "composition": "85% хлопок, 15% полиэстер, футер 420 г/м²",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Оверсайз, спущенное плечо.",
    "price": 990000,
    "oldPrice": null,
    "images": [
      "/images/heavy-core-hoodie.svg",
      "/images/heavy-core-hoodie-study.svg",
      "/images/heavy-core-hoodie-graphite.svg"
    ],
    "variants": [
      {
        "id": "p005-c0-s0",
        "productId": "p005",
        "sku": "LL-005-0-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 16
      },
      {
        "id": "p005-c0-s1",
        "productId": "p005",
        "sku": "LL-005-0-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 4
      },
      {
        "id": "p005-c0-s2",
        "productId": "p005",
        "sku": "LL-005-0-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 5
      },
      {
        "id": "p005-c0-s3",
        "productId": "p005",
        "sku": "LL-005-0-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 0
      },
      {
        "id": "p005-c0-s4",
        "productId": "p005",
        "sku": "LL-005-0-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 7
      },
      {
        "id": "p005-c1-s0",
        "productId": "p005",
        "sku": "LL-005-1-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XS",
        "stock": 4
      },
      {
        "id": "p005-c1-s1",
        "productId": "p005",
        "sku": "LL-005-1-1",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "S",
        "stock": 5
      },
      {
        "id": "p005-c1-s2",
        "productId": "p005",
        "sku": "LL-005-1-2",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "M",
        "stock": 0
      },
      {
        "id": "p005-c1-s3",
        "productId": "p005",
        "sku": "LL-005-1-3",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "L",
        "stock": 7
      },
      {
        "id": "p005-c1-s4",
        "productId": "p005",
        "sku": "LL-005-1-4",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XL",
        "stock": 8
      }
    ],
    "isNew": true,
    "rank": 4,
    "status": "published"
  },
  {
    "id": "p006",
    "slug": "archive-zip-hoodie",
    "sku": "LL-006",
    "name": "Худи Archive Zip",
    "category": "clothing",
    "subcategory": "hoodies",
    "collection": "Urban Archive",
    "description": "Худи на двусторонней молнии с компактным знаком на груди. Два боковых кармана и широкая резинка удерживают свободный силуэт.",
    "composition": "80% хлопок, 20% полиэстер, футер 380 г/м²",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Расслабленная посадка, стандартная длина.",
    "price": 1190000,
    "oldPrice": 1390000,
    "images": [
      "/images/archive-zip-hoodie.svg",
      "/images/archive-zip-hoodie-study.svg",
      "/images/archive-zip-hoodie-graphite.svg"
    ],
    "variants": [
      {
        "id": "p006-c0-s0",
        "productId": "p006",
        "sku": "LL-006-0-0",
        "color": "Серый меланж",
        "colorHex": "#a4a5a0",
        "size": "XS",
        "stock": 6
      },
      {
        "id": "p006-c0-s1",
        "productId": "p006",
        "sku": "LL-006-0-1",
        "color": "Серый меланж",
        "colorHex": "#a4a5a0",
        "size": "S",
        "stock": 7
      },
      {
        "id": "p006-c0-s2",
        "productId": "p006",
        "sku": "LL-006-0-2",
        "color": "Серый меланж",
        "colorHex": "#a4a5a0",
        "size": "M",
        "stock": 0
      },
      {
        "id": "p006-c0-s3",
        "productId": "p006",
        "sku": "LL-006-0-3",
        "color": "Серый меланж",
        "colorHex": "#a4a5a0",
        "size": "L",
        "stock": 9
      },
      {
        "id": "p006-c0-s4",
        "productId": "p006",
        "sku": "LL-006-0-4",
        "color": "Серый меланж",
        "colorHex": "#a4a5a0",
        "size": "XL",
        "stock": 10
      },
      {
        "id": "p006-c1-s0",
        "productId": "p006",
        "sku": "LL-006-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 7
      },
      {
        "id": "p006-c1-s1",
        "productId": "p006",
        "sku": "LL-006-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 0
      },
      {
        "id": "p006-c1-s2",
        "productId": "p006",
        "sku": "LL-006-1-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 9
      },
      {
        "id": "p006-c1-s3",
        "productId": "p006",
        "sku": "LL-006-1-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 10
      },
      {
        "id": "p006-c1-s4",
        "productId": "p006",
        "sku": "LL-006-1-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 11
      }
    ],
    "isNew": false,
    "rank": 5,
    "status": "published"
  },
  {
    "id": "p007",
    "slug": "field-crew",
    "sku": "LL-007",
    "name": "Свитшот Field Crew",
    "category": "clothing",
    "subcategory": "hoodies",
    "collection": "Future Heritage",
    "description": "Лаконичный свитшот с рельефной линией плеча. Мягкая изнанка и широкий манжет делают его удобным вторым слоем для города.",
    "composition": "90% хлопок, 10% полиэстер, футер 360 г/м²",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Свободная посадка, круглая горловина.",
    "price": 850000,
    "oldPrice": null,
    "images": [
      "/images/field-crew.svg",
      "/images/field-crew-study.svg",
      "/images/field-crew-graphite.svg"
    ],
    "variants": [
      {
        "id": "p007-c0-s0",
        "productId": "p007",
        "sku": "LL-007-0-0",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "XS",
        "stock": 9
      },
      {
        "id": "p007-c0-s1",
        "productId": "p007",
        "sku": "LL-007-0-1",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "S",
        "stock": 0
      },
      {
        "id": "p007-c0-s2",
        "productId": "p007",
        "sku": "LL-007-0-2",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "M",
        "stock": 11
      },
      {
        "id": "p007-c0-s3",
        "productId": "p007",
        "sku": "LL-007-0-3",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "L",
        "stock": 12
      },
      {
        "id": "p007-c0-s4",
        "productId": "p007",
        "sku": "LL-007-0-4",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "XL",
        "stock": 13
      },
      {
        "id": "p007-c1-s0",
        "productId": "p007",
        "sku": "LL-007-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 0
      },
      {
        "id": "p007-c1-s1",
        "productId": "p007",
        "sku": "LL-007-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 11
      },
      {
        "id": "p007-c1-s2",
        "productId": "p007",
        "sku": "LL-007-1-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 12
      },
      {
        "id": "p007-c1-s3",
        "productId": "p007",
        "sku": "LL-007-1-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 13
      },
      {
        "id": "p007-c1-s4",
        "productId": "p007",
        "sku": "LL-007-1-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 14
      }
    ],
    "isNew": false,
    "rank": 6,
    "status": "published"
  },
  {
    "id": "p008",
    "slug": "studio-hood",
    "sku": "LL-008",
    "name": "Худи Studio Hood",
    "category": "clothing",
    "subcategory": "hoodies",
    "collection": "Everyday Objects",
    "description": "Молочное худи с объёмным капюшоном и небольшим текстильным ярлыком. Минимум деталей оставляет место для фактуры плотного материала.",
    "composition": "100% хлопок, футер 400 г/м²",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Свободная посадка, удлинённые рукава.",
    "price": 1090000,
    "oldPrice": null,
    "images": [
      "/images/studio-hood.svg",
      "/images/studio-hood-study.svg",
      "/images/studio-hood-graphite.svg"
    ],
    "variants": [
      {
        "id": "p008-c0-s0",
        "productId": "p008",
        "sku": "LL-008-0-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XS",
        "stock": 0
      },
      {
        "id": "p008-c0-s1",
        "productId": "p008",
        "sku": "LL-008-0-1",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "S",
        "stock": 13
      },
      {
        "id": "p008-c0-s2",
        "productId": "p008",
        "sku": "LL-008-0-2",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "M",
        "stock": 14
      },
      {
        "id": "p008-c0-s3",
        "productId": "p008",
        "sku": "LL-008-0-3",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "L",
        "stock": 15
      },
      {
        "id": "p008-c0-s4",
        "productId": "p008",
        "sku": "LL-008-0-4",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XL",
        "stock": 16
      },
      {
        "id": "p008-c1-s0",
        "productId": "p008",
        "sku": "LL-008-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 13
      },
      {
        "id": "p008-c1-s1",
        "productId": "p008",
        "sku": "LL-008-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 14
      },
      {
        "id": "p008-c1-s2",
        "productId": "p008",
        "sku": "LL-008-1-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 15
      },
      {
        "id": "p008-c1-s3",
        "productId": "p008",
        "sku": "LL-008-1-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 16
      },
      {
        "id": "p008-c1-s4",
        "productId": "p008",
        "sku": "LL-008-1-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 4
      }
    ],
    "isNew": false,
    "rank": 7,
    "status": "published"
  },
  {
    "id": "p009",
    "slug": "utility-cargo",
    "sku": "LL-009",
    "name": "Брюки Utility Cargo",
    "category": "clothing",
    "subcategory": "trousers",
    "collection": "Urban Archive",
    "description": "Прямые карго с накладными карманами и регулируемым низом. Плотная ткань сохраняет архитектуру силуэта, а эластичная спинка пояса помогает посадке.",
    "composition": "97% хлопок, 3% эластан, твил",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Прямая широкая штанина, средняя посадка.",
    "price": 1190000,
    "oldPrice": null,
    "images": [
      "/images/utility-cargo.svg",
      "/images/utility-cargo-study.svg",
      "/images/utility-cargo-graphite.svg"
    ],
    "variants": [
      {
        "id": "p009-c0-s0",
        "productId": "p009",
        "sku": "LL-009-0-0",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "XS",
        "stock": 15
      },
      {
        "id": "p009-c0-s1",
        "productId": "p009",
        "sku": "LL-009-0-1",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "S",
        "stock": 16
      },
      {
        "id": "p009-c0-s2",
        "productId": "p009",
        "sku": "LL-009-0-2",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "M",
        "stock": 4
      },
      {
        "id": "p009-c0-s3",
        "productId": "p009",
        "sku": "LL-009-0-3",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "L",
        "stock": 5
      },
      {
        "id": "p009-c0-s4",
        "productId": "p009",
        "sku": "LL-009-0-4",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "XL",
        "stock": 6
      },
      {
        "id": "p009-c1-s0",
        "productId": "p009",
        "sku": "LL-009-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 16
      },
      {
        "id": "p009-c1-s1",
        "productId": "p009",
        "sku": "LL-009-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 4
      },
      {
        "id": "p009-c1-s2",
        "productId": "p009",
        "sku": "LL-009-1-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 5
      },
      {
        "id": "p009-c1-s3",
        "productId": "p009",
        "sku": "LL-009-1-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 6
      },
      {
        "id": "p009-c1-s4",
        "productId": "p009",
        "sku": "LL-009-1-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 7
      }
    ],
    "isNew": true,
    "rank": 8,
    "status": "published"
  },
  {
    "id": "p010",
    "slug": "core-straight-pants",
    "sku": "LL-010",
    "name": "Брюки Core Straight",
    "category": "clothing",
    "subcategory": "trousers",
    "collection": "Core Collection",
    "description": "Универсальные брюки без лишних деталей. Чёткая линия штанины, скрытая застёжка и карманы в боковых швах работают и с футболкой, и с верхней рубашкой.",
    "composition": "65% полиэстер, 32% вискоза, 3% эластан",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Прямая посадка, полная длина.",
    "price": 890000,
    "oldPrice": null,
    "images": [
      "/images/core-straight-pants.svg",
      "/images/core-straight-pants-study.svg",
      "/images/core-straight-pants-graphite.svg"
    ],
    "variants": [
      {
        "id": "p010-c0-s0",
        "productId": "p010",
        "sku": "LL-010-0-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 5
      },
      {
        "id": "p010-c0-s1",
        "productId": "p010",
        "sku": "LL-010-0-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 6
      },
      {
        "id": "p010-c0-s2",
        "productId": "p010",
        "sku": "LL-010-0-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 7
      },
      {
        "id": "p010-c0-s3",
        "productId": "p010",
        "sku": "LL-010-0-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 8
      },
      {
        "id": "p010-c0-s4",
        "productId": "p010",
        "sku": "LL-010-0-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 9
      },
      {
        "id": "p010-c1-s0",
        "productId": "p010",
        "sku": "LL-010-1-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XS",
        "stock": 6
      },
      {
        "id": "p010-c1-s1",
        "productId": "p010",
        "sku": "LL-010-1-1",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "S",
        "stock": 7
      },
      {
        "id": "p010-c1-s2",
        "productId": "p010",
        "sku": "LL-010-1-2",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "M",
        "stock": 8
      },
      {
        "id": "p010-c1-s3",
        "productId": "p010",
        "sku": "LL-010-1-3",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "L",
        "stock": 9
      },
      {
        "id": "p010-c1-s4",
        "productId": "p010",
        "sku": "LL-010-1-4",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XL",
        "stock": 0
      }
    ],
    "isNew": false,
    "rank": 9,
    "status": "published"
  },
  {
    "id": "p011",
    "slug": "wide-loop-pants",
    "sku": "LL-011",
    "name": "Брюки Wide Loop",
    "category": "clothing",
    "subcategory": "trousers",
    "collection": "Future Heritage",
    "description": "Широкие брюки из петлевого футера с мягким поясом. Продольная строчка добавляет форму, а открытый низ позволяет ткани свободно ложиться на обувь.",
    "composition": "100% хлопок, петлевой футер 330 г/м²",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Широкая посадка, внутренний шнурок.",
    "price": 990000,
    "oldPrice": 1190000,
    "images": [
      "/images/wide-loop-pants.svg",
      "/images/wide-loop-pants-study.svg",
      "/images/wide-loop-pants-graphite.svg"
    ],
    "variants": [
      {
        "id": "p011-c0-s0",
        "productId": "p011",
        "sku": "LL-011-0-0",
        "color": "Серый меланж",
        "colorHex": "#a4a5a0",
        "size": "XS",
        "stock": 8
      },
      {
        "id": "p011-c0-s1",
        "productId": "p011",
        "sku": "LL-011-0-1",
        "color": "Серый меланж",
        "colorHex": "#a4a5a0",
        "size": "S",
        "stock": 9
      },
      {
        "id": "p011-c0-s2",
        "productId": "p011",
        "sku": "LL-011-0-2",
        "color": "Серый меланж",
        "colorHex": "#a4a5a0",
        "size": "M",
        "stock": 10
      },
      {
        "id": "p011-c0-s3",
        "productId": "p011",
        "sku": "LL-011-0-3",
        "color": "Серый меланж",
        "colorHex": "#a4a5a0",
        "size": "L",
        "stock": 11
      },
      {
        "id": "p011-c0-s4",
        "productId": "p011",
        "sku": "LL-011-0-4",
        "color": "Серый меланж",
        "colorHex": "#a4a5a0",
        "size": "XL",
        "stock": 0
      },
      {
        "id": "p011-c1-s0",
        "productId": "p011",
        "sku": "LL-011-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 9
      },
      {
        "id": "p011-c1-s1",
        "productId": "p011",
        "sku": "LL-011-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 10
      },
      {
        "id": "p011-c1-s2",
        "productId": "p011",
        "sku": "LL-011-1-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 11
      },
      {
        "id": "p011-c1-s3",
        "productId": "p011",
        "sku": "LL-011-1-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 0
      },
      {
        "id": "p011-c1-s4",
        "productId": "p011",
        "sku": "LL-011-1-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 13
      }
    ],
    "isNew": false,
    "rank": 10,
    "status": "published"
  },
  {
    "id": "p012",
    "slug": "archive-denim",
    "sku": "LL-012",
    "name": "Джинсы Archive Denim",
    "category": "clothing",
    "subcategory": "trousers",
    "collection": "Urban Archive",
    "description": "Прямые джинсы из плотного денима глубокого синего оттенка. Контрастная строчка и лаконичный задний патч отсылают к рабочей одежде.",
    "composition": "100% хлопок, деним 13 oz",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Свободная прямая посадка, средняя талия.",
    "price": 1390000,
    "oldPrice": null,
    "images": [
      "/images/archive-denim.svg",
      "/images/archive-denim-study.svg",
      "/images/archive-denim-graphite.svg"
    ],
    "variants": [
      {
        "id": "p012-c0-s0",
        "productId": "p012",
        "sku": "LL-012-0-0",
        "color": "Тёмно-синий",
        "colorHex": "#344453",
        "size": "XS",
        "stock": 11
      },
      {
        "id": "p012-c0-s1",
        "productId": "p012",
        "sku": "LL-012-0-1",
        "color": "Тёмно-синий",
        "colorHex": "#344453",
        "size": "S",
        "stock": 12
      },
      {
        "id": "p012-c0-s2",
        "productId": "p012",
        "sku": "LL-012-0-2",
        "color": "Тёмно-синий",
        "colorHex": "#344453",
        "size": "M",
        "stock": 13
      },
      {
        "id": "p012-c0-s3",
        "productId": "p012",
        "sku": "LL-012-0-3",
        "color": "Тёмно-синий",
        "colorHex": "#344453",
        "size": "L",
        "stock": 0
      },
      {
        "id": "p012-c0-s4",
        "productId": "p012",
        "sku": "LL-012-0-4",
        "color": "Тёмно-синий",
        "colorHex": "#344453",
        "size": "XL",
        "stock": 15
      },
      {
        "id": "p012-c1-s0",
        "productId": "p012",
        "sku": "LL-012-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 12
      },
      {
        "id": "p012-c1-s1",
        "productId": "p012",
        "sku": "LL-012-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 13
      },
      {
        "id": "p012-c1-s2",
        "productId": "p012",
        "sku": "LL-012-1-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 0
      },
      {
        "id": "p012-c1-s3",
        "productId": "p012",
        "sku": "LL-012-1-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 15
      },
      {
        "id": "p012-c1-s4",
        "productId": "p012",
        "sku": "LL-012-1-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 16
      }
    ],
    "isNew": false,
    "rank": 11,
    "status": "published"
  },
  {
    "id": "p013",
    "slug": "shell-01-jacket",
    "sku": "LL-013",
    "name": "Куртка Shell 01",
    "category": "clothing",
    "subcategory": "outerwear",
    "collection": "Future Heritage",
    "description": "Лёгкая городская оболочка с высоким воротником и скрытыми карманами. Матовый материал, регулируемый низ и свободный крой созданы для многослойности.",
    "composition": "100% полиамид; подкладка: 100% полиэстер",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Свободная посадка, длина до бедра.",
    "price": 1890000,
    "oldPrice": null,
    "images": [
      "/images/shell-01-jacket.svg",
      "/images/shell-01-jacket-study.svg",
      "/images/shell-01-jacket-graphite.svg"
    ],
    "variants": [
      {
        "id": "p013-c0-s0",
        "productId": "p013",
        "sku": "LL-013-0-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 14
      },
      {
        "id": "p013-c0-s1",
        "productId": "p013",
        "sku": "LL-013-0-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 15
      },
      {
        "id": "p013-c0-s2",
        "productId": "p013",
        "sku": "LL-013-0-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 0
      },
      {
        "id": "p013-c0-s3",
        "productId": "p013",
        "sku": "LL-013-0-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 4
      },
      {
        "id": "p013-c0-s4",
        "productId": "p013",
        "sku": "LL-013-0-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 5
      },
      {
        "id": "p013-c1-s0",
        "productId": "p013",
        "sku": "LL-013-1-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XS",
        "stock": 15
      },
      {
        "id": "p013-c1-s1",
        "productId": "p013",
        "sku": "LL-013-1-1",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "S",
        "stock": 0
      },
      {
        "id": "p013-c1-s2",
        "productId": "p013",
        "sku": "LL-013-1-2",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "M",
        "stock": 4
      },
      {
        "id": "p013-c1-s3",
        "productId": "p013",
        "sku": "LL-013-1-3",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "L",
        "stock": 5
      },
      {
        "id": "p013-c1-s4",
        "productId": "p013",
        "sku": "LL-013-1-4",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XL",
        "stock": 6
      }
    ],
    "isNew": true,
    "rank": 12,
    "status": "published"
  },
  {
    "id": "p014",
    "slug": "archive-work-jacket",
    "sku": "LL-014",
    "name": "Куртка Archive Work",
    "category": "clothing",
    "subcategory": "outerwear",
    "collection": "Urban Archive",
    "description": "Рабочая куртка в современном прочтении: плотный хлопок, три кармана и чистая линия воротника. Сдержанный цвет раскрывается рядом с молочным трикотажем.",
    "composition": "100% хлопок, канвас; подкладка: 100% хлопок",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Прямая посадка, укороченная длина.",
    "price": 1690000,
    "oldPrice": 1990000,
    "images": [
      "/images/archive-work-jacket.svg",
      "/images/archive-work-jacket-study.svg",
      "/images/archive-work-jacket-graphite.svg"
    ],
    "variants": [
      {
        "id": "p014-c0-s0",
        "productId": "p014",
        "sku": "LL-014-0-0",
        "color": "Песочный",
        "colorHex": "#a28b6c",
        "size": "XS",
        "stock": 4
      },
      {
        "id": "p014-c0-s1",
        "productId": "p014",
        "sku": "LL-014-0-1",
        "color": "Песочный",
        "colorHex": "#a28b6c",
        "size": "S",
        "stock": 0
      },
      {
        "id": "p014-c0-s2",
        "productId": "p014",
        "sku": "LL-014-0-2",
        "color": "Песочный",
        "colorHex": "#a28b6c",
        "size": "M",
        "stock": 6
      },
      {
        "id": "p014-c0-s3",
        "productId": "p014",
        "sku": "LL-014-0-3",
        "color": "Песочный",
        "colorHex": "#a28b6c",
        "size": "L",
        "stock": 7
      },
      {
        "id": "p014-c0-s4",
        "productId": "p014",
        "sku": "LL-014-0-4",
        "color": "Песочный",
        "colorHex": "#a28b6c",
        "size": "XL",
        "stock": 8
      },
      {
        "id": "p014-c1-s0",
        "productId": "p014",
        "sku": "LL-014-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 0
      },
      {
        "id": "p014-c1-s1",
        "productId": "p014",
        "sku": "LL-014-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 6
      },
      {
        "id": "p014-c1-s2",
        "productId": "p014",
        "sku": "LL-014-1-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 7
      },
      {
        "id": "p014-c1-s3",
        "productId": "p014",
        "sku": "LL-014-1-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 8
      },
      {
        "id": "p014-c1-s4",
        "productId": "p014",
        "sku": "LL-014-1-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 9
      }
    ],
    "isNew": false,
    "rank": 13,
    "status": "published"
  },
  {
    "id": "p015",
    "slug": "field-overshirt",
    "sku": "LL-015",
    "name": "Овершёрт Field Layer",
    "category": "clothing",
    "subcategory": "outerwear",
    "collection": "Core Collection",
    "description": "Верхняя рубашка с двумя нагрудными карманами и крупными матовыми кнопками. Достаточно просторная для свитшота и собранная для самостоятельного образа.",
    "composition": "70% хлопок, 30% полиэстер, плотный твил",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Свободная посадка, прямой низ.",
    "price": 1390000,
    "oldPrice": null,
    "images": [
      "/images/field-overshirt.svg",
      "/images/field-overshirt-study.svg",
      "/images/field-overshirt-graphite.svg"
    ],
    "variants": [
      {
        "id": "p015-c0-s0",
        "productId": "p015",
        "sku": "LL-015-0-0",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "XS",
        "stock": 0
      },
      {
        "id": "p015-c0-s1",
        "productId": "p015",
        "sku": "LL-015-0-1",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "S",
        "stock": 8
      },
      {
        "id": "p015-c0-s2",
        "productId": "p015",
        "sku": "LL-015-0-2",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "M",
        "stock": 9
      },
      {
        "id": "p015-c0-s3",
        "productId": "p015",
        "sku": "LL-015-0-3",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "L",
        "stock": 10
      },
      {
        "id": "p015-c0-s4",
        "productId": "p015",
        "sku": "LL-015-0-4",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "XL",
        "stock": 11
      },
      {
        "id": "p015-c1-s0",
        "productId": "p015",
        "sku": "LL-015-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 8
      },
      {
        "id": "p015-c1-s1",
        "productId": "p015",
        "sku": "LL-015-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 9
      },
      {
        "id": "p015-c1-s2",
        "productId": "p015",
        "sku": "LL-015-1-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 10
      },
      {
        "id": "p015-c1-s3",
        "productId": "p015",
        "sku": "LL-015-1-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 11
      },
      {
        "id": "p015-c1-s4",
        "productId": "p015",
        "sku": "LL-015-1-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 12
      }
    ],
    "isNew": false,
    "rank": 14,
    "status": "published"
  },
  {
    "id": "p016",
    "slug": "volume-puffer",
    "sku": "LL-016",
    "name": "Куртка Volume Puffer",
    "category": "clothing",
    "subcategory": "outerwear",
    "collection": "Future Heritage",
    "description": "Объёмная стёганая куртка с высоким воротником. Крупные горизонтальные секции и спрятанная центральная застёжка создают спокойную геометрию.",
    "composition": "Верх: 100% полиамид; наполнитель: 100% полиэстер",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Объёмная посадка, длина до бедра.",
    "price": 2390000,
    "oldPrice": null,
    "images": [
      "/images/volume-puffer.svg",
      "/images/volume-puffer-study.svg",
      "/images/volume-puffer-graphite.svg"
    ],
    "variants": [
      {
        "id": "p016-c0-s0",
        "productId": "p016",
        "sku": "LL-016-0-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XS",
        "stock": 10
      },
      {
        "id": "p016-c0-s1",
        "productId": "p016",
        "sku": "LL-016-0-1",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "S",
        "stock": 11
      },
      {
        "id": "p016-c0-s2",
        "productId": "p016",
        "sku": "LL-016-0-2",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "M",
        "stock": 12
      },
      {
        "id": "p016-c0-s3",
        "productId": "p016",
        "sku": "LL-016-0-3",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "L",
        "stock": 13
      },
      {
        "id": "p016-c0-s4",
        "productId": "p016",
        "sku": "LL-016-0-4",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "XL",
        "stock": 14
      },
      {
        "id": "p016-c1-s0",
        "productId": "p016",
        "sku": "LL-016-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XS",
        "stock": 11
      },
      {
        "id": "p016-c1-s1",
        "productId": "p016",
        "sku": "LL-016-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S",
        "stock": 12
      },
      {
        "id": "p016-c1-s2",
        "productId": "p016",
        "sku": "LL-016-1-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "M",
        "stock": 13
      },
      {
        "id": "p016-c1-s3",
        "productId": "p016",
        "sku": "LL-016-1-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L",
        "stock": 14
      },
      {
        "id": "p016-c1-s4",
        "productId": "p016",
        "sku": "LL-016-1-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "XL",
        "stock": 15
      }
    ],
    "isNew": false,
    "rank": 15,
    "status": "published"
  },
  {
    "id": "p017",
    "slug": "runner-01",
    "sku": "LL-017",
    "name": "Кроссовки Runner 01",
    "category": "sneakers",
    "subcategory": "sneakers",
    "collection": "Future Heritage",
    "description": "Авторская модель LegacyLab с многослойным верхом и выразительной подошвой. Сетка сочетается с гладкими вставками, а нейтральная гамма поддерживает разные образы.",
    "composition": "Верх: текстиль и искусственная кожа; подкладка: текстиль; подошва: EVA и резина",
    "care": "Очищать мягкой влажной тканью. Сушить при комнатной температуре вдали от отопительных приборов. Не стирать в машине.",
    "fit": "Стандартная полнота. Сверьте длину стопы с таблицей размеров.",
    "price": 1590000,
    "oldPrice": null,
    "images": [
      "/images/runner-01.svg",
      "/images/runner-01-study.svg",
      "/images/runner-01-graphite.svg"
    ],
    "variants": [
      {
        "id": "p017-c0-s0",
        "productId": "p017",
        "sku": "LL-017-0-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "38",
        "stock": 13
      },
      {
        "id": "p017-c0-s1",
        "productId": "p017",
        "sku": "LL-017-0-1",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "39",
        "stock": 14
      },
      {
        "id": "p017-c0-s2",
        "productId": "p017",
        "sku": "LL-017-0-2",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "40",
        "stock": 15
      },
      {
        "id": "p017-c0-s3",
        "productId": "p017",
        "sku": "LL-017-0-3",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "41",
        "stock": 16
      },
      {
        "id": "p017-c0-s4",
        "productId": "p017",
        "sku": "LL-017-0-4",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "42",
        "stock": 4
      },
      {
        "id": "p017-c0-s5",
        "productId": "p017",
        "sku": "LL-017-0-5",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "43",
        "stock": 0
      },
      {
        "id": "p017-c0-s6",
        "productId": "p017",
        "sku": "LL-017-0-6",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "44",
        "stock": 6
      },
      {
        "id": "p017-c1-s0",
        "productId": "p017",
        "sku": "LL-017-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "38",
        "stock": 14
      },
      {
        "id": "p017-c1-s1",
        "productId": "p017",
        "sku": "LL-017-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "39",
        "stock": 15
      },
      {
        "id": "p017-c1-s2",
        "productId": "p017",
        "sku": "LL-017-1-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "40",
        "stock": 16
      },
      {
        "id": "p017-c1-s3",
        "productId": "p017",
        "sku": "LL-017-1-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "41",
        "stock": 4
      },
      {
        "id": "p017-c1-s4",
        "productId": "p017",
        "sku": "LL-017-1-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "42",
        "stock": 0
      },
      {
        "id": "p017-c1-s5",
        "productId": "p017",
        "sku": "LL-017-1-5",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "43",
        "stock": 6
      },
      {
        "id": "p017-c1-s6",
        "productId": "p017",
        "sku": "LL-017-1-6",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "44",
        "stock": 7
      }
    ],
    "isNew": true,
    "rank": 16,
    "status": "published"
  },
  {
    "id": "p018",
    "slug": "court-legacy",
    "sku": "LL-018",
    "name": "Кеды Court Legacy",
    "category": "sneakers",
    "subcategory": "sneakers",
    "collection": "Core Collection",
    "description": "Низкие кеды с чистым профилем и контрастной пяткой. Лаконичная форма оставляет внимание материалу и пропорциям, мягкая окантовка бережно обхватывает щиколотку.",
    "composition": "Верх: искусственная кожа; подкладка: текстиль; подошва: резина",
    "care": "Очищать мягкой влажной тканью. Сушить при комнатной температуре вдали от отопительных приборов. Не стирать в машине.",
    "fit": "Стандартная полнота, низкий силуэт.",
    "price": 1290000,
    "oldPrice": null,
    "images": [
      "/images/court-legacy.svg",
      "/images/court-legacy-study.svg",
      "/images/court-legacy-graphite.svg"
    ],
    "variants": [
      {
        "id": "p018-c0-s0",
        "productId": "p018",
        "sku": "LL-018-0-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "38",
        "stock": 16
      },
      {
        "id": "p018-c0-s1",
        "productId": "p018",
        "sku": "LL-018-0-1",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "39",
        "stock": 4
      },
      {
        "id": "p018-c0-s2",
        "productId": "p018",
        "sku": "LL-018-0-2",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "40",
        "stock": 5
      },
      {
        "id": "p018-c0-s3",
        "productId": "p018",
        "sku": "LL-018-0-3",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "41",
        "stock": 6
      },
      {
        "id": "p018-c0-s4",
        "productId": "p018",
        "sku": "LL-018-0-4",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "42",
        "stock": 0
      },
      {
        "id": "p018-c0-s5",
        "productId": "p018",
        "sku": "LL-018-0-5",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "43",
        "stock": 8
      },
      {
        "id": "p018-c0-s6",
        "productId": "p018",
        "sku": "LL-018-0-6",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "44",
        "stock": 9
      },
      {
        "id": "p018-c1-s0",
        "productId": "p018",
        "sku": "LL-018-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "38",
        "stock": 4
      },
      {
        "id": "p018-c1-s1",
        "productId": "p018",
        "sku": "LL-018-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "39",
        "stock": 5
      },
      {
        "id": "p018-c1-s2",
        "productId": "p018",
        "sku": "LL-018-1-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "40",
        "stock": 6
      },
      {
        "id": "p018-c1-s3",
        "productId": "p018",
        "sku": "LL-018-1-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "41",
        "stock": 0
      },
      {
        "id": "p018-c1-s4",
        "productId": "p018",
        "sku": "LL-018-1-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "42",
        "stock": 8
      },
      {
        "id": "p018-c1-s5",
        "productId": "p018",
        "sku": "LL-018-1-5",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "43",
        "stock": 9
      },
      {
        "id": "p018-c1-s6",
        "productId": "p018",
        "sku": "LL-018-1-6",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "44",
        "stock": 10
      }
    ],
    "isNew": false,
    "rank": 17,
    "status": "published"
  },
  {
    "id": "p019",
    "slug": "terrain-track",
    "sku": "LL-019",
    "name": "Кроссовки Terrain Track",
    "category": "sneakers",
    "subcategory": "sneakers",
    "collection": "Urban Archive",
    "description": "Городские кроссовки с рельефной подошвой, техническими петлями и плотной шнуровкой. Рисунок панелей вдохновлён городской топографией.",
    "composition": "Верх: текстиль и полиуретан; подкладка: текстиль; подошва: EVA и резина",
    "care": "Очищать мягкой влажной тканью. Сушить при комнатной температуре вдали от отопительных приборов. Не стирать в машине.",
    "fit": "Стандартная полнота, усиленная пятка.",
    "price": 1790000,
    "oldPrice": 1990000,
    "images": [
      "/images/terrain-track.svg",
      "/images/terrain-track-study.svg",
      "/images/terrain-track-graphite.svg"
    ],
    "variants": [
      {
        "id": "p019-c0-s0",
        "productId": "p019",
        "sku": "LL-019-0-0",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "38",
        "stock": 6
      },
      {
        "id": "p019-c0-s1",
        "productId": "p019",
        "sku": "LL-019-0-1",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "39",
        "stock": 7
      },
      {
        "id": "p019-c0-s2",
        "productId": "p019",
        "sku": "LL-019-0-2",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "40",
        "stock": 8
      },
      {
        "id": "p019-c0-s3",
        "productId": "p019",
        "sku": "LL-019-0-3",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "41",
        "stock": 0
      },
      {
        "id": "p019-c0-s4",
        "productId": "p019",
        "sku": "LL-019-0-4",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "42",
        "stock": 10
      },
      {
        "id": "p019-c0-s5",
        "productId": "p019",
        "sku": "LL-019-0-5",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "43",
        "stock": 11
      },
      {
        "id": "p019-c0-s6",
        "productId": "p019",
        "sku": "LL-019-0-6",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "44",
        "stock": 12
      },
      {
        "id": "p019-c1-s0",
        "productId": "p019",
        "sku": "LL-019-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "38",
        "stock": 7
      },
      {
        "id": "p019-c1-s1",
        "productId": "p019",
        "sku": "LL-019-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "39",
        "stock": 8
      },
      {
        "id": "p019-c1-s2",
        "productId": "p019",
        "sku": "LL-019-1-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "40",
        "stock": 0
      },
      {
        "id": "p019-c1-s3",
        "productId": "p019",
        "sku": "LL-019-1-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "41",
        "stock": 10
      },
      {
        "id": "p019-c1-s4",
        "productId": "p019",
        "sku": "LL-019-1-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "42",
        "stock": 11
      },
      {
        "id": "p019-c1-s5",
        "productId": "p019",
        "sku": "LL-019-1-5",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "43",
        "stock": 12
      },
      {
        "id": "p019-c1-s6",
        "productId": "p019",
        "sku": "LL-019-1-6",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "44",
        "stock": 13
      }
    ],
    "isNew": false,
    "rank": 18,
    "status": "published"
  },
  {
    "id": "p020",
    "slug": "mono-stride",
    "sku": "LL-020",
    "name": "Кроссовки Mono Stride",
    "category": "sneakers",
    "subcategory": "sneakers",
    "collection": "Everyday Objects",
    "description": "Монохромная пара с плавной линией подошвы и минимальным брендингом. Тональные вставки создают глубину без контрастных элементов.",
    "composition": "Верх: текстиль и искусственная кожа; подкладка: текстиль; подошва: EVA и резина",
    "care": "Очищать мягкой влажной тканью. Сушить при комнатной температуре вдали от отопительных приборов. Не стирать в машине.",
    "fit": "Стандартная полнота, мягкая зона подъёма.",
    "price": 1490000,
    "oldPrice": null,
    "images": [
      "/images/mono-stride.svg",
      "/images/mono-stride-study.svg",
      "/images/mono-stride-graphite.svg"
    ],
    "variants": [
      {
        "id": "p020-c0-s0",
        "productId": "p020",
        "sku": "LL-020-0-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "38",
        "stock": 9
      },
      {
        "id": "p020-c0-s1",
        "productId": "p020",
        "sku": "LL-020-0-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "39",
        "stock": 10
      },
      {
        "id": "p020-c0-s2",
        "productId": "p020",
        "sku": "LL-020-0-2",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "40",
        "stock": 0
      },
      {
        "id": "p020-c0-s3",
        "productId": "p020",
        "sku": "LL-020-0-3",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "41",
        "stock": 12
      },
      {
        "id": "p020-c0-s4",
        "productId": "p020",
        "sku": "LL-020-0-4",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "42",
        "stock": 13
      },
      {
        "id": "p020-c0-s5",
        "productId": "p020",
        "sku": "LL-020-0-5",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "43",
        "stock": 14
      },
      {
        "id": "p020-c0-s6",
        "productId": "p020",
        "sku": "LL-020-0-6",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "44",
        "stock": 15
      },
      {
        "id": "p020-c1-s0",
        "productId": "p020",
        "sku": "LL-020-1-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "38",
        "stock": 10
      },
      {
        "id": "p020-c1-s1",
        "productId": "p020",
        "sku": "LL-020-1-1",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "39",
        "stock": 0
      },
      {
        "id": "p020-c1-s2",
        "productId": "p020",
        "sku": "LL-020-1-2",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "40",
        "stock": 12
      },
      {
        "id": "p020-c1-s3",
        "productId": "p020",
        "sku": "LL-020-1-3",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "41",
        "stock": 13
      },
      {
        "id": "p020-c1-s4",
        "productId": "p020",
        "sku": "LL-020-1-4",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "42",
        "stock": 14
      },
      {
        "id": "p020-c1-s5",
        "productId": "p020",
        "sku": "LL-020-1-5",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "43",
        "stock": 15
      },
      {
        "id": "p020-c1-s6",
        "productId": "p020",
        "sku": "LL-020-1-6",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "44",
        "stock": 16
      }
    ],
    "isNew": false,
    "rank": 19,
    "status": "published"
  },
  {
    "id": "p021",
    "slug": "transit-crossbody",
    "sku": "LL-021",
    "name": "Сумка Transit Crossbody",
    "category": "accessories",
    "subcategory": "bags",
    "collection": "Everyday Objects",
    "description": "Компактная сумка для телефона, ключей и небольших вещей. Регулируемый ремень, внутренний карман и наружная молния помогают держать всё под рукой.",
    "composition": "100% полиамид; подкладка: 100% полиэстер",
    "care": "Очищать влажной тканью с мягким мылом. Не использовать отбеливатель. Сушить естественным способом вдали от прямого солнца.",
    "fit": "24 × 16 × 7 см; ремень 70–130 см.",
    "price": 590000,
    "oldPrice": null,
    "images": [
      "/images/transit-crossbody.svg",
      "/images/transit-crossbody-study.svg",
      "/images/transit-crossbody-graphite.svg"
    ],
    "variants": [
      {
        "id": "p021-c0-s0",
        "productId": "p021",
        "sku": "LL-021-0-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "ONE SIZE",
        "stock": 12
      },
      {
        "id": "p021-c1-s0",
        "productId": "p021",
        "sku": "LL-021-1-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "ONE SIZE",
        "stock": 0
      }
    ],
    "isNew": false,
    "rank": 20,
    "status": "published"
  },
  {
    "id": "p022",
    "slug": "archive-tote",
    "sku": "LL-022",
    "name": "Сумка Archive Tote",
    "category": "accessories",
    "subcategory": "bags",
    "collection": "Urban Archive",
    "description": "Плотный шоппер с широким дном и внутренним карманом. Короткие и длинные ручки позволяют менять способ носки, а лаконичная графика не спорит с одеждой.",
    "composition": "100% хлопок, канвас 400 г/м²",
    "care": "Очищать влажной тканью с мягким мылом. Не использовать отбеливатель. Сушить естественным способом вдали от прямого солнца.",
    "fit": "38 × 40 × 12 см; ручки 25 и 62 см.",
    "price": 490000,
    "oldPrice": 590000,
    "images": [
      "/images/archive-tote.svg",
      "/images/archive-tote-study.svg",
      "/images/archive-tote-graphite.svg"
    ],
    "variants": [
      {
        "id": "p022-c0-s0",
        "productId": "p022",
        "sku": "LL-022-0-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "ONE SIZE",
        "stock": 0
      },
      {
        "id": "p022-c1-s0",
        "productId": "p022",
        "sku": "LL-022-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "ONE SIZE",
        "stock": 16
      }
    ],
    "isNew": false,
    "rank": 21,
    "status": "published"
  },
  {
    "id": "p023",
    "slug": "daypack-02",
    "sku": "LL-023",
    "name": "Рюкзак Daypack 02",
    "category": "accessories",
    "subcategory": "bags",
    "collection": "Future Heritage",
    "description": "Городской рюкзак с отдельным мягким отделением и двумя боковыми карманами. Матовая фактура, округлая верхняя часть и аккуратная фурнитура.",
    "composition": "100% полиамид; подкладка: 100% полиэстер",
    "care": "Очищать влажной тканью с мягким мылом. Не использовать отбеливатель. Сушить естественным способом вдали от прямого солнца.",
    "fit": "42 × 29 × 14 см; объём около 17 л.",
    "price": 1090000,
    "oldPrice": null,
    "images": [
      "/images/daypack-02.svg",
      "/images/daypack-02-study.svg",
      "/images/daypack-02-graphite.svg"
    ],
    "variants": [
      {
        "id": "p023-c0-s0",
        "productId": "p023",
        "sku": "LL-023-0-0",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "ONE SIZE",
        "stock": 5
      },
      {
        "id": "p023-c1-s0",
        "productId": "p023",
        "sku": "LL-023-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "ONE SIZE",
        "stock": 6
      }
    ],
    "isNew": true,
    "rank": 22,
    "status": "published"
  },
  {
    "id": "p024",
    "slug": "weekend-duffle",
    "sku": "LL-024",
    "name": "Сумка Weekend Duffle",
    "category": "accessories",
    "subcategory": "bags",
    "collection": "Everyday Objects",
    "description": "Мягкая дорожная сумка для коротких поездок. Широкая молния открывает доступ к основному отделению, съёмный ремень освобождает руки.",
    "composition": "100% полиэстер; подкладка: 100% полиэстер",
    "care": "Очищать влажной тканью с мягким мылом. Не использовать отбеливатель. Сушить естественным способом вдали от прямого солнца.",
    "fit": "48 × 27 × 24 см; объём около 30 л.",
    "price": 990000,
    "oldPrice": null,
    "images": [
      "/images/weekend-duffle.svg",
      "/images/weekend-duffle-study.svg",
      "/images/weekend-duffle-graphite.svg"
    ],
    "variants": [
      {
        "id": "p024-c0-s0",
        "productId": "p024",
        "sku": "LL-024-0-0",
        "color": "Серый меланж",
        "colorHex": "#a4a5a0",
        "size": "ONE SIZE",
        "stock": 8
      },
      {
        "id": "p024-c1-s0",
        "productId": "p024",
        "sku": "LL-024-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "ONE SIZE",
        "stock": 9
      }
    ],
    "isNew": false,
    "rank": 23,
    "status": "published"
  },
  {
    "id": "p025",
    "slug": "core-cap",
    "sku": "LL-025",
    "name": "Кепка Core Cap",
    "category": "accessories",
    "subcategory": "headwear",
    "collection": "Core Collection",
    "description": "Шестипанельная кепка из плотного хлопка с вышитым знаком LL. Изогнутый козырёк и металлический регулятор дополняют узнаваемую базовую форму.",
    "composition": "100% хлопок",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Обхват 54–60 см, регулируемая застёжка.",
    "price": 350000,
    "oldPrice": null,
    "images": [
      "/images/core-cap.svg",
      "/images/core-cap-study.svg",
      "/images/core-cap-graphite.svg"
    ],
    "variants": [
      {
        "id": "p025-c0-s0",
        "productId": "p025",
        "sku": "LL-025-0-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "ONE SIZE",
        "stock": 11
      },
      {
        "id": "p025-c1-s0",
        "productId": "p025",
        "sku": "LL-025-1-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "ONE SIZE",
        "stock": 12
      }
    ],
    "isNew": false,
    "rank": 24,
    "status": "published"
  },
  {
    "id": "p026",
    "slug": "rib-beanie",
    "sku": "LL-026",
    "name": "Шапка Rib Beanie",
    "category": "accessories",
    "subcategory": "headwear",
    "collection": "Everyday Objects",
    "description": "Шапка в крупный рубчик с широким отворотом. Мягкая пряжа и эластичная вязка дают комфортную посадку без избыточного объёма.",
    "composition": "50% шерсть, 50% акрил",
    "care": "Ручная стирка при температуре до 30 °C со средством для шерсти. Сушить горизонтально. Не выкручивать.",
    "fit": "Обхват 54–60 см, эластичная вязка.",
    "price": 290000,
    "oldPrice": null,
    "images": [
      "/images/rib-beanie.svg",
      "/images/rib-beanie-study.svg",
      "/images/rib-beanie-graphite.svg"
    ],
    "variants": [
      {
        "id": "p026-c0-s0",
        "productId": "p026",
        "sku": "LL-026-0-0",
        "color": "Шалфей",
        "colorHex": "#858b72",
        "size": "ONE SIZE",
        "stock": 14
      },
      {
        "id": "p026-c1-s0",
        "productId": "p026",
        "sku": "LL-026-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "ONE SIZE",
        "stock": 15
      }
    ],
    "isNew": false,
    "rank": 25,
    "status": "published"
  },
  {
    "id": "p027",
    "slug": "bucket-archive",
    "sku": "LL-027",
    "name": "Панама Archive Bucket",
    "category": "accessories",
    "subcategory": "headwear",
    "collection": "Urban Archive",
    "description": "Панама из плотного твила с прошитым полем и компактным текстильным ярлыком. Спокойная форма завершает образ с курткой или лёгкой рубашкой.",
    "composition": "100% хлопок, твил",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Размеры S/M: 56–58 см; L/XL: 59–61 см.",
    "price": 390000,
    "oldPrice": 490000,
    "images": [
      "/images/bucket-archive.svg",
      "/images/bucket-archive-study.svg",
      "/images/bucket-archive-graphite.svg"
    ],
    "variants": [
      {
        "id": "p027-c0-s0",
        "productId": "p027",
        "sku": "LL-027-0-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "S/M",
        "stock": 4
      },
      {
        "id": "p027-c0-s1",
        "productId": "p027",
        "sku": "LL-027-0-1",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "L/XL",
        "stock": 5
      },
      {
        "id": "p027-c1-s0",
        "productId": "p027",
        "sku": "LL-027-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "S/M",
        "stock": 5
      },
      {
        "id": "p027-c1-s1",
        "productId": "p027",
        "sku": "LL-027-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "L/XL",
        "stock": 0
      }
    ],
    "isNew": false,
    "rank": 26,
    "status": "published"
  },
  {
    "id": "p028",
    "slug": "five-panel-cap",
    "sku": "LL-028",
    "name": "Кепка Five Panel",
    "category": "accessories",
    "subcategory": "headwear",
    "collection": "Future Heritage",
    "description": "Пятипанельная кепка с плоским козырьком и регулируемой стропой. Лёгкий материал и минимальные детали продолжают технический язык коллекции.",
    "composition": "100% полиамид",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Обхват 54–60 см, регулируемая стропа.",
    "price": 420000,
    "oldPrice": null,
    "images": [
      "/images/five-panel-cap.svg",
      "/images/five-panel-cap-study.svg",
      "/images/five-panel-cap-graphite.svg"
    ],
    "variants": [
      {
        "id": "p028-c0-s0",
        "productId": "p028",
        "sku": "LL-028-0-0",
        "color": "Песочный",
        "colorHex": "#a28b6c",
        "size": "ONE SIZE",
        "stock": 7
      },
      {
        "id": "p028-c1-s0",
        "productId": "p028",
        "sku": "LL-028-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "ONE SIZE",
        "stock": 0
      }
    ],
    "isNew": true,
    "rank": 27,
    "status": "published"
  },
  {
    "id": "p029",
    "slug": "daily-socks",
    "sku": "LL-029",
    "name": "Носки Daily Set",
    "category": "accessories",
    "subcategory": "objects",
    "collection": "Everyday Objects",
    "description": "Комплект из двух пар высоких носков с плотной резинкой и небольшим знаком LegacyLab. Спокойная графика хорошо читается с короткими брюками и кедами.",
    "composition": "80% хлопок, 17% полиамид, 3% эластан",
    "care": "Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.",
    "fit": "Высокий силуэт; размеры 36–40 и 41–45.",
    "price": 190000,
    "oldPrice": null,
    "images": [
      "/images/daily-socks.svg",
      "/images/daily-socks-study.svg",
      "/images/daily-socks-graphite.svg"
    ],
    "variants": [
      {
        "id": "p029-c0-s0",
        "productId": "p029",
        "sku": "LL-029-0-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "36–40",
        "stock": 0
      },
      {
        "id": "p029-c0-s1",
        "productId": "p029",
        "sku": "LL-029-0-1",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "41–45",
        "stock": 11
      },
      {
        "id": "p029-c1-s0",
        "productId": "p029",
        "sku": "LL-029-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "36–40",
        "stock": 11
      },
      {
        "id": "p029-c1-s1",
        "productId": "p029",
        "sku": "LL-029-1-1",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "41–45",
        "stock": 12
      }
    ],
    "isNew": false,
    "rank": 28,
    "status": "published"
  },
  {
    "id": "p030",
    "slug": "utility-belt",
    "sku": "LL-030",
    "name": "Ремень Utility Belt",
    "category": "accessories",
    "subcategory": "objects",
    "collection": "Urban Archive",
    "description": "Текстильный ремень с матовой металлической пряжкой и аккуратно обработанным концом. Длину легко настроить под разные способы носки.",
    "composition": "Стропа: 100% полиэстер; пряжка: алюминиевый сплав",
    "care": "Очищать влажной тканью с мягким мылом. Не использовать отбеливатель. Сушить естественным способом вдали от прямого солнца.",
    "fit": "Длина 120 см, ширина 3,5 см.",
    "price": 290000,
    "oldPrice": null,
    "images": [
      "/images/utility-belt.svg",
      "/images/utility-belt-study.svg",
      "/images/utility-belt-graphite.svg"
    ],
    "variants": [
      {
        "id": "p030-c0-s0",
        "productId": "p030",
        "sku": "LL-030-0-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "ONE SIZE",
        "stock": 13
      },
      {
        "id": "p030-c1-s0",
        "productId": "p030",
        "sku": "LL-030-1-0",
        "color": "Молочный",
        "colorHex": "#e2dfd3",
        "size": "ONE SIZE",
        "stock": 14
      }
    ],
    "isNew": false,
    "rank": 29,
    "status": "published"
  },
  {
    "id": "p031",
    "slug": "archive-scarf",
    "sku": "LL-031",
    "name": "Шарф Archive Scarf",
    "category": "accessories",
    "subcategory": "objects",
    "collection": "Core Collection",
    "description": "Длинный шарф с мягкой бахромой и тональным знаком на краю. Объёмное плетение создаёт живую фактуру в монохромном образе.",
    "composition": "50% шерсть, 50% акрил",
    "care": "Ручная стирка при температуре до 30 °C со средством для шерсти. Сушить горизонтально. Не выкручивать.",
    "fit": "180 × 30 см, без учёта бахромы.",
    "price": 590000,
    "oldPrice": null,
    "images": [
      "/images/archive-scarf.svg",
      "/images/archive-scarf-study.svg",
      "/images/archive-scarf-graphite.svg"
    ],
    "variants": [
      {
        "id": "p031-c0-s0",
        "productId": "p031",
        "sku": "LL-031-0-0",
        "color": "Серый меланж",
        "colorHex": "#a4a5a0",
        "size": "ONE SIZE",
        "stock": 16
      },
      {
        "id": "p031-c1-s0",
        "productId": "p031",
        "sku": "LL-031-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "ONE SIZE",
        "stock": 4
      }
    ],
    "isNew": false,
    "rank": 30,
    "status": "published"
  },
  {
    "id": "p032",
    "slug": "key-loop",
    "sku": "LL-032",
    "name": "Брелок Key Loop",
    "category": "accessories",
    "subcategory": "objects",
    "collection": "Future Heritage",
    "description": "Короткая петля из плотной стропы с карабином и кольцом. Небольшой цветовой акцент, который можно закрепить на сумке или шлёвке брюк.",
    "composition": "Стропа: 100% полиэстер; фурнитура: цинковый сплав",
    "care": "Очищать влажной тканью с мягким мылом. Не использовать отбеливатель. Сушить естественным способом вдали от прямого солнца.",
    "fit": "Длина 15 см, ширина 2,5 см.",
    "price": 220000,
    "oldPrice": null,
    "images": [
      "/images/key-loop.svg",
      "/images/key-loop-study.svg",
      "/images/key-loop-graphite.svg"
    ],
    "variants": [
      {
        "id": "p032-c0-s0",
        "productId": "p032",
        "sku": "LL-032-0-0",
        "color": "Лайм",
        "colorHex": "#cedc56",
        "size": "ONE SIZE",
        "stock": 6
      },
      {
        "id": "p032-c1-s0",
        "productId": "p032",
        "sku": "LL-032-1-0",
        "color": "Графит",
        "colorHex": "#30322e",
        "size": "ONE SIZE",
        "stock": 7
      }
    ],
    "isNew": true,
    "rank": 31,
    "status": "published"
  }
];
