const Router = require('@koa/router');
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = {
        status: 'success',
        message: 'Vendy api v1 questions route.'
      };
})

module.exports = router;