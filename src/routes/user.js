const KoaRouter = require('koa-router');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

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
      console.log(ctx.request.body);
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
  const editUserPath = ctx.router.url('users.editForm', { id: user.id });
  const addUserImagePath = ctx.router.url('users.addImage', { id: user.id });
  await ctx.render('users/show', {
    user,
    editUserPath,
    addUserImagePath,
  });
});

router.get('users.editForm', '/:id/profile/edit', async (ctx) => {
  const user = await ctx.orm.user.findById(ctx.params.id);
  const submitEditUserPath = ctx.router.url('users.edit', { id: user.id });
  await ctx.render('users/editForm', {
    user,
    submitEditUserPath,
  });
});

router.post('users.edit', '/:id/profile/edit', async (ctx) => {
  const user = await ctx.orm.user.findById(ctx.params.id);
  const { name, email, password, lastname } = ctx.request.body;
  try {
    if (password) {
      await user.update({ name, email, lastname, password });
    } else {
      await user.update({ name, email, lastname });
    }
    await ctx.redirect(ctx.router.url('users.profile', {
      id: user.id,
    }));
  } catch (e) {
    await ctx.redirect(ctx.router.url('users.editForm', {
      id: user.id,
    }));
  }
});

router.post('users.addImage', '/:id/add_image', async (ctx) => {
  const user = await ctx.orm.user.findById(ctx.params.id);
  console.log('debio llegar1');
  const response = await cloudinary.uploader.upload(ctx.request.files.userImage.path, {
    public_id: `users-images/${user.id}/${user.id}${takeOutExtension(ctx.request.files.userImage.name)}`,
  });
  console.log('debio llegar');
  await user.update({ imageUrl: `http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${response.version}/users-images/${user.id}/${user.id}${takeOutExtension(ctx.request.files.userImage.name)}` });
  await ctx.redirect(ctx.router.url('users.profile', { id: user.id }));
});

module.exports = router;
