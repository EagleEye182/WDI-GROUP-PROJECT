const User = require('../models/user');

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .populate('cocktails')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      res.status(200).json(user);
    })
    .catch(next);
}
module.exports = {
  show: usersShow
};
