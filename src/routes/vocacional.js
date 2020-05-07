const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('vocacional.index', '/', async (ctx) => {
  const testsList = await ctx.orm.vocationalTest.findAll();
  await ctx.render('vocacionales/index', {
    testsList,
    testVocacionalPath: test => ctx.router.url('vocacional.show', { id: test.id }),
  });
});

router.get('vocacional.show', '/:id', async (ctx) => {
  const poll = await ctx.orm.vocationalTest.findById(ctx.params.id);
  await ctx.render('vocacionales/show' , {
    poll,
    pollUrl: ctx.router.url('vocacional.save', { id: poll.id }),
    questionsUrl: ctx.router.url('vocacional.questions', { id: poll.id }),
    myResults: ctx.router.url('vocacional.results', { id: poll.id }),
  });
});

router.get('vocacional.questions', "/:id/questions", async (ctx) => {
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
        pollUrl: ctx.router.url('vocacional.save', { id: poll.id }),
        questionsUrl: ctx.router.url('polls.questions', { id: poll.id }),
      });
      break;
    default:
      break;
  }
});

router.get('vocacional.results', "/:id/results", async (ctx) => {
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
      await ctx.render('vocacionales/results', {
        myResults,
      });
      break;
    default:
      break;
  }
});

router.post('vocacional.save', "/:id", async (ctx) => {
  const attempt = ctx.orm.vocationalTestResult.build();
  attempt.userId = ctx.request.body.user.id;
  attempt.vocationalTestId = ctx.request.body.pollId;
  let data = analizeResultsPoll(ctx.params.id, ctx.request.body.answers);
  console.log("data", data);
  attempt.additionalInfo = JSON.stringify(data);
  // await attempt.save({ fields: ['vocationalTestId', 'userId', 'attempt', 'additionalInfo']});;
  ctx.body = {
    results: data
  }
});

function analizeResultsPoll(id, data) {
  if (id == 1) {
    return analizeResultsPoll_1(data);
  }
}
function analizeResultsPoll_1(data) {
  // console.log(data);
  let information = {
    "Intereses": {
      "C": [1, 2],
      "H": [3],
      "A": [4],
      "S": [5],
      "I": [],
      "D": [],
      "E": [],
    },
    "Aptitudes": {
      "C": [1, 2],
      "H": [],
      "A": [],
      "S": [5],
      "I": [],
      "D": [],
      "E": [],
    }
  }
  answers = {
    "Intereses": {
      "C": [-1, ["Organizativo", "Supervisión"]],
      "H": [-1, ["Precisión Verbal"]],
      "A": [-1, ["Estético"]],
      "S": [-1, ["Asistir"]],
      "I": [-1, []],
      "D": [-1, []],
      "E": [-1, []],
    },
    "Aptitudes": {
      "C": [-1, ["Persuasivo"]],
      "H": [-1, []],
      "A": [-1, []],
      "S": [-1, ["Altruista"]],
      "I": [-1, []],
      "D": [-1, []],
      "E": [-1, []],
    } 
  }

  Object.keys(information).forEach(tipo => {
    Object.keys(information[tipo]).forEach(letra => {
      information[tipo][letra].forEach(numero => {
        if (data[numero.toString()] == true ){
          answers[tipo][letra][0] += 2;
        }
      });
    });
  });

  // console.log(answers);  

  let finalAnswers = {
    "Intereses": [],
    "Aptitudes": []
  }

  
  let infoAnswers = {
    "Intereses": {
      "min": -1,
      "amount": 0
    },
    "Aptitudes": {
      "min": -1,
      "amount": 0
    }
  }

  let tipos = ["Intereses", "Aptitudes"];
  tipos.forEach(function(tipo) {
    // console.log("partir", answers[tipo]["C"][0], answers[tipo]["H"][0]);
    if (answers[tipo]["C"][0] > answers[tipo]["H"][0]) {
      finalAnswers[tipo] = ["H", "C"];
    } else {
      finalAnswers[tipo] = ["C", "H"];
    }
  });

  Object.keys(answers).forEach(tipo => {
    Object.keys(answers[tipo]).forEach(letra => {
      // console.log(infoAnswers[tipo]["min"], answers[tipo][letra][0], finalAnswers[tipo], letra)
      if (infoAnswers[tipo]["amount"] < 2) {
        infoAnswers[tipo]["amount"] += 1;
      } else if (infoAnswers[tipo]["min"] < answers[tipo][letra][0]) {
        finalAnswers[tipo].shift();
        // console.log(finalAnswers[tipo][0], infoAnswers[tipo]["min"]);
        let valorComparar = answers[tipo][finalAnswers[tipo][0]][0];
        // console.log(valorComparar, answers[tipo][letra][0]);
        if (valorComparar > answers[tipo][letra][0]) {
          finalAnswers[tipo].push(letra);
        } else {
          finalAnswers[tipo].unshift(letra);
        }
        infoAnswers[tipo]["min"] = Math.min(valorComparar, answers[tipo][letra][0]);
      }
      // console.log(infoAnswers, finalAnswers);
    });
  });

  console.log(finalAnswers);

  return finalAnswers;
}

module.exports = router;