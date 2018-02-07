const express = require('express');
const router  = express.Router();
const cocktails = require('../controllers/cocktails');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');
const cocktail = require('../controllers/cocktailApi');

// Routes go here

router.route('/getcocktails')
  .get(cocktail.proxy);

router.route('/cocktails')
  .get(cocktails.index)
  .post(cocktails.create);

router.route('/cocktails/:id')
  .all(secureRoute)
  .get(cocktails.show)
  .put(cocktails.update)
  .delete(cocktails.delete);

router.route('/cocktails/:id/favorite')
  .post(cocktails.favorite);

router.route('/cocktails/:id/unfavorite')
  .delete(secureRoute, cocktails.unfavorite);

router.route('/cocktails/:id/comments')
  .get(cocktails.getComments)
  .post(cocktails.addComment);

router.route('/cocktails/:id/comments/:commentId')
  .delete(cocktails.deleteComment);

router.route('/register')
  .post(auth.register);
//
router.route('/login')
  .post(auth.login);
//
router.route('/users/:id')
  .get(secureRoute, users.show);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
