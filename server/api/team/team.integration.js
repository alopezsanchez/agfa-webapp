'use strict';

var app = require('../..');
import User from '../user/user.model';
import Team from './team.model';
import request from 'supertest';

describe('Team API:', function() {

	var user;
  var newClub;
	var club;
	var token;
	var newTeam;
	var team;

	// Clear users before testing
	before(function() {
		Team.removeAsync();
		return User.removeAsync().then(function() {
			user = new User({
				name: 'Fake User',
				email: 'test@example.com',
				password: 'password',
				role: 'admin'
			});

			user.saveAsync();
		});
	});

	before(function() {
    newClub = new User({
			name: 'Fake Club',
			email: 'test2@example.com',
			password: 'password',
			role: 'club'
		});

    return newClub.saveAsync();
	});

	// Clear users after testing
	after(function() {
		Team.removeAsync();
		return User.removeAsync();
	});


	describe('GET /api/teams', function() {
		var teams;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

		beforeEach(function(done) {

			request(app)
				.get('/api/teams')
				.set('authorization', 'Bearer ' + token)
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					teams = res.body;
					done();
				});
		});

		it('should respond with JSON array', function() {
			expect(teams).to.be.instanceOf(Array);
		});
	});

	describe('POST /api/teams', function() {

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;

					request(app)
						.get('/api/users?_id='+newClub._id)
						.set('authorization', 'Bearer ' + token)
						.expect(201)
						.end((err, res) => {
							club = res.body[0];
							request(app)
								.post('/api/teams')
				        .set('authorization', 'Bearer ' + token)
								.send({
									name: 'New Team',
									club: club,
									categories: ['Tackle masculino', 'Flag'],
									parentTeam: null
								})
								.expect(201)
								.expect('Content-Type', /json/)
								.end((err, res) => {
									if (err) {
										return done(err);
									}
									newTeam = res.body;
									done();
								});
						});

        });
    });

		it('should respond with the newly created team', () => {
			expect(newTeam.name).to.equal('New Team');
			expect(newTeam.categories).to.be.instanceOf(Array);
      expect(newTeam.categories[0]).to.be.equal('Tackle masculino');
			expect(newTeam.categories[1]).to.be.equal('Flag');
			expect(newTeam.club).to.be.equal(newClub._id.toString());
		});

		it('should not create the team if the name is already in use', function(done) {
			request(app)
				.post('/api/teams')
				.set('authorization', 'Bearer ' + token)
				.send({
					name: 'New Team',
					club: club,
					categories: ['Tackle masculino', 'Flag'],
					parentTeam: null
				})
				.expect(500)
				.end(err => {
					if (err) {
						return done(err);
					}
					done();
				});
		});
	});

	describe('GET /api/teams/:id', function() {
    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

		beforeEach(function(done) {
			request(app)
				.get(`/api/teams/${newTeam._id}`)
        .set('authorization', 'Bearer ' + token)
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					team = res.body;
					done();
				});
		});

		afterEach(function() {
			team = {};
		});

		it('should respond with the requested team', function() {
			expect(team.name).to.equal('New Team');
			expect(newTeam.categories).to.be.instanceOf(Array);
      expect(newTeam.categories[0]).to.be.equal('Tackle masculino');
			expect(newTeam.categories[1]).to.be.equal('Flag');
			expect(newTeam.club).to.be.equal(newClub._id.toString());
		});

	});

	describe('PUT /api/teams/:id', function() {
		var updatedTeam;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

		beforeEach(function(done) {
			newTeam.name = 'Updated Team';

			request(app)
				.put(`/api/teams/${newTeam._id}`)
        .set('authorization', 'Bearer ' + token)
				.send(newTeam)
				.expect(200)
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) {
						return done(err);
					}
					updatedTeam = res.body[0];
					done();
				});
		});

		afterEach(function() {
			updatedTeam = {};
		});

		it('should respond with the updated team', function() {
			expect(updatedTeam.name).to.equal('Updated Team');
		});

		it('should respond with the updated team on a subsequent GET', function(done) {
			request(app)
				.get(`/api/teams/${newTeam._id}`)
        .set('authorization', 'Bearer ' + token)
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					let team = res.body;

					expect(team.name).to.equal('Updated Team');

					done();
				});
		});

		it('should not update the team if the name is already in use', function(done) {

			request(app)
				.post('/api/teams')
				.set('authorization', 'Bearer ' + token)
				.send({
					name: 'Team 2',
					club: club,
					categories: ['Tackle masculino', 'Flag'],
					parentTeam: null
				})
				.expect(201)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						return done(err);
					}

					newTeam.name = 'Team 2';
					request(app)
						.put(`/api/teams/${newTeam._id}`)
						.set('authorization', 'Bearer ' + token)
						.send(newTeam)
						.expect(500)
						.end(err => {
							if (err) {
								return done(err);
							}
							done();
						});
				});
		});
	});

	describe('DELETE /api/teams/:id', function() {

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

		it('should respond with 204 on successful removal', function(done) {
			request(app)
				.delete(`/api/teams/${newTeam._id}`)
        .set('authorization', 'Bearer ' + token)
				.expect(204)
				.end(err => {
					if (err) {
						return done(err);
					}
					done();
				});
		});

		it('should respond with 404 when team does not exist', function(done) {
			request(app)
				.delete(`/api/teams/${newTeam._id}`)
        .set('authorization', 'Bearer ' + token)
				.expect(404)
				.end(err => {
					if (err) {
						return done(err);
					}
					done();
				});
		});
	});
});
