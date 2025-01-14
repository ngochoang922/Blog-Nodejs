"use strict";
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const host = process.env.BLOG_DB_HOST;
const port = process.env.BLOG_DB_PORT;
const name = process.env.BLOG_DB_NAME;

const connectStr = `mongodb://${host}:${port}/${name}`;

class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      await mongoose.connect(connectStr);
      console.log(`Kết nối thành công tới MongoDB - Port: ${port} - Database: ${name}`);
    } catch (error) {
      console.error("Lỗi kết nối tới MongoDB:", error);
      process.exit(1); 
    }
  }

  static getIntance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
const instanceMongoDb = Database.getIntance();
module.exports = instanceMongoDb;
