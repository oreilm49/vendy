const Router = require('@koa/router');
const router = new Router({
    prefix: '/api/v1'
});
const questions = require('./questions')
router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'Vendy api v1 home route.'
  };
})
router.use('/questions', questions.routes())

module.exports = router;