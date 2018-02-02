const Cocktail = require('../models/cocktail');


function indexRoute(req, res, next) {
  Cocktail
    .find()
    .populate('createdBy')
    .exec()
    .then((cocktails) => res.json(cocktails))
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;

  Cocktail
    .create(req.body)
    .then((cocktail) => res.status(201).json(cocktail))
    .catch(next);
}

function showRoute(req, res, next) {
  Cocktail
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((cocktail) => {
      if(!cocktail) return res.notFound();

      res.json(cocktail);
    })
    .catch(next);
}

function deleteRoute(req, res, next) {
  Cocktail
    .findById(req.params.id)
    .exec()
    .then((cocktail) => {
      if(!cocktail) return res.notFound();

      return cocktail.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function addCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Cocktail
    .findById(req.params.id)
    .exec()
    .then((cocktail) => {
      if(!cocktail) return res.notFound();

      const comment = cocktail.comments.create(req.body);
      cocktail.comments.push(comment);

      return cocktail.save()
        .then(() => res.json(comment));
    })
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Cocktail
    .findById(req.params.id)
    .exec()
    .then((cocktail) => {
      if(!cocktail) return res.notFound();

      const comment = cocktail.comments.id(req.params.commentId);
      comment.remove();

      return cocktail.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}


function favoriteRoute(req, res, next) {

  const userId = req.user.id;

  Cocktail
    .findById(req.params.id)
    .exec()
    .then((cocktail) => {
      if(!cocktail) return res.notFound();

      cocktail.favorites.push(userId);

      return cocktail.save();
    })
    .then((cocktail) => {
      return res.json(cocktail);
    })
    .catch(next);
}

function unfavoriteRoute(req, res, next) {

  const userId = req.user.id;

  Cocktail
    .findById(req.params.id)
    .exec()
    .then((cocktail) => {
      if(!cocktail) return res.notFound();

      const index = cocktail.favorites.indexOf(userId);
      cocktail.favorites.splice(index, 1);

      return cocktail.save();
    })
    .then((cocktail) => {
      return res.json(cocktail);
    })
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  delete: deleteRoute,
  addComment: addCommentRoute,
  deleteComment: deleteCommentRoute,
  favorite: favoriteRoute,
  unfavorite: unfavoriteRoute
};
