const Router = require('@koa/router');
const router = new Router({
    prefix: '/api/v1'
});
const assistants = require('./assistants')
router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'Vendy api v1 home route.'
  };
})
router.use(assistants.routes())

module.exports = router;