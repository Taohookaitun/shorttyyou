const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3001;

// เชื่อมต่อกับ MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Taohookaitun',
  database: 'shorter_url'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// ตั้งค่าเพื่อให้ Express ใช้งาน JSON และ URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// สร้างเส้นทางสำหรับหน้าเว็บ
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// สร้างเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
