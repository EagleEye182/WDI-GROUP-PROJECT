/* globals api, expect, it, describe, afterEach, beforeEach */
require('../../spec_helper');

const Cocktail = require('../../../models/cocktail');

describe('cocktails Controller Tests', () => {
  afterEach(done => {
    Cocktail.collection.drop();
    done();
  });

  // INDEX ROUTE
  describe('GET /api/cocktails', () => {
    beforeEach(done => {
      Cocktail
        .create({
          name: 'LongIsland',
          description: 'good'
        })
        .then(() => done())
        .catch(done);
    });

    it('should return a 200 response', done => {
      api
        .get('/api/cocktails')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('should return an array of cocktails', done => {
      api
        .get('/api/cocktails')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should return an array of cocktail objects with specific properties', done => {
      api
        .get('/api/cocktails')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body)
            .to.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              // '_id',
              // 'id',
              // '__v',
              'id',
              'name',
              'description'
            ]);
          done();
        });
    });
  });
});
