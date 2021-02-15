const nodemailer = require('nodemailer');

exports.contact = (req, res) => {
  const data = req.body;
  console.log(data);

  // TODO not working,  use Google Oauth 
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'pacodam2@gmail.com',
      pass: 'Boada1975.',
    },
  });

  const mailOptions = {
    from: data.email,
    to: 'pacodam2@gmail.com',
    subject: 'New contact',
    html: `<p>${data.name}</p>
            <p>${data.email}</p>
            <p>${data.phone}</p>,
            <p>${data.message}</p>`,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send('Success');
    }
    smtpTransport.close();
  });
};
