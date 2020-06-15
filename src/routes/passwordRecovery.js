/* eslint-disable no-else-return */
const KoaRouter = require('koa-router');
const randtoken = require('rand-token');
const sendPasswordRecoveryEmail = require('../mailers/recovery-password');

const router = new KoaRouter();

router.get('passwordRecovery.modify', '/modify-password', async (ctx) => {
  return ctx.render('passwordRecovery/modify-password', {
    passwordModifyPath: ctx.router.url('passwordRecovery.modifyPassword'),
  });
});

router.post('passwordRecovery.modifyPassword', '/modify-password', async (ctx) => {
});

router.post('passwordRecovery.send', '/confirmate-email', async (ctx) => {
  const { email } = ctx.request.body;
  const user = await ctx.orm.user.find({ where: { email } });
  if (user) {
    const passwordToken = {
      token: randtoken.generate(30),
      userId: user.id,
    };
    const passwordRecoveryToken = await ctx.orm.passwordRecovery.build(passwordToken);
    await passwordRecoveryToken.save({ fields: ['userId', 'token'] });
    // eslint-disable-next-line prefer-template
    const modifyPath = 'http://' + ctx.request.host + ctx.router.url('passwordRecovery.modify') + '?' + passwordRecoveryToken.token;
    await sendPasswordRecoveryEmail(ctx, { email: user.email, modifyPath });
    return ctx.redirect(ctx.router.url('session.new'));
  } else {
    return ctx.render('passwordRecovery/new', {
      message: 'Ingresa un Correo Válido',
      passwordRecoverySendPath: ctx.router.url('passwordRecovery.send'),
    });
  }
});

router.get('passwordRecovery.new', '/confirmate-email', async (ctx) => {
  return ctx.render('passwordRecovery/new', {
    message: false,
    passwordRecoverySendPath: ctx.router.url('passwordRecovery.send'),
  });
});

module.exports = router;
