const { MongoClient } = require('mongodb');
require('dotenv').config();

const connection = cb => {
    MongoClient.connect (process.env.DB, {}, (err, client) => {
        if (err) return cb (err, false);
        const connects = client.db('list');
        cb (false, connects);
    });
}

module.exports = connection;
