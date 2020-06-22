const KoaRouter = require('koa-router');
const router = new KoaRouter();

const { userLogged } = require('../routes/middlewares');

async function addSimulationData(user, interests, data, models) {
    var careers;
    await models.simulation.destroy({
        where: {
            userId: user.id
        }
    })
    if (interests == 'all') {
        careers = await models.career.findAll();
    } else {
        careers = await models.career.findAll({
            where: {
                id: interests,
            }
        })
    }
    await careers.forEach(async (career) => {
        const mathPond = career.mathScore * data.mathScore;
        const lengPond = career.lengScore * data.lengScore;
        const rankPond = career.rankScore * data.rankScore;
        const nemPond = career.nemScore * data.nemScore;
        var scoreScienceHist;
        if (career.histScore && career.scienceScore) {
            scoreScienceHist = Math.max(data.scienceScore * career.scienceScore, data.histScore * career.histScore)
        } else if (career.histScore) {
            scoreScienceHist = career.histScore * data.histScore
        } else {
            scoreScienceHist = career.scienceScore * data.scienceScore
        }
        const ponderation = mathPond + lengPond + rankPond + nemPond + scoreScienceHist;
        await user.addSimulation(career, { through: { ponderation: ponderation.toFixed(2) } });
    })
}

router.get('simulator', '/:userId', userLogged, async (ctx) => {
    const careers = await ctx.orm.career.findAll();
    const universities = await Promise.all(careers.map(async (career) => await career.getUniversity()));
    for (let i = 0; i < careers.length; i++) {
        careers[i].university = universities[i].name;
    }
    await ctx.render('careers/simulator', {
        careers,
        createSimulationPath: (user) => ctx.router.url('simulator.create', { userId: user.id })
    })
})

router.post('simulator.create', '/:userId/create', userLogged, async (ctx) => {
    const { currentUser } = ctx.state;
    const data = ctx.request.body;
    const interests = data.interests.split(",");
    if (interests.includes('Todas las carreras')) {
        addSimulationData(currentUser, 'all', data, ctx.orm)
    } else {
        var careerIds = [];
        interests.forEach((interest) => {
            const dataCareer = interest.split('|')
            const id = dataCareer[2]
            careerIds.push(id);
        });
        careerIds.pop()
        const ids = careerIds.map(id => id.slice(1,))
        addSimulationData(currentUser, ids, data, ctx.orm)
    }
    ctx.redirect(ctx.router.url('careers.list'));
})

router.get('simulator.show', '/:userId/results',
    userLogged, async (ctx) => {
        const { currentUser } = ctx.state;
        const simulations = await currentUser.getSimulations();
        var universities = await Promise.all(simulations.map(async (career) => await career.getUniversity()))
        universities = universities.map((uni) => uni.name)
        for (var i = 0; i < simulations.length; i++) {
            simulations[i].university = universities[i];
        }
        const careersOver = simulations.filter((career) => career.simulation.ponderation >= career.corte);
        const careersUnder = simulations.filter((career) => career.simulation.ponderation < career.corte);
        ctx.redirect(ctx.router.url('users.profile'), { id: currentUser.id })
    })

module.exports = router;