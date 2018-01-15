const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const should = chai.should();
chai.use(chaiHttp);

describe('index', function () {
	it('should exist', function() {
		return chai.request(app)
		.get('/')
		.then(function (res) {
			res.should.have.status(200);
		});
	});
	it('should exist', function() {
		return chai.request(app)
		.get('/profile.html')
		.then(function (res) {
			res.should.have.status(200);
		});
	});
});