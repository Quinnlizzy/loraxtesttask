const request = require('supertest');
const app = require('./server');

describe('POST /register', () => {
  it('TC1: should register a user with valid data', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
  });

  it('TC2: should not register a user with missing data', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
        // missing password
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toEqual(false);
  });

  it('TC3: should not register a user with invalid email', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid email',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toEqual(false);
  });

  it('TC4: should not register a user with short password', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'short'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toEqual(false);
  });

  it('TC5: should not register a user with duplicate email', async () => {
    await request(app)
      .post('/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });
    const res = await request(app)
      .post('/register')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toEqual(false);
  });
});
