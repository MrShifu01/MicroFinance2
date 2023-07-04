const request = require('supertest');
const express = require('express');

// Create an Express app
const app = express();

// Define your route handler
app.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

describe('Route Handler Snapshot Test', () => {
  it('should match the snapshot', async () => {
    const response = await request(app).get('/test');
    expect(response.body).toMatchSnapshot();
  });
});
