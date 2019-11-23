const Router = require('@koa/router');
const router = new Router({
  prefix: '/assistants'
});
const models = require("../../models")

// GET all assistants
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

// GET one assistant
router.get('/:id', async (ctx) => {
    try {
      const assistant = await models.Assistant.findById(ctx.params.id);
      if (!assistant) {
        ctx.throw(404);
      }
      ctx.body = assistant;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
})

// POST one assistant
router.post('/', async (ctx) => {
    try {
      const body = ctx.request.body;
      const assistant = await new models.Assistant(body).save();
      ctx.body = assistant;
  } catch (err) {
      ctx.throw(422);
  }
})

// POST option to assistant
router.post('/:id/options/', async (ctx) => {
    try {
      const body = ctx.request.body;
      const id = ctx.params.id
      const assistant = await models.Assistant.findByIdAndUpdate(id,
        { $push: { "options": body } }
      );
      ctx.body = assistant;
  } catch (err) {
      ctx.throw(422);
  }
})

// GET an option by id
router.get('/:id/options/:option', async (ctx) => {
    try {
      const assistant = await models.Assistant.findById(ctx.params.id)
      const option = await assistant.options.id(ctx.params.option);
      if (!option) {
        ctx.throw(404);
      }
      ctx.body = option;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
})

module.exports = router;