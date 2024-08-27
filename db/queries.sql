-- Active: 1724037341429@@127.0.0.1@5432@ecommerce_db
SELECT
    "category"."id",
    "category"."category_name",
    "products"."id" AS "products.id",
    "products"."product_name" AS "products.product_name",
    "products"."price" AS "products.price",
    "products"."stock" AS "products.stock",
    "products"."category_id" AS "products.category_id",
    "products"."category_id" AS "products.categoryId"
FROM
    "category" AS "category"
    LEFT OUTER JOIN "product" AS "products" ON "category"."id" = "products"."category_id";