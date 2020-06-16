/* eslint-disable no-else-return */
const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('verificateEmail.verificate', '/verificate-email', async (ctx) => {
  const { token } = ctx.request.query;
  const verification = await ctx.orm.verification.find({ where: { token } });
  if (verification) {
    const user = await ctx.orm.user.findById(verification.userId);
    user.verificated = true;
    await user.save({ fields: ['verificated'] });
    await verification.destroy();
    return ctx.render('session/new', {
      passwordRecoveryPath: ctx.router.url('passwordRecovery.new'),
      email: user.email,
      createUserPath: ctx.router.url('users.new'),
      createSessionPath: ctx.router.url('session.create'),
      error: 'Email verificado con éxito!',
    });
  } else {
    return ctx.redirect('/');
  }
});

module.exports = router;
