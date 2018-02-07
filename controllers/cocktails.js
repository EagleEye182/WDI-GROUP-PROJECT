const Cocktail = require('../models/cocktail');
const Comment = require('../models/comment');
const rp = require('request-promise');

function searchRoute(req, res, next) {
  Cocktail
    .find()
    .exec()
    .then((cocktails) => res.json(cocktails))
    .catch(next);
}

function indexRoute(req, res) {
  Cocktail
    .find()
    .populate('createdBy')
    .exec()
    .then((cocktails) => {
      res.status(200).json(cocktails);
    })
    .catch(err => res.status(500).json(err));
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;
  Cocktail
    .create(req.body)
    .then((cocktail) => {
      res.status(201).json(cocktail);
    })
    .catch(next);
}

function showRoute(req, res, next) {
  //left in incase API files
  // Cocktail
  //   .findById(req.params.id)
  //   .populate('createdBy comments.createdBy')
  //   .exec()
  //   .then((cocktail) => {
  //     if(!cocktail) return res.notFound();
  //
  //     res.json(cocktail);
  //   })
  //   .catch(next);

  const localDb = function(req) {
    Cocktail
      .findOne({req})
      .exec()
      .then((cocktail) => {
        // console.log(cocktail);
        if(!cocktail) return res.notFound();

        res.json(cocktail);
      });
  };
  // console.log(req);

  rp({
    method: 'GET',
    url: `http://addb.absolutdrinks.com/drinks/${req.params.id}?apiKey=f2e2f533899b416ca6705e91908172f2`,
    json: true
  })
    .then((response) => {
      if(!response.totalResult) {
        localDb();
      } else {
        res.json(response);
      }

    })
    .catch(next);
}
// function showRoute(req, res, next) {
//   Cocktail
//     .findById(req.params.id)
//     .populate('createdBy comments.createdBy')
//     .exec()
//     .then((cocktail) => {
//       if(!cocktail) return res.notFound();
//
//       res.json(cocktail);
//     })
//     .catch(next);
// }


function updateRoute(req, res, next) {
  Cocktail
    .findById(req.params.id)
    .exec()
    .then((cocktail) => {
      if(!cocktail) return res.notFound();

      Object.assign(cocktail, req.body);
      return cocktail.save();
    })
    .then((cocktail) => res.json(cocktail))
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

  // req.body.createdBy = req.user;
  //
  // Cocktail
  //   .findById(req.params.id)
  //   .exec()
  //   .then((cocktail) => {
  //     if(!cocktail) return res.notFound();
  //
  //     const comment = cocktail.comments.create(req.body);
  //     cocktail.comments.push(comment);
  //
  //     return cocktail.save()
  //       .then(() => res.json(comment));
  //   })
  //   .catch(next);

  req.body.createdBy = req.user;
  req.body.cocktailId = req.params.id;

  Comment
    .create(req.body)
    .then((comment) => {

      return res.status(200).json(comment);
    })
    .catch(next);
}

function deleteCommentRoute(req, res, next) {

  Comment
    .findOne({cocktailId: req.params.id})
    .exec()
    .then((comment) => {

      if(!comment) return res.notFound();

      const cocktail = comment.cocktailId;
      comment.remove(cocktail);

      return comment.save();
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

function getCommentsRoute(req, res, next) {

  Comment
    .find({cocktailId: req.params.id})
    .exec()
    .then((comments) => {
      return res.status(200).json({comments});
    })
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  addComment: addCommentRoute,
  deleteComment: deleteCommentRoute,
  favorite: favoriteRoute,
  unfavorite: unfavoriteRoute,
  search: searchRoute,
  getComments: getCommentsRoute
};
