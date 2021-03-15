1. make git repo and clone it locally
2. npm init
3. yarn create react-app client --template typescript
4. npm install concurrently nodemon --save-dev
5. enter postgres shell: `psql postgres`
  a)create a new user (role) for this db 
    `CREATE ROLE financestracker PASSWORD '123';`
  b)change this user to be able to create a db 
    `ALTER ROLE financestracker CREATEDB;`
  c)log out and log in again as the new 'financestracker' user
    `psql -d postgres -U me` 
  d) create the 'financestracker' database
    `CREATE DATABASE financestracker;`
  e) connect to the 'financestracker' database
    `\c financestracker`
  f) create the 'users' table
    `CREATE TABLE users`