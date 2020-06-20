const KoaRouter = require('koa-router');

const router = new KoaRouter();
const { userLogged } = require('../routes/middlewares');
const { experienceGuard } = require('../routes/middlewares');

async function loadCareer(ctx, next) {
  ctx.state.career = await ctx.orm.career.findById(ctx.params.id);
  return next();
}

router.post('experience.create', '/:id/create',
  userLogged, experienceGuard, loadCareer, async (ctx) => {
    const career = ctx.state.career;
    const experience = ctx.orm.experience.build(ctx.request.body);
    try {
      await experience.save({ fields: ['description', 'careerId', 'userId'] });
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

router.get('experience.list', '/', async (ctx) => {

  const experiences = await ctx.orm.experience.findAll({
    include: [
      ctx.orm.user,
      {
        model: ctx.orm.career,
        include: ctx.orm.university,
      },
    ],
  })

  await ctx.render('experiences/index', {
    experiences,
  })
})

module.exports = router;
