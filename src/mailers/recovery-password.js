module.exports = function sendRecoveryPasswordEmail(ctx, data) {
  // you can get all the additional data needed by using the provided one plus ctx
  console.log(data.modifyPath);
  return ctx.sendMail('recovery-password-email', { to: data.email }, { data });
};
