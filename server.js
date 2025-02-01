const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const port = process.env.PORT || 3000; // استخدام المنفذ الذي تعينه Heroku

// إعداد Express
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// نقطة النهاية لخدمة 'index.html'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// نقطة النهاية لمعالجة الرسائل
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('الرجاء تعبئة جميع الحقول');
    }

    const messageContent = `
    =========================
    الاسم: ${name}
    البريد الإلكتروني: ${email}
    الرسالة:
    ${message}
    =========================
    \n`;

    const messagesDir = 'messages';
    const filePath = path.join(messagesDir, 'messages.txt');

    if (!fs.existsSync(messagesDir)) {
        fs.mkdirSync(messagesDir, { recursive: true });
    }

    fs.appendFile(filePath, messageContent, (err) => {
        if (err) {
            return res.status(500).send('حدث خطأ أثناء حفظ الرسالة.');
        }
        res.status(200).send('تم إرسال الرسالة بنجاح!');
    });
});

// بدء الخادم
app.listen(port, () => {
    console.log(`الخادم يعمل على المنفذ ${port}`);
});
