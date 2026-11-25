---
title: "Watch an index change the query plan"
module: f6
minutes: 30
source: "https://www.postgresql.org/docs/current/using-explain.html"
stack: ["postgresql", "docker"]
checks:
  - label: "without the index, Postgres read the whole table"
    pattern: "Seq Scan on orders"
  - label: "with the index, it used it"
    pattern: "(Index Scan using|Index Only Scan using|Bitmap Index Scan on) orders_customer_id_idx"
  - label: "you measured real times, not just estimates"
    pattern: "Execution Time:"
    times: 2
---

## Goal

See the planner switch from reading every row to using an index, and compare the actual execution times.

## Steps

1. Start a throwaway Postgres and open psql:

   ```console
   docker run --rm -d --name pg-lab -e POSTGRES_PASSWORD=lab postgres:18
   docker exec -it pg-lab psql -U postgres
   ```

2. Make a table with 200,000 orders and ask for one customer's orders:

   ```sql
   CREATE TABLE orders (id serial PRIMARY KEY, customer_id int NOT NULL, total numeric NOT NULL);
   INSERT INTO orders (customer_id, total)
     SELECT (random() * 10000)::int, random() * 100 FROM generate_series(1, 200000);
   ANALYZE orders;
   EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;
   ```

3. Add the index and ask again:

   ```sql
   CREATE INDEX orders_customer_id_idx ON orders (customer_id);
   EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;
   ```

4. Compare the two `Execution Time` lines. Then `\q` and `docker stop pg-lab`.

## Evidence

Paste both `EXPLAIN ANALYZE` outputs.
