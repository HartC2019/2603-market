import db from "#db/client";

export async function getProducts() {
  const sql = `
    SELECT *
    FROM products
  `;

  const { rows: products } = await db.query(sql);

  return products;
}

export async function getProductById(id) {
  const sql = `
    SELECT *
    FROM products
    WHERE id = $1;
  `;

  const {
    rows: [product],
  } = await db.query(sql, [id]);

  return product;
}

export async function getProductOrders(productId, userId) {
  const sql = `
    SELECT *
    FROM orders
    JOIN orders_products
        ON orders.id = orders_products.order_id
    WHERE orders_products.product_id = $1
    AND orders.user_id =$2;
  `;

  const { rows: orders } = await db.query(sql, [productId, userId]);

  return orders;
}
