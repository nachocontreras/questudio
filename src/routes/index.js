const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('landing', '/', async (ctx) => {
  const poll = await ctx.orm.vocationalTest.findById(1);
  await ctx.render('index' , {
    poll,
    pollUrl: ctx.router.url('polls.save', { id: poll.id }),
    questionsUrl: ctx.router.url('polls.questions', { id: poll.id }),
  });
});

module.exports = router;
