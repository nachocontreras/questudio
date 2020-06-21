const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('landing', '/', async (ctx) => {
    await ctx.render('index', {
        universitiesListPath: ctx.router.url('universities.list'),
        careersListPath: ctx.router.url('careers.list'),
        testsListPath: ctx.router.url('vocacional.index'),
        teamPath: ctx.router.url('team.index'),
        experiencePath: ctx.router.url('experience.list'),
  });
});


module.exports = router;
