const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// تحديد المسار لملفاتك الثابتة (يجب أن تكون في الجذر الآن)
app.use(express.static(path.join(__dirname)));

// التعامل مع إرسال الرسائل
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

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
