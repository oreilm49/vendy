const Router = require('@koa/router');
const router = new Router();
const models = require("../../models")

router.get('/', async (ctx) => {
    models.Assistant.find({}, (err, docs) => {
      if(err){
        ctx.body = {
          status: 'error',
          content: err
        }
      }
      ctx.body = {
        status: 'success',
        content: docs
      }
    });
})

module.exports = router;