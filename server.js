const express = require('express');
const router = express.Router();
const mysql = require('mysql');

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

// ใช้ bodyParser เพื่อรับ JSON จากคำขอ
router.use(express.json());

// รับคำขอสร้าง Short URL
router.post('/', (req, res) => {
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

module.exports = router;
