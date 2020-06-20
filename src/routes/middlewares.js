async function userLogged(ctx, next) {
  if (ctx.state.currentUser) {
    return next();
  }
  return ctx.redirect(ctx.router.url('session.new'));
}

async function checkProfileEditable(ctx, next) {
  if (ctx.state.currentUser.admin || ctx.state.currentUser.id === parseInt(ctx.params.id, 10)) {
    ctx.state.editableBoolean = true;
    return next();
  }
  return ctx.redirect('/');
}

async function redirectIfNotUser(ctx, next) {
  if (ctx.state.currentUser.admin || ctx.state.currentUser.id === parseInt(ctx.params.id, 10)) {
    return next();
  }
  return ctx.redirect('/');
}

async function isAdmin(ctx, next) {
  if (ctx.state.currentUser.admin === true) {
    return next();
  }
  return ctx.redirect('/');
}

// Este mw esta preparado para recibir un id de UNIVERSIDAD
async function isStaffOrAdmin(ctx, next) {
  const university = await ctx.orm.university.findById(ctx.params.id);
  const staffs = await university.getStaffs();
  const isStaff = staffs.map(staff => staff.id)
                        .includes(ctx.state.currentUser.id);
  const isAdmin = ctx.state.currentUser.admin === true;

  return (isStaff || isAdmin) ? next() : ctx.redirect('/');
}

// Este mw esta preparado para recibir un id de CARRERA
async function carrerIsStaffOrAdmin(ctx, next) {
  const carrer = ctx.orm.career.findById(ctx.params.id);
  const university = await carrer.getUniversity();
  const staffs = await university.getStaffs();
  const isStaff = staffs.map(staff => staff.id)
                        .includes(ctx.state.currentUser.id);
  const isAdmin = ctx.state.currentUser.admin === true;

  return (isStaff || isAdmin) ? next() : ctx.redirect('/');
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
  userLogged,
  checkProfileEditable,
  redirectIfNotUser,
  experienceGuard,
  isAdmin,
  isStaffOrAdmin,
  carrerIsStaffOrAdmin,
};
