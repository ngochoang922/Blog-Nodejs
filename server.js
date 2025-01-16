require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.BLOG_APP_PORT;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
