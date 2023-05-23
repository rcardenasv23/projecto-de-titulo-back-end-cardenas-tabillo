require('dotenv').config();

module.exports = {
    development: {
        username: process.env.PGUSER_DEV,
        password: process.env.PGPASSWORD_DEV,
        database: process.env.PGDATABASE_DEV,
        host: process.env.PGHOST,
        dialect: 'postgres',
        logging: false
    },
    test: {
        username: process.env.PGUSER_TEST,
        password: process.env.PGPASSWORD_TEST,
        database: process.env.PGDATABASE_TEST,
        host: process.env.PGHOST,
        dialect: 'postgres',
        logging: false
    },
    production: {
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        dialect: 'postgres',
        logging: false
    }
};