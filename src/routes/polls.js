const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('polls.questions', "/:id/questions", async (ctx) => {
  const poll = await ctx.orm.vocationalTest.findById(1);
  let questionsList = [];
  questionsList = await poll.getQuestions();
  switch (ctx.accepts(['json', 'html'])) {
    case 'json':
      ctx.body = {
        questionsList: questionsList,
      };
      break;
    case 'html':
      await ctx.render('index', {
        poll,
        pollUrl: ctx.router.url('polls.save', { id: poll.id }),
        questionsUrl: ctx.router.url('polls.questions', { id: poll.id }),
      });
      break;
    default:
      break;
  }
});

router.post('polls.save', "/id", async (ctx) => {
  console.log(ctx.request.body);
  ctx.body = {
    results: ["Hola", "Chao"]
  }
});

module.exports = router;