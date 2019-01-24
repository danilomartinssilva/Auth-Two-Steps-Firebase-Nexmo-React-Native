
const admin = require('firebase-admin');
module.exports = (req,res)=>{
    //Verifica o uso phone privado

    if(!req.body.phone){
        return res.status(422).send({error:'Bad Inputs'});
    }
    //Formata o numero do telefone e remove espaços e simbolos
    const phone = String(req.body.phone).replace(/[^\d]/g,"");
    //Cria uma nova count de usuário baseado no numero do telefone
    admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));


    //Responde a requisição do usuário


}