const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const university = require('./routes/university');
const career = require('./routes/career');

const router = new KoaRouter();

router.use(async (ctx, next) => {
    data = {
        universitiesPath: ctx.router.url('universities.list'),
        careersPath: ctx.router.url('careers.list'),
    }
    Object.assign(ctx.state, data);
    return next();
});

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/universities', university.routes());
router.use('/careers', career.routes());

module.exports = router;
