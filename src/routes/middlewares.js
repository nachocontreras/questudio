async function userLogged(ctx, next) {
    if (ctx.state.currentUser) {
        return next();
    }
    ctx.redirect(ctx.router.url('session.new'));
}


module.exports = userLogged;