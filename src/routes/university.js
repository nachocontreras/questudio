const KoaRouter = require('koa-router');
const router = new KoaRouter();

// /universities

async function loadUniversity(ctx, next) {
    ctx.state.university = await ctx.orm.university.findById(ctx.params.id); // 1
    return next(); 
}

router.get('universities.list', '/', async (ctx) => {
    const universitiesList = await ctx.orm.university.findAll();
    await ctx.render('universities/index', {
        universitiesList,
        universityShowPath: university => ctx.router.url('universities.show', { id: university.id }),
        careerListPath: ctx.router.url('careers.list'),
    });
});

router.get('universities.show', '/:id', loadUniversity, async (ctx) => {
    const { university } = ctx.state;
    const careersList = await university.getCareers();
    await ctx.render('universities/show', {
        university,
        careersList,
    });
});

module.exports = router;
