const KoaRouter = require('koa-router');
var Op = require('sequelize').Op;
const router = new KoaRouter();

router.get('/', async (ctx) => {
    console.log(ctx.query);
    if (ctx.query['text'] != undefined ) {
        let text = ctx.query['text'];
        new_dict = {
            amount: 0,
            data: {
                "Universidades": [
    
                ],
                "Carreras": [
                    
                ]
            }
        }
        const universities = await ctx.orm.university.findAll({ 
            where: {
                name: {
                    [Op.iLike]: `%${text}%`
                }
            }
        });
        new_dict["amount"] += universities.length;
        new_dict["data"]['Universidades'] = universities;
        const careers = await ctx.orm.career.findAll({ 
            where: {
                name: {
                    [Op.iLike]: `%${text}%`
                }
            }
        });
        new_dict["amount"] += careers.length;
        new_dict["data"]['Carreras'] = careers;
    }
    ctx.statusCode = 200;
    ctx.body = new_dict;
});

module.exports = router;
