const express = require('express');
const app = express();
const port = 3000;

// นำเข้า router สำหรับการสร้าง Short URL
const shortenRouter = require('./server');

// ใช้ router สำหรับการสร้าง Short URL
app.use('/server', shortenRouter);

// ... (ส่วนอื่น ๆ ของแอป)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
