const rp = require('request-promise');

function cocktailProxy(req, res, next) {
  rp({
    method: 'GET',
    url: `http://addb.absolutdrinks.com/drinks/?apiKey=f2e2f533899b416ca6705e91908172f2&start=${req.params.offset}&pageSize=25`,
    json: true
  })
    .then((response) => {
      res.json(response.result);
    })
    .catch(next);
}

function cocktailQuickSearch(req, res, next) {
  rp({
    method: 'GET',
    url: `http://addb.absolutdrinks.com/quickSearch/drinks/${req.params.query}?apiKey=f2e2f533899b416ca6705e91908172f2`,
    json: true
  })
    .then((response) => {
      res.json(response.result);
    })
    .catch(next);
}

module.exports = {
  proxy: cocktailProxy,
  quickSearch: cocktailQuickSearch
};
