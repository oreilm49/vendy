const Router = require('@koa/router');
const router = new Router({
  prefix: '/assistants'
});
const models = require("../../models")

router.get('/', async (ctx) => {
    try {
      const assistants = await models.Assistant.find();
      if (!assistants) {
        ctx.throw(404);
      }
      ctx.body = assistants;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
})

router.post('/', async (ctx, next) => {
    try {
      const body = ctx.request.body;
      const assistant = await new models.Assistant(body).save();
      ctx.body = assistant;
  } catch (err) {
      ctx.throw(422);
  }
})

module.exports = router;