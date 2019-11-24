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

// UPDATE an option by id
router.put('/:id/options/:option', async (ctx) => {
    try {
      const option = await models.Assistant.findOneAndUpdate(
        { "_id": ctx.params.id, "options._id": ctx.params.option },
        { "$set": { "options.$": ctx.request.body }}
      );
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

// CREATE an option attribute link
router.post('/:id/options/:option/attributes', async (ctx) => {
    try {
      const assistant = await models.Assistant.findById(ctx.params.id)
      const option = await assistant.options.id(ctx.params.option)
      if(Array.isArray(ctx.request.body)){
        ctx.request.body.forEach(val=>{
          option.attributes.push(val)
        })
      } else {
        await option.attributes.push(ctx.request.body)
      }
      const saved = await assistant.save()
      if (!saved) {
        ctx.throw(404);
      }
      ctx.body = saved;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
})

// DELETE an option attribute link
router.delete('/:id/options/:option/attributes/:attribute', async (ctx) => {
    try {
      const assistant = await models.Assistant.findById(ctx.params.id)
      const option = await assistant.options.id(ctx.params.option)
      await option.attributes.pull({_id:ctx.params.attribute})
      const saved = await assistant.save()
      if (!saved) {
        ctx.throw(404);
      }
      ctx.body = saved;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
})

// CREATE an option product link
router.post('/:id/options/:option/products', async (ctx) => {
    try {
      const assistant = await models.Assistant.findById(ctx.params.id)
      const option = await assistant.options.id(ctx.params.option)
      if(Array.isArray(ctx.request.body)){
        ctx.request.body.forEach(val=>{
          option.products.push(val)
        })
      } else {
        ctx.throw(400);
      }
      const saved = await assistant.save()
      if (!saved) {
        ctx.throw(404);
      }
      ctx.body = saved;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
})

// DELETE an option product link
router.delete('/:id/options/:option/products/:product', async (ctx) => {
    try {
      const assistant = await models.Assistant.findById(ctx.params.id)
      const option = await assistant.options.id(ctx.params.option)
      await option.products.pull(ctx.params.product)
      const saved = await assistant.save()
      if (!saved) {
        ctx.throw(404);
      }
      ctx.body = saved;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
})

module.exports = router;