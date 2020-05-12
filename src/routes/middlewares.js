async function userLogged(ctx, next) {
    if (ctx.state.currentUser) {
        return next();
    } else {
        ctx.redirect(ctx.router.url('session.new'));
    }
}

async function checkProfileEditable(ctx, next) {
    if (ctx.state.currentUser.id === parseInt(ctx.params.id, 10)) {
        ctx.state.editableBoolean = true;
        return next();
    } else {
        ctx.state.editableBoolean = false;
        return next();
    }
}

async function redirectIfNotUser(ctx, next) {
    if (ctx.state.currentUser.id === parseInt(ctx.params.id, 10)) {
        return next();
    } else {
        return ctx.redirect('/');
    }
}

module.exports = { userLogged, checkProfileEditable, redirectIfNotUser };
