const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'chiranjeevi.protractor@gmail.com',
        pass: 'Planon@521'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'chiranjeevi.protractor@gmail.com', // sender address
    to: 'chiranjeevi521@gmail.com', // list of receivers
    subject: 'Protractor Demo Results at http://localhost:8888', // Subject line
    text: 'Dear StakeHolders, Please see attachment for todays result. You can also see result at http://localhost:8888', // plain text body
    html: '<P> Welcome To Protractor Results Page. Please <a href = "http://localhost:8888">ClickHere</a> to get test results', // html body
    //To Send results as attachment
    //attachments: [{ 
        //'filename' : 'Results.html',
        //'filePath' : './allure-results/Results.xml'
    //}]
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});