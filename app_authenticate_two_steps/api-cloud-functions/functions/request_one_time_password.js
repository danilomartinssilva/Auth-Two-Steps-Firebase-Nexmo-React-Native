const admin = require('firebase-admin');

const nexmo = require('./nexmo');


module.exports = function(req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  admin.auth().getUser(phone)
    .then(userRecord => {
      const code = Math.floor((Math.random() * 8999 + 1000));
      nexmo.message.sendSms(
        'Nexmo', phone, 'AHNNNN! Seu codigo: '+code,
          (err, responseData) => {
            if (err) {
              res.status(400).send({error:'Erro ao enviar mensagem '+err})
            } else {              
              admin.database().ref('users/' + phone)
                .update({ code: code, codeValid: true }, () => {
                  res.send({ success: true,message:responseData });
                });
            }
          }
       );
      
      return null;
    })
    .catch((err) => {
      res.status(422).send({ error: err,phone });
    });
}