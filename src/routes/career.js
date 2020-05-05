const KoaRouter = require('koa-router');
const router = new KoaRouter();

async function loadCareer(ctx, next) {
    ctx.state.career = await ctx.orm.career.findById(ctx.params.id); // 1
    return next(); 
}

async function loadUniversity(ctx, next) {
    ctx.state.university = await ctx.orm.university.findById(ctx.params.id);
    return next()
}

router.get('careers.list', '/', async (ctx) => {
    const careersList = await ctx.orm.career.findAll();
    await ctx.render('careers/index', {
        careersList,
        careerShowPath: career => ctx.router.url('careers.show', { id: career.id }),
    });
});

router.get('careers.new', '/:id/new', loadUniversity, async (ctx) => {
  const university = ctx.state.university;
  const career = ctx.orm.career.build()
  await ctx.render('careers/new', {
    career,
    university,
    submitCareerPath: ctx.router.url('careers.create', { id: university.id }),
    universitiesPath: ctx.router.url('universities.list')
  });
});

router.post('careers.create', '/:id/create', loadUniversity, async (ctx) => {
    const university = ctx.state.university;
    const career = ctx.orm.career.build(ctx.request.body);
    try {
        await career.save({ fields: ['name', 'area', 'vacancies', 'minScore', 'duration']});
        await career.update({ universityId: university.id })
        ctx.redirect(ctx.router.url('universities.show', {id: career.universityId}));
    } catch (validationError) {
    await ctx.render('careers/new', {
      university,
      errors: validationError.errors,
      submitCareerPath: ctx.router.url('careers.create', { id: university.id }),
    });
  };
});

router.get('careers.show', '/:id', loadCareer, async (ctx) => {
    const { career } = ctx.state;
    const university = await career.getUniversity();
    await ctx.render('careers/show', {
        career,
        university
    });
});

router.get('careers.edit', '/:id/edit', loadCareer, async (ctx) => {
  const { career } = ctx.state;
  await ctx.render('careers/edit', {
    career,
    submitCareerPath: ctx.router.url('careers.update', {id: career.id} ),
    showUniversityPath: ctx.router.url('universities.show', {id: career.universityId})
  });
});


router.patch('careers.update', '/:id', loadCareer, async (ctx) => {
  const { career } = ctx.state;
  try {
    const { name, area, vacancies, minScore, duration } = ctx.request.body;
    await career.update({ name, area, vacancies, minScore, duration });
    ctx.redirect(ctx.router.url('universities.show', {id: career.universityId}));
  } catch (validationError) {
    await ctx.render('careers/edit', {
      career,
      errors: validationError.errors,
      submitCareerPath: ctx.router.url('careers.update', { id: career.id }),
    });
  }
});

router.delete('careers.delete', '/:id', loadCareer, async (ctx) => {
  const { career } = ctx.state;
  let universityId = career.universityId;
  await career.destroy();
  ctx.redirect(ctx.router.url('universities.show', {id: universityId}));
});


module.exports = router;
