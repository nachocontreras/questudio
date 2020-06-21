const KoaRouter = require('koa-router');

const router = new KoaRouter();
const { userLogged } = require('../routes/middlewares');


async function loadCareer(ctx, next) {
  ctx.state.career = await ctx.orm.career.findById(ctx.params.id);
  return next();
}

router.post('comments.create', '/:id/create',
  userLogged, loadCareer, async (ctx) => {
    const career = ctx.state.career;
    const comment = ctx.orm.comment.build(ctx.request.body);
    try {
      await comment.save({ fields: ['description', 'userId', 'careerId', 'previousCommentId'] });
      ctx.redirect(ctx.router.url('careers.show', { id: career.id }));
    } catch (validationError) {
      const university = await ctx.orm.university.findById(career.universityId);
      await ctx.render('careers/show', {
        university,
        career,
        errors: validationError.errors,
      });
    }
  });

router.get('comments.list', '/', async (ctx) => {

  const comments = await ctx.orm.comment.findAll({
    include: [
      ctx.orm.user,
      {
        model: ctx.orm.career,
        include: ctx.orm.university,
      },
    ],
  })

  await ctx.render('comments/index', {
    comments,
  })
})

module.exports = router;
