const User = require('../models/user');
const Cocktail = require('../models/cocktail');

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      res.status(200).json(user);
    })
    .catch(next);
}



function yourProfile(req, res, next) {
  Cocktail
    .find()
    .populate('createdBy comments.createdBy')
    .exec()
    .then((cocktails) => {
      if(!cocktails) return res.status(404).send('Not found');
      res.render('userProfile', { cocktails });
      console.log('userProfile', cocktails);
    })
    .catch(next);
}

module.exports = {
  show: usersShow,
  userProfile: yourProfile
};
