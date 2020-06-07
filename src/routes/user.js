const KoaRouter = require('koa-router');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const { userLogged } = require('../routes/middlewares');
const { checkProfileEditable } = require('../routes/middlewares');
const { redirectIfNotUser } = require('../routes/middlewares');
const { vocationalResults } = require('../routes/functions');


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
});

router.get('users.profile', '/:id/profile', userLogged, checkProfileEditable, async (ctx) => {
  const user = await ctx.orm.user.findById(ctx.params.id);
  user.university = await user.getUniversity();
  testsResults = await vocationalResults(1, ctx);
  const { editableBoolean } = ctx.state;
  const editUserPath = ctx.router.url('users.editForm', { id: user.id });
  const addUserImagePath = ctx.router.url('users.addImage', { id: user.id });
  const submitEditUserPath = ctx.router.url('users.edit', { id: user.id });
  const submitPasswordUserPath = ctx.router.url('users.editPassword', { id: user.id });
  const deleteUserPath = ctx.router.url('users.delete', { id: user.id });
  await ctx.render('users/show', {
    user,
    editUserPath,
    addUserImagePath,
    editableBoolean,
    testsResults: testsResults,
    submitEditUserPath,
    submitPasswordUserPath,
    deleteUserPath,
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

router.del('users.delete', '/:id', userLogged, checkProfileEditable, redirectIfNotUser, async (ctx) => {
  const user = await ctx.orm.user.findById(ctx.params.id);
  await user.destroy();
  ctx.session = {};
  ctx.redirect('/');
});

module.exports = router;
