// Import modules
const request = require('supertest');
const app = require('./server');

// Describe test suite for the POST /register route
describe('POST /register', () => {
  // Test case 1: Reg user with valid data
  it('TC1: should register a user with valid data', async () => {
    // Send a POST req to /reg valid user
    const res = await request(app)
      .post('/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });
    // Expect res code to be 200 (OK)
    expect(res.statusCode).toEqual(200);
    // Expect the success property of the res body = true
    expect(res.body.success).toEqual(true);
  });

  // Test case 2: Do not register user with missing data
  it('TC2: should not register a user with missing data', async () => {
    // Send a POST request to /register with missing password
    const res = await request(app)
      .post('/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
        // missing password
      });
    // Expect the res status code to be 400 (Bad Request)
    expect(res.statusCode).toEqual(400);
    // Expect the success property of the res body to be false
    expect(res.body.success).toEqual(false);
  });

  // Test case 3: Do not reg a user with invalid email
  it('TC3: should not register a user with invalid email', async () => {
    // Send a POST req to /register with invalid email
    const res = await request(app)
      .post('/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid email', //should be caught by regex
        password: 'password123'
      });
    // Expect the response status code = 400 (Bad Request)
    expect(res.statusCode).toEqual(400);
    // Expect the success property of the res body to be false
    expect(res.body.success).toEqual(false);
  });

  // Test case 4: Do not reg user with short password
  it('TC4: should not register a user with short password', async () => {
    // Send a POST request to /register with short password
    const res = await request(app)
      .post('/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'short'
      });
    // Expect the res status code to be 400 (Bad Request)
    expect(res.statusCode).toEqual(400);
    // Expect the success property of the res body to be false
    expect(res.body.success).toEqual(false);
  });

  // Test case 5: Do not reg duplicate email
  it('TC5: should not register a user with duplicate email', async () => {
    // Send a POST request to /register with a user's data
    await request(app)
      .post('/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });
    // Send another POST request to /register with another user's data but the same email
    const res = await request(app)
      .post('/register')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });
    // Expect the res status code to be 400 (Bad Request)
    expect(res.statusCode).toEqual(400);
    // Expect the success property of the res body to be false
    expect(res.body.success).toEqual(false);
  });
});
