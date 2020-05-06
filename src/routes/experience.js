const KoaRouter = require('koa-router');
const router = new KoaRouter();


async function loadCareer(ctx, next) {
    ctx.state.career = await ctx.orm.career.findById(ctx.params.id);
    return next(); 
}

router.get('experience.new', '/:id/new', loadCareer, async (ctx) => {
  const career = ctx.state.career
  const experience = ctx.orm.experience.build()
  await ctx.render('experiences/new', {
    career,
    experience,
    submitExperiencePath: ctx.router.url('experience.create', { id: career.id }),
    careerPath: career => ctx.router.url('careers.show', { id: career.id })
  });
});

router.post('experience.create', '/:id/create', loadCareer, async (ctx) => {
  const career = ctx.state.career
  const experience = ctx.orm.experience.build(ctx.request.body);
  try {
    await experience.save({ fields: ['description'] });
    await experience.update({ userId: ctx.state.currentUser.id, careerId: career.id })
    ctx.redirect(ctx.router.url('careers.show', { id: career.id }));
  } catch (validationError) {
    const university = await ctx.orm.university.findById(career.universityId);
    await ctx.render('careers/show', {
      university,
      career,
      errors: validationError.errors,
      submitExperiencePath: ctx.router.url('experience.create', { id: career.id }),
    });
  };
});

module.exports = router;