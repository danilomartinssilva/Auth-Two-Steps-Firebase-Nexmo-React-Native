const admin = require('firebase-admin');

module.exports = (req, res) => {
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Phone and code must be provided',phone:req.body.phone,code:req.body.code});
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '');
  const code = parseInt(req.body.code);
  const ref = admin.database().ref('users/' + phone);
   admin.auth().getUser(phone)
    .then(() => {      
      ref.on('value', snapshot => {
        ref.off();
        const user = snapshot.val();

        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({ error: 'Code not valid' });
        }

        ref.update({ codeValid: false });
        admin.auth().createCustomToken(phone)
          .then(token => res.send({ token: token }))

          .catch((error)=>{
            return res.status(422).send({error})
          })
        });
      return null
    })
    .catch((err)=>{
      return res.status(422).send({error:'Usuário não encontrado: '+err});
    })
}