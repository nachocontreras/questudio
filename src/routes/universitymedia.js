/* eslint-disable arrow-parens */
/* eslint-disable no-else-return */
const KoaRouter = require('koa-router');
const cloudinary = require('cloudinary').v2;
const randtoken = require('rand-token');
const { userLogged, isStaffOrAdmin } = require('../routes/middlewares');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.STORAGE_KEY,
  api_secret: process.env.STORAGE_SECRET,
});

function takeOutExtension(name) {
  return name.split('.').slice(0, -1).join('.');
}

function makeYoutubeLink(link) {
  const lista = link.split('/');

  return `http://youtube.com/embed/${lista[lista.length - 1]}`;
}

const router = new KoaRouter();

router.get('universitymedia.form', '/:id', userLogged, isStaffOrAdmin, async (ctx) => {
  const { id } = ctx.params;
  const university = await ctx.orm.university.findById(id);
  if (university) {
    return ctx.render('universitymedia/add-media-form', {
      postUniversityMediaPath: ctx.router.url('universitymedia.add', { id: university.id }),
    });
  } else {
    return ctx.redirect("/");
  }
});

router.post('universitymedia.add', '/:id', userLogged, isStaffOrAdmin, async (ctx) => {
  const { id } = ctx.params;
  const university = await ctx.orm.university.findById(id);
  const { mediaType, youtubeLink, memeLink } = ctx.request.body;
  const file = ctx.request.files.image;
  const universitymedia = await ctx.orm.universitymedia.build();
  const random = randtoken.generate(30);
  console.log(file);
  if (mediaType === '1') {
    // Image
    const response = await cloudinary.uploader.upload(file.path, {
      public_id: `universities-media/${university.id}/${university.id}${random}${takeOutExtension(file.name)}`,
    });
    universitymedia.mediaType = 1;
    universitymedia.url = `http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${response.version}/universities-media/${university.id}/${university.id}${random}${takeOutExtension(file.name)}`
    universitymedia.universityId = university.id;
    await universitymedia.save();
    await ctx.redirect(ctx.router.url('universitymedia.gallery', { id: university.id }));
  } else if (mediaType === '2') {
    // Youtube
    universitymedia.mediaType = 2;
    universitymedia.url = makeYoutubeLink(youtubeLink);
    universitymedia.universityId = university.id;
    await universitymedia.save();
    await ctx.redirect(ctx.router.url('universitymedia.gallery', { id: university.id }));
  } else if (mediaType === '3') {
    // Meme
    universitymedia.mediaType = 3;
    universitymedia.url = memeLink;
    universitymedia.universityId = university.id;
    await universitymedia.save();
    await ctx.redirect(ctx.router.url('universitymedia.gallery', { id: university.id }));
  } else {
    return ctx.redirect('/');
  }
});

router.get('universitymedia.gallery', '/:id/gallery', async (ctx) => {
  const { id } = ctx.params;
  const university = await ctx.orm.university.findById(id);
  if (university) {
    const universityMedias = await ctx.orm.universitymedia.findAll({ where: { universityId: university.id } });
    const imagesUrls = [];
    const youtubeUrls = [];
    const instagramUrls = [];
    if (universityMedias.length > 0) {
      universityMedias.forEach(media => {
        if (media.mediaType === 1) {
          imagesUrls.push(media.url);
        } else if (media.mediaType === 2) {
          youtubeUrls.push(media.url);
        } else if (media.mediaType === 3) {
          instagramUrls.push(media.url);
        }
      });
    }
    return ctx.render('universitymedia/gallery', {
      imagesUrls,
      youtubeUrls,
      instagramUrls,
    });
  } else {
    return ctx.redirect("/");
  }
});

module.exports = router;


// const response = await cloudinary.uploader.upload(ctx.request.files.universityImage.path, {
//   public_id: `universities-images/${university.id}/${university.id}${takeOutExtension(ctx.request.files.universityImage.name)}`,
// });
// await university.update({ imageUrl: `http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${response.version}/universities-images/${university.id}/${university.id}${takeOutExtension(ctx.request.files.universityImage.name)}` });