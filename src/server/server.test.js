const request = require('supertest');
const app = require('./server');

describe('Server endpoint test', () => {
	it('should create a usersResponse ', async (done) => {
		const res = await request(app).post('/api/trip').send({
			location: 'Paris',
			arrivalDate: '20/02/2020',
			returnDate: '25/02/2020',
			userResponse: 'your good'
		});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('saveTripData');
		done();
	});

	it('Should get last response ', async (done) => {
		const res = await request(app).get('/api/trip');
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('location');
		done();
	});
});

//location, date, userResponse
