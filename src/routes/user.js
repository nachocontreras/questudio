const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('users.new', '/signup', async (ctx) => {
  const user = ctx.orm.user.build();
  const universitiesList = await ctx.orm.university.findAll();
  await ctx.render('users/register', {
    user,
    universitiesList,
    createUserPath: ctx.router.url('users.create'),
  });
});

router.post("users.create", '/signup', async (ctx) => {
    const user = ctx.orm.user.build(ctx.request.body);
    try {
      if (ctx.request.body.hasOwnProperty('universityId') && ctx.request.body['universityId'] != "empty") {
        await user.save({ fields: ['name', 'email', 'password', 'lastname', 'userType', 'universityId'] });
      } else {
        await user.save({ fields: ['name', 'email', 'password', 'lastname', 'userType'] });
      }
      ctx.status = 201;
      ctx.redirect(ctx.router.url('session.new'));
    } catch (validationError) {
      ctx.status = 400;
      const universitiesList = await ctx.orm.university.findAll();
      await ctx.render('users/register', {
        user,
        universitiesList,
        createUserPath: ctx.router.url('users.create'),
      });
    }
    ctx.redirect(ctx.router.url('session.new'));
});

router.get('users.profile', '/:id/profile', async (ctx) => {
  const user = await ctx.orm.user.findById(ctx.params.id);
  user.university = await user.getUniversity();
  await ctx.render('users/show', {
    user,
  });
});
  
module.exports = router;