import bcrypt from "bcrypt";
import db from "#db/client";

await db.connect();
await seed();
await db.end();

console.log("🌱 Database seeded.");

async function seed() {
  const hashedPassword = await bcrypt.hash("password", 10);

  // Create a user
  const createUser = `
    INSERT INTO users
      (username, password)
    VALUES
      ($1, $2)
    RETURNING *;
  `;

  const {
    rows: [user],
  } = await db.query(createUser, ["chase", hashedPassword]);

  // Create products
  const createProducts = `
    INSERT INTO products
      (title, description, price)
    VALUES
      ('Coffee', 'Ground coffee beans', 8.99),
      ('Milk', 'Whole milk', 3.49),
      ('Eggs', 'One dozen eggs', 4.99),
      ('Bread', 'Whole wheat bread', 2.99),
      ('Bananas', 'Fresh bananas', 1.99),
      ('Chicken', 'Boneless chicken breast', 9.99),
      ('Rice', 'Long grain rice', 6.99),
      ('Cheese', 'Cheddar cheese', 5.49),
      ('Butter', 'Salted butter', 4.29),
      ('Apples', 'Honeycrisp apples', 3.99);
  `;

  await db.query(createProducts);

  // Get products
  const getProducts = `
    SELECT *
    FROM products
    ORDER BY id;
  `;

  const { rows: products } = await db.query(getProducts);

  // Create an order
  const createOrder = `
    INSERT INTO orders
      (date, note, user_id)
    VALUES
      ($1, $2, $3)
    RETURNING *;
  `;

  const {
    rows: [order],
  } = await db.query(createOrder, [
    "2026-07-13",
    "First seeded order",
    user.id,
  ]);

  // Attach products to the order
  const createOrderProducts = `
    INSERT INTO orders_products
      (order_id, product_id, quantity)
    VALUES
      ($1, $2, 2),
      ($1, $3, 1),
      ($1, $4, 4),
      ($1, $5, 2),
      ($1, $6, 1);
  `;

  await db.query(createOrderProducts, [
    order.id,
    products[0].id,
    products[1].id,
    products[2].id,
    products[3].id,
    products[4].id,
  ]);
}
