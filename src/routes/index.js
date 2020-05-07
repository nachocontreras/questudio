const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('landing', '/', async (ctx) => {
  await ctx.render('index');
});

module.exports = router;
