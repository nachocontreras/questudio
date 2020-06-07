const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('admin.dashboard', '/', async (ctx) => {
    await ctx.render('admin/dashboard', {
  });
});


module.exports = router;
