async function vocationalResults(id, ctx) {
    if (!ctx.state.currentUser) {
      return {}
    }
    const myResults = await ctx.orm.vocationalTestResult.findAll( {
      where: {
        userId: ctx.state.currentUser.id,
        vocationalTestId: id
      }
    })
    return {
      data: myResults,
    };
};

module.exports = {
    vocationalResults
};
  