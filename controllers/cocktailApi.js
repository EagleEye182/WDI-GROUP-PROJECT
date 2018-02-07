const rp = require('request-promise');

function cocktailProxy(req, res, next) {
  rp({
    method: 'GET',
    url: 'http://addb.absolutdrinks.com/drinks/?apiKey=f2e2f533899b416ca6705e91908172f2&start=0&pageSize=100',
    json: true
  })
    .then((response) => {
      res.json(response.result);
    })
    .catch(next);
}

module.exports = {
  proxy: cocktailProxy
};
