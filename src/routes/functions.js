var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

async function vocationalResults(id, ctx) {
    if (!ctx.state.currentUser) {
      return {}
    }
    const myResults = await ctx.orm.vocationalTestResult.findAll( {
      where: {
        userId: ctx.state.currentUser.id,
        vocationalTestId: id
      }
    })
    return {
      data: myResults,
    };
};

function sessionDecoder(session) {
  return decrypt(session);
}

function sessionEncoder(session) {
  return encrypt(session);
}

module.exports = {
    vocationalResults, sessionDecoder, sessionEncoder
};
  