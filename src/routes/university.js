const KoaRouter = require('koa-router');
const cloudinary = require('cloudinary').v2;
const { Op } = require('sequelize');
const {
  userLogged,
  isAdmin,
  isStaffOrAdmin
} = require('../routes/middlewares');
const { sessionDecoder } = require('./functions');

const router = new KoaRouter();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.STORAGE_KEY,
  api_secret: process.env.STORAGE_SECRET,
});

function takeOutExtension(name) {
  return name.split('.').slice(0, -1).join('.');
}

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


router.get('universities.new', '/new', userLogged, isAdmin, async (ctx) => {
  const university = ctx.orm.university.build();
  await ctx.render('universities/new', {
    university,
    submitUniversityPath: ctx.router.url('universities.create'),
    universitiesPath: ctx.router.url('universities.list')
  });
});

router.post('universities.create', '/', userLogged, isAdmin, async (ctx) => {
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


router.get('universities.stats', '/stats', async (ctx) => {
  let universitiesList = await ctx.orm.university.findAll();
  for (i=0; i < universitiesList.length; i++) {
    universitiesList[i]["dataValues"].careers = await universitiesList[i].getCareers();
  }
  ctx.status = 200;
  ctx.body = {
    data: universitiesList,
  }
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
    showCareerPath: career => ctx.router.url('careers.show', { id: career.id }),
    editCareerPath: career => ctx.router.url('careers.edit', { id: career.id }),
    deleteCareerPath: career => ctx.router.url('careers.delete', { id: career.id }),
    staffClaimPath: university => ctx.router.url('university.claim', { id: university.id }),
  });
});

router.get('universities.edit', '/:id/edit',
                                      userLogged,
                                      isStaffOrAdmin,
                                      loadUniversity, async (ctx) => {
  const { university } = ctx.state;
  await ctx.render('universities/edit', {
    university,
    submitUniversityPath: ctx.router.url('universities.update',
      { id: university.id }),
    universitiesPath: ctx.router.url('universities.list'),
    addUniversityImagePath: ctx.router.url('universities.addImage', { id: university.id }),
    addUniversityLogoPath: ctx.router.url('universities.addLogo', { id: university.id }),
  });
});


router.patch('universities.update', '/:id',
                                      userLogged,
                                      isStaffOrAdmin,
                                      loadUniversity, async (ctx) => {
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

router.post('universities.addImage', '/:id/add_image',
                                      userLogged,
                                      isStaffOrAdmin,
                                      loadUniversity, async (ctx) => {
  const { university } = ctx.state;
  const response = await cloudinary.uploader.upload(ctx.request.files.universityImage.path, {
    public_id: `universities-images/${university.id}/${university.id}${takeOutExtension(ctx.request.files.universityImage.name)}`,
  });
  await university.update({ imageUrl: `http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${response.version}/universities-images/${university.id}/${university.id}${takeOutExtension(ctx.request.files.universityImage.name)}` });
  await ctx.redirect(ctx.router.url('universities.show', { id: university.id }));
});

router.del('universities.delete', '/:id',
                                  userLogged,
                                  isAdmin,
                                  loadUniversity, async (ctx) => {
  const { university } = ctx.state;
  await university.destroy();
  ctx.redirect(ctx.router.url('universities.list'));
});

router.post('universities.addLogo', '/:id/add_logo',
                                            userLogged,
                                            isStaffOrAdmin,
                                            loadUniversity, async (ctx) => {
  const { university } = ctx.state;
  const response = await cloudinary.uploader.upload(ctx.request.files.universityLogo.path, {
    public_id: `universities-logos/${university.id}/${university.id}${takeOutExtension(ctx.request.files.universityLogo.name)}`,
  });
  await university.update({ logoUrl: `http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${response.version}/universities-logos/${university.id}/${university.id}${takeOutExtension(ctx.request.files.universityLogo.name)}` });
  await ctx.redirect(ctx.router.url('universities.show', { id: university.id }));
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

router.post('university.save.staff', '/:id/claim', userLogged, async (ctx) => {
  if (ctx.request.body.staffVerificationCode == "123456789") {
    await ctx.orm.userModerateUniversity.create({
      userId: sessionDecoder(ctx.session.userId),
      universityId: ctx.params.id,
    });
  }
  ctx.redirect(ctx.router.url('universities.show', { id: ctx.params.id }));
})

router.get('university.search.career', '/:id/search', loadUniversity, async (ctx) => {
  const { university } = ctx.state;
  const req = ctx.query;
  if (req.text) {
    const careerInput = req.text;
    var results = {
      careers: null
    };
    results.careers = await university.getCareers({
      where: { name: { [Op.iLike]: `%${careerInput}%` } }
    });
  }
  ctx.body = results;
})

module.exports = router;
