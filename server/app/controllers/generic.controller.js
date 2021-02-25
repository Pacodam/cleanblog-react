const nodemailer = require('nodemailer');
// https://console.cloud.google.com/apis/credentials?project=mern-project-305814&supportedpurview=project
// https://developers.google.com/oauthplayground/?code=4/0AY0e-g7EBqI2wWfgfA__MCuUjNua-QhuKdd_BQ04oNjDT-3Pe5XJpQda92dl2VgFSH-7UQ&scope=https://mail.google.com/

exports.contact = (req, res) => {
  const data = req.body;
  console.log(data);

  // // TODO not working,  use Google Oauth
  // const smtpTransport = nodemailer.createTransport({
  //   service: 'Gmail',
  //   auth: {
  //     user: 'pacodam2@gmail.com',
  //     pass: 'Boada1975.',
  //   },
  // });

  // const mailOptions = {
  //   from: data.email,
  //   to: 'pacodam2@gmail.com',
  //   subject: 'New contact',
  //   html: `<p>${data.name}</p>
  //           <p>${data.email}</p>
  //           <p>${data.phone}</p>,
  //           <p>${data.message}</p>`,
  // };

  const auth = {
    type: 'oauth2',
    user: 'nodemailerTest',
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    refreshToken: process.env.refreshToken,
  };

  const mailOptions = {
    from: req.body.name,
    to: 'pacoaraz1311@gmail.com',
    subject: `My site contact from: ${req.body.name}`,
    text: req.body.message,
    html: `Message from: ${req.body.name}<br></br> Email: ${req.body.email}<br></br> Message: ${req.body.message}`,
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth,
  });

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send({ message: 'Success', response });
    }
    transporter.close();
  });
};
