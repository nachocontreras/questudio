const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const university = require('./routes/university');
const career = require('./routes/career');
const search = require('./routes/search');
const user = require('./routes/user');
const session = require('./routes/session');
const experience = require('./routes/experience');

const router = new KoaRouter();

router.use(async (ctx, next) => {
    data = {
        universitiesPath: ctx.router.url('universities.list'),
        careersPath: ctx.router.url('careers.list'),
        welcomePath: '/',
        createUserPath: ctx.router.url('users.new'),
        newSessionPath: ctx.router.url('session.new'),
        destroySessionPath: ctx.router.url('session.destroy'),
        currentUser: null,
    }
    if (ctx.session.userId) {
        data["currentUser"] = await ctx.orm.user.findById(ctx.session.userId);
        data["profilePath"] = ctx.router.url('users.profile', { id: ctx.session.userId });
    }
    Object.assign(ctx.state, data);
    return next();
});

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/universities', university.routes());
router.use('/careers', career.routes());
router.use('/search', search.routes());
router.use('/account', session.routes());
router.use('/users', user.routes());
router.use('/experiences', experience.routes());

module.exports = router;
