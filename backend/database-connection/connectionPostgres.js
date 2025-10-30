const dotenv = require("dotenv"),
  { Client } = require("pg")
dotenv.config()

const client = new Client({
  connectionString: process.env.PGURI,
})
client.connect()

module.exports = client

