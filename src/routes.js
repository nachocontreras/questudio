const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const university = require('./routes/university');
const career = require('./routes/career');
const search = require('./routes/search');
const user = require('./routes/user');
const session = require('./routes/session');
const vocacionales = require('./routes/vocacional');
const experience = require('./routes/experience');
const comment = require('./routes/comment');
const simulation = require('./routes/simulation');
const team = require('./routes/team');
const admin = require('./routes/admin');
const { sessionDecoder } = require('./routes/functions');
const passwordRecovery = require('./routes/passwordRecovery');
const verificateEmail = require('./routes/verificateEmail');
const universitymedia = require('./routes/universitymedia');

const router = new KoaRouter();

router.use(async (ctx, next) => {
    data = {
        universitiesPath: ctx.router.url('universities.list'),
        careersPath: ctx.router.url('careers.list'),
        testsVocacionalesPath: ctx.router.url('vocacional.index'),
        simulationPath: (user) => ctx.router.url('simulator', { userId: user.id }),
        welcomePath: '/',
        createUserPath: ctx.router.url('users.new'),
        newSessionPath: ctx.router.url('session.new'),
        destroySessionPath: ctx.router.url('session.destroy'),
        currentUser: null,
    }
    if (ctx.session.userId) {
        data["currentUser"] = await ctx.orm.user.findById(sessionDecoder(ctx.session.userId));
        data["profilePath"] = ctx.router.url('users.profile', { id: sessionDecoder(ctx.session.userId) });
        data["editUserPath"] = ctx.router.url('users.editForm', { id: sessionDecoder(ctx.session.userId) });
    }
    Object.assign(ctx.state, data);
    return next();
});

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/universities', university.routes());
router.use('/careers', career.routes());
router.use('/search', search.routes());
router.use('/simulation', simulation.routes());
router.use('/account', session.routes());
router.use('/users', user.routes());
router.use('/vocacionales', vocacionales.routes());
router.use('/experiences', experience.routes());
router.use('/comments', comment.routes());
router.use('/team', team.routes());
router.use('/admin', admin.routes());
router.use('/passwordRecovery', passwordRecovery.routes());
router.use('/verificateEmail', verificateEmail.routes());
router.use('/universitymedia', universitymedia.routes());

module.exports = router;
