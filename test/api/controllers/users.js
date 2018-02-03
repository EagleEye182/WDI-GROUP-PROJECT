/* globals api, expect, it, describe, afterEach, beforeEach */
require('../../spec_helper');

const User = require('../../../models/user');

describe('Users Controller Tests', () => {

  afterEach(done => {
    User.collection.remove();
    done();
  });

  describe('GET /api/users/:id', () => {

    let user  = null;
    let token = null;

    beforeEach(done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'test',
          email: 'test@test.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          user  = res.body.user;
          token = res.body.token;
          done();
        });
    });

    it('should return a 200 response', done => {
      api
        .get(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done);
    });

    it('should return user data in response body', done => {
      api
        .get(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body)
            .to.be.an('object')
            .and.have.all.keys([
              '__v',
              '_id',
              'id',
              'username',
              'email',
              'password',
              'passwordConfirmation'
            ]);

          done();
        });
    });
  });

});
