/* cấu hình dùng chung cho toàn bộ dự án
process.env là biến toàn cục (global) có thể được gán trong script của package.json
vd: "start-dev-server": "NODE_ENV=development node server/index.js"
*/
const config = {
  env: process.env.NODE_ENV,
  port: 1235,
  mongo: {
    mongoUri: process.env.MONGO_URL
    || 'mongodb://shoppyadmin:adminshoppy@ds153778.mlab.com:53778/shoppy',
    // || 'mongodb://localhost:27017/fe-shoppy',
    port: 27017,
    debug: true,
  },
};

module.exports = config;
