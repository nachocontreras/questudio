/* eslint-disable prefer-template */
const KoaRouter = require('koa-router');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const { userLogged } = require('../routes/middlewares');
const { checkProfileEditable } = require('../routes/middlewares');
const { redirectIfNotUser } = require('../routes/middlewares');
const { isAdmin } = require('../routes/middlewares');
const { vocationalResults } = require('../routes/functions');
const sendEmailVerificationEmail = require('../mailers/email-verification');
const randtoken = require('rand-token');

dotenv.config();
const router = new KoaRouter();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.STORAGE_KEY,
  api_secret: process.env.STORAGE_SECRET,
});

function takeOutExtension(name) {
  return name.split('.').slice(0, -1).join('.');
}

router.get('users.index', '/', isAdmin, async (ctx) => {
  const usersList = await ctx.orm.user.findAll({
    attributes: {exclude: ['password']}
  });
  let users = [];
  let newUsers = usersList.map(async function(us){
    us.isStaff = (await us.getStaffUniversities().length != 0) ? true : false;
    console.log(us.id, us.isStaff);
    users.push(us);
    return us;
  });
  return Promise.all(newUsers).then(async function(){
    switch (ctx.accepts(['json', 'html'])) {
      case 'json':
        ctx.body = {
          data: usersList,
        };
        ctx.status = 200;
        break;
      case 'html':
        await ctx.render('users/index', {
          usersList,
        });
        break;
      default:
        break;
    }  
  });
});

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
    user.verificated = false;
    if (ctx.request.body.hasOwnProperty('universityId') && ctx.request.body['universityId'] != "empty") {
      await user.save({ fields: ['name', 'email', 'password', 'lastname', 'userType', 'verificated', 'universityId'] });
    } else {
      await user.save({ fields: ['name', 'email', 'password', 'lastname', 'userType', 'verificated'] });
    }
    const verification = {
      token: randtoken.generate(30),
      userId: user.id,
    };
    const verificationEntity = await ctx.orm.verification.build(verification);
    await verificationEntity.save({ fields: ['userId', 'token'] });
    const verificateEmailPath = 'http://' + ctx.request.host + ctx.router.url('verificateEmail.verificate') + '?token=' + verificationEntity.token;
    await sendEmailVerificationEmail(ctx, { email: user.email, verificateEmailPath });
    ctx.status = 201;
    await ctx.redirect(ctx.router.url('session.new'));
  } catch (validationError) {
    ctx.status = 400;
    const universitiesList = await ctx.orm.university.findAll();
    await ctx.render('users/register', {
      user,
      universitiesList,
      createUserPath: ctx.router.url('users.create'),
    });
  }
});

router.get('users.profile', '/:id/profile', userLogged, checkProfileEditable, async (ctx) => {
  const user = await ctx.orm.user.findById(ctx.params.id);
  user.university = await user.getUniversity();
  const staffUniversities = await user.getStaffUniversities();
  testsResults = await vocationalResults(1, ctx);
  const { editableBoolean } = ctx.state;
  const editUserPath = ctx.router.url('users.editForm', { id: user.id });
  const addUserImagePath = ctx.router.url('users.addImage', { id: user.id });
  const submitEditUserPath = ctx.router.url('users.edit', { id: user.id });
  const submitPasswordUserPath = ctx.router.url('users.editPassword', { id: user.id });
  const deleteUserPath = ctx.router.url('users.delete', { id: user.id });
  let universitiesList = []
  let careersList = []
  if (ctx.state.currentUser.admin) {
    careersList = await ctx.orm.career.findAll();
    universitiesList = await ctx.orm.university.findAll(); 
  }
  await ctx.render('users/show', {
    user,
    editUserPath,
    addUserImagePath,
    editableBoolean,
    testsResults: testsResults,
    submitEditUserPath,
    submitPasswordUserPath,
    deleteUserPath,
    // staff
    staffUniversities,
    universityShowPath: university => ctx.router.url('universities.show', { id: university.id }),
    universityEditPath: university => ctx.router.url('universities.edit', { id: university.id }),
    careerListPath: ctx.router.url('careers.list'),
    newCareerPath: university => ctx.router.url('careers.new', { id: university.id }),
    // admin
    universitiesList,
    careersList,
    careerShowPath: career => ctx.router.url('careers.show', { id: career.id }),
    editCareerPath: career => ctx.router.url('careers.edit', { id: career.id }),
    deleteCareerPath: career => ctx.router.url('careers.delete', { id: career.id }),
  });
});

router.get('users.editForm', '/:id/profile/edit', userLogged, checkProfileEditable, redirectIfNotUser, async (ctx) => {
  const user = await ctx.orm.user.findById(ctx.params.id);
  const submitEditUserPath = ctx.router.url('users.edit', { id: user.id });
  const deleteUserPath = ctx.router.url('users.delete', { id: user.id });
  await ctx.render('users/editForm', {
    user,
    submitEditUserPath,
    deleteUserPath,
  });
});


router.post('users.edit', '/:id/profile/edit', userLogged, checkProfileEditable, redirectIfNotUser, async (ctx) => {
  console.log(ctx.request.body);
  const user = await ctx.orm.user.findById(ctx.params.id);
  const { name, email, lastname } = ctx.request.body;
  try {
    await user.update({ name, email, lastname, });
    await ctx.redirect(ctx.router.url('users.profile', {
      id: user.id,
    }));
  } catch (e) {
    await ctx.redirect(ctx.router.url('users.editForm', {
      id: user.id,
    }));
  }
});

router.post('users.editPassword', '/:id/profile/password', userLogged, checkProfileEditable, redirectIfNotUser, async (ctx) => {
  const user = await ctx.orm.user.findById(ctx.params.id);
  const { password, confirmPassword} = ctx.request.body;
  try {
    if ( password && password == confirmPassword ) {
      await user.update({ password });
    } else {
    }
    await ctx.redirect(ctx.router.url('users.profile', {
      id: user.id,
    }));
  } catch (e) {
    await ctx.redirect(ctx.router.url('users.profile', {
      id: user.id,
    }));
  }
});

router.post('users.addImage', '/:id/add_image', userLogged, checkProfileEditable, redirectIfNotUser, async (ctx) => {
  const user = await ctx.orm.user.findById(ctx.params.id);
  const response = await cloudinary.uploader.upload(ctx.request.files.userImage.path, {
    public_id: `users-images/${user.id}/${user.id}${takeOutExtension(ctx.request.files.userImage.name)}`,
  });
  await user.update({ imageUrl: `http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${response.version}/users-images/${user.id}/${user.id}${takeOutExtension(ctx.request.files.userImage.name)}` });
  await ctx.redirect(ctx.router.url('users.profile', { id: user.id }));
});

router.put('users.verifiy', '/:id/verify', userLogged, isAdmin, async (ctx) => {
  try {
    const user = await ctx.orm.user.findById(ctx.params.id);
    await user.update({verificated: true});
    ctx.status = 200;
    ctx.body = {
      "data": true
    }
  } catch (e) {
    console.log(e);
    ctx.status = 200;
    ctx.body = {
      "data": false
    }
  }
});

router.del('users.delete', '/:id', userLogged, checkProfileEditable, redirectIfNotUser, async (ctx) => {
  let isUser = parseInt(ctx.params.id) == parseInt(ctx.state.currentUser.id);
  try {
    const user = await ctx.orm.user.findById(ctx.params.id);
    await user.destroy();
  } catch (e) {
    return ctx.redirect('/');
  }
  if (isUser) {
    ctx.session = {};
    ctx.redirect('/');
  } else {
    ctx.body = {
      "data": true
    }
  }
});

module.exports = router;
