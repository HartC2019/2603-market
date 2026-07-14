DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    note TEXT,
    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE
);