const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// لاستخراج البيانات من النموذج
app.use(express.json());  // لمعالجة بيانات JSON
app.use(express.urlencoded({ extended: true }));  // لمعالجة بيانات URL-encoded

// تحديد مسار ملفاتك الثابتة (مثل HTML و CSS)
app.use(express.static('public'));

// التعامل مع إرسال الرسائل
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    // التحقق من البيانات المستلمة
    console.log('الاسم:', name);
    console.log('البريد الإلكتروني:', email);
    console.log('الرسالة:', message);

    // التحقق إذا كانت البيانات قد تم استلامها بشكل صحيح
    if (!name || !email || !message) {
        return res.status(400).send('الرجاء ملء جميع الحقول.');
    }

    // تنسيق الرسالة
    const messageContent = `
    =========================
    الاسم: ${name}
    البريد الإلكتروني: ${email}
    الرسالة:
    ${message}
    =========================
    \n`;

    // تحديد المسار الكامل للمجلد "messages" وملف "messages.txt"
    const messagesDir = 'D:/hp/Documents/مجلد جديد/messages'; // المسار الثابت للمجلد
    const filePath = path.join(messagesDir, 'messages.txt'); // المسار الكامل للملف

    // التأكد من أن المجلد "messages" موجود، إذا لم يكن موجودًا سيتم إنشاؤه
    if (!fs.existsSync(messagesDir)) {
        fs.mkdirSync(messagesDir, { recursive: true }); // إنشاء المجلد إذا لم يكن موجودًا
    }

    // حفظ الرسالة في ملف TXT داخل المجلد "messages"
    fs.appendFile(filePath, messageContent, (err) => {
        if (err) {
            return res.status(500).send('حدث خطأ أثناء حفظ الرسالة.');
        }
        res.status(200).send('تم إرسال الرسالة بنجاح!');
    });
});

// تشغيل الخادم
app.listen(port, () => {
    console.log(`الخادم يعمل على http://localhost:${port}`);
});
