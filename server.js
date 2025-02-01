const express = require('express');
const path = require('path');
const fs = require('fs');  // للتعامل مع الملفات
const app = express();

// لإمكانية إرسال بيانات JSON من العميل
app.use(express.json()); // للتعامل مع البيانات من نوع JSON
app.use(express.static(path.join(__dirname, 'public'))); // إذا كان لديك ملفات ثابتة في مجلد public

// خدمة 'index.html' من الجذر
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // إرسال ملف 'index.html' من الجذر مباشرة
});

// نقطة النهاية لاستقبال الرسائل وحفظها في ملف
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    // التأكد من وجود البيانات المطلوبة
    if (!name || !email || !message) {
        return res.status(400).send('الرجاء تعبئة جميع الحقول');
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

    // المسار حيث سيتم حفظ الرسائل
    const messagesDir = 'messages';
    const filePath = path.join(messagesDir, 'messages.txt');

    // إذا لم يكن مجلد الرسائل موجودًا، قم بإنشائه
    if (!fs.existsSync(messagesDir)) {
        fs.mkdirSync(messagesDir, { recursive: true });
    }

    // كتابة الرسالة في الملف
    fs.appendFile(filePath, messageContent, (err) => {
        if (err) {
            return res.status(500).send('حدث خطأ أثناء حفظ الرسالة.');
        }
        res.status(200).send('تم إرسال الرسالة بنجاح!');
    });
});

// بدء الخادم على المنفذ 3000
app.listen(3000, () => {
    console.log('الخادم يعمل على المنفذ 3000');
});

