exports.up = async (knex) => {
    await knex.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await knex.raw(`
        CREATE TABLE "users" (
            "id" serial PRIMARY KEY,
            "first_name" VARCHAR(50),
            "last_name" VARCHAR(50),
            "email" VARCHAR(254) NOT NULL,
            "salt" VARCHAR(128) NOT NULL,
            "hash" VARCHAR(192) NOT NULL,
            "account_id" UUID DEFAULT uuid_generate_v4(),
            "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
    await knex.raw(`
        CREATE TABLE "blog_post" (
            "post_id" serial PRIMARY KEY,
            "title" VARCHAR(255) NOT NULL,
            "content" TEXT NOT NULL,
            "author_id" INTEGER REFERENCES "users" ("id"),
            "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP
        );
    `);
};

exports.down = async (knex) => {

};
