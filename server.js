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

    const messagesDir = 'D:/hp/Documents/مجلد جديد/messages';
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
