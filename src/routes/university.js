const KoaRouter = require('koa-router');
const router = new KoaRouter();

// /universities

async function loadUniversity(ctx, next) {
    ctx.state.university = await ctx.orm.university.findById(ctx.params.id); // 1
    return next();
}

router.get('universities.list', '/', async (ctx) => {
    const universitiesList = await ctx.orm.university.findAll();
    await ctx.render('universities/index', {
        universitiesList,
        newUniversityPath: ctx.router.url('universities.new'),
        universityShowPath: university => ctx.router.url('universities.show', { id: university.id }),
        universityEditPath: university => ctx.router.url('universities.edit', { id: university.id }),
        universityDeletePath: university => ctx.router.url('universities.delete', { id: university.id }),
        careerListPath: ctx.router.url('careers.list'),
    });
});

router.get('universities.new', '/new', async (ctx) => {
  const university = ctx.orm.university.build();
  await ctx.render('universities/new', {
    university,
    submitUniversityPath: ctx.router.url('universities.create'),
    universitiesPath: ctx.router.url('universities.list')
  });
});

router.post('universities.create', '/', async (ctx) => {
  const university = ctx.orm.university.build(ctx.request.body);
  try {
    await university.save({ fields: ['name', 'address', 'description'] });
    ctx.redirect(ctx.router.url('universities.list'));
  } catch (validationError) {
    await ctx.render('universities.new', {
      university,
      errors: validationError.errors,
      submitUniversityPath: ctx.router.url('universities.create'),
    });
  };
});

router.get('universities.show', '/:id', loadUniversity, async (ctx) => {
    const { university } = ctx.state;
    const staffs = await university.getStaffs();
    const careersList = await university.getCareers();
    const userIsStaff = staffs.map((staff) => staff.id).includes(ctx.session.userId)
    await ctx.render('universities/show', {
        university,
        careersList,
        staffs,
        userIsStaff: userIsStaff,
        universityEditPath: university => ctx.router.url('universities.edit', { id: university.id }),
        newCareerPath: university => ctx.router.url('careers.new', { id: university.id }),
        editCareerPath: career => ctx.router.url('careers.edit', { id: career.id }),
        deleteCareerPath: career => ctx.router.url('careers.delete', { id: career.id }),
        staffClaimPath: university => ctx.router.url('university.claim', { id: university.id }),
    });
});

router.get('universities.edit', '/:id/edit', loadUniversity, async (ctx) => {
  const { university } = ctx.state;
  await ctx.render('universities/edit', {
    university,
    submitUniversityPath: ctx.router.url('universities.update',
      { id: university.id }),
    universitiesPath: ctx.router.url('universities.list')
  });
});


router.patch('universities.update', '/:id', loadUniversity, async (ctx) => {
  const { university } = ctx.state;
  try {
    const { name, address, description } = ctx.request.body;
    await university.update({ name, address, description });
    ctx.redirect(ctx.router.url('universities.list'));
  } catch (validationError) {
    await ctx.render('universities/edit', {
      university,
      errors: validationError.errors,
      submitUniversityPath: ctx.router.url('universities.update', { id: university.id }),
    });
  }
});

router.del('universities.delete', '/:id', loadUniversity, async (ctx) => {
  const { university } = ctx.state;
  await university.destroy();
  ctx.redirect(ctx.router.url('universities.list'));
});

router.get('university.claim', '/:id/claim', loadUniversity, async (ctx) => {
  const { university } = ctx.state;
  const staffs = await university.getStaffs();
  if (staffs.length == 0) {
    await ctx.render('universities/staff/staff_claim_form', {
      university,
      staffs,
      saveStaffPath: ctx.router.url('university.save.staff', { id: university.id }),
    });
  } else {
    ctx.redirect(ctx.router.url('universities.show', { id: ctx.params.id }));
  }
})

router.post('university.save.staff', '/:id/claim', async (ctx) => {
  if (ctx.request.body.staffVerificationCode == "123456789") {
    await ctx.orm.userModerateUniversity.create({
      userId: ctx.session.userId,
      universityId: ctx.params.id,
    });
  }
  ctx.redirect(ctx.router.url('universities.show', { id: ctx.params.id }));
})

module.exports = router;
