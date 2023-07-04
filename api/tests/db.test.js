const mongoose = require('mongoose');
const connectDB = require('../config/db.js');

// Mock the console.log and process.exit functions
console.log = jest.fn();
process.exit = jest.fn();

describe('connectDB', () => {
  beforeAll(() => {
    // Mock the mongoose.connect function
    mongoose.connect = jest.fn(() => Promise.resolve({ connection: { host: 'localhost' } }));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should connect to MongoDB and log success message', async () => {
    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('MongoDB Connected localhost');
    expect(process.exit).not.toHaveBeenCalled();
  });

  it('should log error message and exit process on connection failure', async () => {
    const error = new Error('Connection failed');

    // Mock the mongoose.connect function to throw an error
    mongoose.connect = jest.fn(() => Promise.reject(error));

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(`Error: ${error}`);
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
