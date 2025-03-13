// require('dotenv').config();
const app = require('./src/app');

// const PORT = process.env.BLOG_APP_PORT;
const PORT = 3056

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = server;