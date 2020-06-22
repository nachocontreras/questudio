const KoaRouter = require('koa-router');
const router = new KoaRouter();

const {
  userLogged,
  isAdmin,
  isStaffOrAdmin,
  carrerIsStaffOrAdmin,
} = require('../routes/middlewares');

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

router.get('careers.stats', '/stats', userLogged, isAdmin, async (ctx) => {
  let careersList = await ctx.orm.career.findAll();
  ctx.status = 200;
  ctx.body = {
    data: careersList,
  }
});

router.get('careers.new', '/:id/new', userLogged,
  isStaffOrAdmin,
  loadUniversity, async (ctx) => {
    const university = ctx.state.university;
    const career = ctx.orm.career.build()
    await ctx.render('careers/new', {
      career,
      university,
      submitCareerPath: ctx.router.url('careers.create', { id: university.id }),
      universitiesPath: ctx.router.url('universities.list')
    });
  });

router.post('careers.create', '/:id/create',
  userLogged,
  isStaffOrAdmin,
  loadUniversity, async (ctx) => {
    const university = ctx.state.university;
    const career = ctx.orm.career.build(ctx.request.body);
    try {
      await career.save({
        fields: ['name',
          'area',
          'vacancies',
          'minScore',
          'mathScore',
          'lengScore',
          'scienceScore',
          'histScore',
          'nemScore',
          'rankScore',
          'corte',
          'duration']
      });
      await career.update({ universityId: university.id })
      ctx.redirect(ctx.router.url('universities.show', { id: career.universityId }));
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
  const commentsList = await ctx.orm.comment.findAll({
    where: { careerId: career.id },
    include: { model: ctx.orm.user },
  });
  var simulation;
  if (ctx.state.currentUser) {
    simulation = await ctx.orm.simulation.findAll({
      where: {
        userId: ctx.state.currentUser.id,
        careerId: career.id
      }
    })
  }
  commentsList.sort((a, b) => {
    let ap = parseInt(a.previousCommentId);
    let bp = parseInt(b.previousCommentId);
    let ai = parseInt(a.id);
    let bi = parseInt(b.id);

    // let a_zerofilled = ('00000' + ap).slice(-5);
    // let a_zerofilled2 = ('00000' + ai).slice(-5);
    // let b_zerofilled = ('00000' + bp).slice(-5);
    // let b_zerofilled2 = ('00000' + bi).slice(-5);
    // let a_string = a_zerofilled + "." + a_zerofilled2;
    // let b_string = b_zerofilled + "." + b_zerofilled2;
    // if (a_zerofilled == b_zerofilled) {
    //   return a_zerofilled2 > b_zerofilled2;
    // } else if (a_zerofilled == '00000') {
    //   return ai < bi;
    // } else if (b_zerofilled == '00000') {
    //   return ai > bi;
    // }
    // console.log(a_string, b_string);
    // return a_string < b_string;

    if (ap == bp) {
      if (ai < bi) {
        return -1;
      } else {
        return 1;
      }
    } else if (ap < bp) {
      if (ap == 0) {
        if (ai < bp) {
          return -1;
        } else if (ai > bp) {
          return 1;
        }
        return -1;
      }
      if (ai < bi) {
        return -1;
      } else {
        return -1;
      }
    } else {
      if (bp == 0) {
        if (bi < ap) {
          return 1;
        } else if (bi > ap) {
          return -1;
        }
        return 1;
      }
      if (ai < bi) {
        return 1;
      } else {
        return 1;
      }
    }
  })
  const experiencesList = await ctx.orm.experience.findAll({
    where: { careerId: career.id },
    include: { model: ctx.orm.user }
  });
  await ctx.render('careers/show', {
    simulation,
    experiencesList,
    commentsList,
    university,
    experiencePath: career => ctx.router.url('experience.new', { id: career.id }),
    commentPath: career => ctx.router.url('comment.new', { id: career.id })
  });
});

router.get('careers.edit', '/:id/edit', userLogged,
  carrerIsStaffOrAdmin,
  loadCareer, async (ctx) => {
    const { career } = ctx.state;
    await ctx.render('careers/edit', {
      career,
      submitCareerPath: ctx.router.url('careers.update', { id: career.id }),
      showUniversityPath: ctx.router.url('universities.show', { id: career.universityId })
    });
  });

router.patch('careers.update', '/:id', userLogged,
  carrerIsStaffOrAdmin,
  loadCareer, async (ctx) => {
    const { career } = ctx.state;
    try {
      const { name, area, vacancies, minScore, duration, price } = ctx.request.body;
      await career.update({ name, area, vacancies, minScore, duration, price });
      ctx.redirect(ctx.router.url('universities.show', { id: career.universityId }));
    } catch (validationError) {
      await ctx.render('careers/edit', {
        career,
        errors: validationError.errors,
        submitCareerPath: ctx.router.url('careers.update', { id: career.id }),
      });
    }
  });

router.delete('careers.delete', '/:id', userLogged,
  carrerIsStaffOrAdmin,
  loadCareer, async (ctx) => {
    const { career } = ctx.state;
    let universityId = career.universityId;
    await career.destroy();
    ctx.redirect(ctx.router.url('universities.show', { id: universityId }));
  });


module.exports = router;
