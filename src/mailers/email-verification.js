module.exports = function sendRecoveryPasswordEmail(ctx, data) {
  // you can get all the additional data needed by using the provided one plus ctx
  return ctx.sendMail('email-verification', { to: data.email, subject: 'Verificación de correo' }, { data });
};
