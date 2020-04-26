const KoaRouter = require('koa-router');
const router = new KoaRouter();

async function loadCareer(ctx, next) {
    ctx.state.career = await ctx.orm.career.findById(ctx.params.id); // 1
    return next(); 
}

router.get('careers.list', '/', async (ctx) => {
    const careersList = await ctx.orm.career.findAll();
    await ctx.render('careers/index', {
        careersList,
        careerShowPath: career => ctx.router.url('careers.show', { id: career.id }),
    });
});

router.get('careers.show', '/:id', loadCareer, async (ctx) => {
    const { career } = ctx.state;
    const university = await career.getUniversity();
    await ctx.render('careers/show', {
        career,
        university
    });
});

module.exports = router;
