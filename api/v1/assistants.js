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

// UPDATE one assistant
router.put('/:id', async (ctx) => {
  try {
    const saved = await models.Assistant.findByIdAndUpdate(ctx.params.id,
      { "$set": { "name": ctx.request.body.name }}, {new: true}
    );
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

// DELETE one assistant
router.delete('/:id', async (ctx) => {
    try {
      const deleted = await models.Assistant.findByIdAndDelete(ctx.params.id);
      if (!deleted) {
        ctx.throw(404);
      }
      ctx.body = "";
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

// POST question to assistant
router.post('/:id/questions/', async (ctx) => {
    try {
      const assistant = await models.Assistant.findByIdAndUpdate(ctx.params.id,
        { $push: { "questions": ctx.request.body }}, {new: true}
      );
      ctx.body = assistant;
  } catch (err) {
      ctx.throw(422);
  }
})

// GET a question by id
router.get('/:id/questions/:question', async (ctx) => {
    try {
      const assistant = await models.Assistant.findById(ctx.params.id)
      const question = await assistant.questions.id(ctx.params.question);
      if (!question) {
        ctx.throw(404);
      }
      ctx.body = question;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
})

// UPDATE a question by id
router.put('/:id/questions/:question', async (ctx) => {
    try {
      const assistant = await models.Assistant.findOneAndUpdate(
        { "_id": ctx.params.id, "questions._id": ctx.params.question },
        { "$set": { "questions.$": ctx.request.body }}, {new: true}
      );
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

// CREATE an option for a question
router.post('/:id/questions/:question/options', async (ctx) => {
  try {
    const assistant = await models.Assistant.findById(ctx.params.id)
    const question = await assistant.questions.id(ctx.params.question)
    await question.options.push(ctx.request.body)
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

// DELETE an option for a question
router.delete('/:id/questions/:question/options/:option', async (ctx) => {
  try {
    const assistant = await models.Assistant.findById(ctx.params.id)
    const question = await assistant.questions.id(ctx.params.question)
    await question.options.pull({_id:ctx.params.option})
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

// CREATE an option attribute link
router.post('/:id/questions/:question/options/:option/attributes', async (ctx) => {
    try {
      const assistant = await models.Assistant.findById(ctx.params.id)
      const question = await assistant.questions.id(ctx.params.question)
      const option = await question.options.id(ctx.params.option)
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
router.delete('/:id/questions/:question/options/:option/attributes/:attribute', async (ctx) => {
    try {
      const assistant = await models.Assistant.findById(ctx.params.id)
      const question = await assistant.questions.id(ctx.params.question)
      const option = await question.options.id(ctx.params.option)
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
router.post('/:id/questions/:question/options/:option/products', async (ctx) => {
    try {
      const assistant = await models.Assistant.findById(ctx.params.id)
      const question = await assistant.questions.id(ctx.params.question)
      const option = await question.options.id(ctx.params.option)
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
router.delete('/:id/questions/:question/options/:option/products/:product', async (ctx) => {
    try {
      const assistant = await models.Assistant.findById(ctx.params.id)
      const question = await assistant.questions.id(ctx.params.question)
      const option = await question.options.id(ctx.params.option)
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