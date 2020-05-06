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

router.get('polls.results', "/:id/results", async (ctx) => {
  if (!ctx.state.currentUser) {
    ctx.redirect(ctx.router.url('index'));
    return;
  }
  const myResults = await ctx.orm.vocationalTestResult.findAll( {
    where: {
      userId: ctx.state.currentUser.id,
      vocationalTestId: ctx.params.id
    }
  })
  switch (ctx.accepts(['json', 'html'])) {
    case 'json':
      ctx.body = {
        myResults: myResults,
      };
      break;
    case 'html':
      await ctx.render('polls/results', {
        myResults,
      });
      break;
    default:
      break;
  }
});

router.post('polls.save', "/id", async (ctx) => {
  const attempt = ctx.orm.vocationalTestResult.build();
  attempt.userId = ctx.request.body.user.id;
  attempt.vocationalTestId = ctx.request.body.pollId;
  attempt.additionalInfo = JSON.stringify({
    results: ["Hola", "Chao"]
  });
  await attempt.save({ fields: ['vocationalTestId', 'userId', 'attempt', 'additionalInfo']});;
  ctx.body = {
    results: ["Hola", "Chao"]
  }
});

module.exports = router;