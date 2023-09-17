const express = require("express");
const mysql = require("mysql2");
const bodyParser = require('body-parser');
const shortid = require('shortid');
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

const db = mysql.createConnection({
    host: 'localhost', // หรือชื่อโฮสต์ของ MySQL server
    user: 'root', // ชื่อผู้ใช้ MySQL
    password: 'Taohookaitun', // รหัสผ่าน MySQL
    database: 'shorter_url' // ชื่อฐานข้อมูล MySQL
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });
  

  app.post('/shorten', (req, res) => {
    // รับ URL ต้นฉบับจากผู้ใช้
    const originalUrl = req.body.originalUrl;
    // สร้างรหัสลิงก์ย่อ (เช่น 6 ตัวอักษรสุ่ม)
    const shortCode = generateShortCode(8);

    // เพิ่มคู่ลิงก์ลงในฐานข้อมูล
    const sql = 'INSERT INTO links (original_url, short_code) VALUES (?, ?)';
    db.query(sql, [originalUrl, shortCode], (err, result) => {
      if (err) {
        console.error('Error creating short link:', err);
        res.status(500).send('An error occurred while saving the link.');
      } else {
      // ส่งลิงก์ย่อที่ได้กลับไปยังเทมเพลต HTML
          const shortenedLink = `http://taohookaitun.com/${shortCode}`; // เปลี่ยน yourdomain.com เป็นโดเมนของคุณ
          res.render('shortenedUrl', { shortenedLink });
      }
    });
  });
    
// เริ่มเซิร์ฟเวอร์ Express
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
});

// ฟังก์ชันสร้างรหัสลิงก์ย่อ
function generateShortCode(length) {
  // โค้ดสร้างรหัสลิงก์ย่อ
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortCode += characters[randomIndex];
  }
  return shortCode;
}

function openTab(tabName) {
    // ซ่อนเนื้อหาของทุกแท็บที่เปิดในตอนนี้
    document.getElementById('shorturl').style.display = 'none';
    document.getElementById('table_statisticsurl').style.display = 'none';

    // แสดงเนื้อหาของแท็บที่เลือก
    if (tabName === 'shorturl') {
      document.getElementById('shorturl').style.display = 'block';
  } else if (tabName === 'table_statisticsurl') {
      document.getElementById('table_statisticsurl').style.display = 'block';
  }
};  



