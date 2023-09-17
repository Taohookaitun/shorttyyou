const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// สร้างการเชื่อมต่อกับ MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Taohookaitun',
  database: 'shorter_url'
});

// เชื่อมต่อกับ MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// รับคำขอสร้าง Short URL
app.post('/shorten', (req, res) => {
  const originalUrl = req.body.originalUrl;

  // สร้างรหัส Short URL (ตัวอย่าง: abcd123)
  const shortUrlCode = generateShortUrlCode();

  // เพิ่มข้อมูลลงใน MySQL
  const sql = "INSERT INTO short_urls (original_url, short_code) VALUES (?, ?)";
  db.query(sql, [originalUrl, shortUrlCode], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const shortUrl = `http://localhost:3000/${shortUrlCode}`;
      res.json({ shortURL: shortUrl });
    }
  });
});

function generateShortUrlCode() {
  // สร้างรหัส Short URL ตามต้องการ
  // เช่นใช้วิธีการสุ่มหรือแปลงจาก ID อัตโนมัติ
  // โค้ดนี้ให้เพียงแสดงตัวอย่างเท่านั้น
  return "abcd123";
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});