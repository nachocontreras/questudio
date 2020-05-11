const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('landing', '/', async (ctx) => {
    await ctx.render('index', {
        universitiesListPath: ctx.router.url('universities.list'),
        careerListPath: ctx.router.url('careers.list'),
  });
});


module.exports = router;
