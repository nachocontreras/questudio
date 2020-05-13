const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('team.index', '/', async (ctx) => {
    await ctx.render('team', {
        
  });
});


module.exports = router;