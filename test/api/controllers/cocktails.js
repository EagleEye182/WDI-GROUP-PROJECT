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
              '_id',
              'id',
              '__v',

              'createdAt',
              'updatedAt'
            ]);
          done();
        });
    });
  });

  // POST ROUTE
  describe('POST /api/cocktails', () => {
    it('should return a 201 response', done => {
      api
        .post('/api/cocktails')
        .set('Accept', 'application/json')
        .send({

        })
        .expect(201, done);
    });

    it('should return created cocktail data in response body', done => {
      api
        .post('/api/cocktails')
        .set('Accept', 'application/json')
        .send({

        })
        .end((err, res) => {
          expect(res.body)
            .to.be.an('object')
            .and.have.all.keys([
              '__v',
              '_id',
              'id',

              'createdAt',
              'updatedAt'
            ]);

          done();
        });
    });
  });

  // SHOW ROUTE
  describe('GET /api/cocktails/:id', () => {

    let testCocktail = null;

    beforeEach(done => {
      Cocktail.create({

      })
        .then(cocktailData => {
          testCocktail = cocktailData;
          done();
        })
        .catch(done);
    });

    it('should reutrn a 200 response', done => {
      api
        .get(`/api/cocktails/${testCocktail.id}`)
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('should return cocktail data in response body', done => {
      api
        .get(`/api/cocktails/${testCocktail.id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body)
            .to.be.an('object')
            .and.have.all.keys([
              '__v',
              '_id',
              'id',

              'createdAt',
              'updatedAt'
            ]);

          done();
        });
    });
  });

  // UPDATE ROUTE
  describe('PUT /api/cocktails/:id', () => {
    let testCocktail = null;

    beforeEach(done => {
      Cocktail.create({

      })
        .then(cocktailData => {
          testCocktail = cocktailData;
          done();
        })
        .catch(done);
    });

    it('should return a 200 response', done => {
      api
        .put(`/api/cocktails/${testCocktail.id}`)
        .set('Accept', 'application/json')
        .send({

        })
        .expect(200, done);
    });

    it('should return updated cocktail data in response body', done => {
      api
        .put(`/api/cocktails/${testCocktail.id}`)
        .set('Accept', 'application/json')
        .send({

        })
        .end((err, res) => {
          expect(res.body)
            .to.be.an('object')
            .and.to.have.property('color', 'blue');

          done();
        });
    });
  });

  // DELETE ROUTE
  describe('DELETE /api/cocktails/:id', () => {

    let testCocktail = null;

    beforeEach(done => {
      Cocktail.create({

      })
        .then(cocktailData => {
          testCocktail = cocktailData;
          done();
        })
        .catch(done);
    });

    it('should return a 204 response', done => {
      api
        .delete(`/api/cocktails/${testCocktail.id}`)
        .set('Accept', 'application/json')
        .expect(204, done);
    });
  });
});
