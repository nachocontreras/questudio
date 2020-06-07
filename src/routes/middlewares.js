async function userLogged(ctx, next) {
  if (ctx.state.currentUser) {
    return next();
  }
  return ctx.redirect(ctx.router.url('session.new'));
}

async function checkProfileEditable(ctx, next) {
  if (ctx.state.currentUser.id === parseInt(ctx.params.id, 10)) {
    ctx.state.editableBoolean = true;
    return next();
  }
  return ctx.redirect('/');
}

async function redirectIfNotUser(ctx, next) {
  if (ctx.state.currentUser.id === parseInt(ctx.params.id, 10)) {
    return next();
  }
  return ctx.redirect('/');
}

async function experienceGuard(ctx, next) {
  const career = await ctx.orm.career.findById(ctx.params.id);
  const currentUser = ctx.state.currentUser;

  if (currentUser.universityId == career.universityId && currentUser.userType == 1) {
    return next();
  }
  return ctx.redirect(ctx.router.url('careers.show', { id: career.id }));
}

module.exports = {
  userLogged, checkProfileEditable, redirectIfNotUser, experienceGuard,
};
