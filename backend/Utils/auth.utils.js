const bcypt = require('bcrypt');
const { HttpError } = require('./http');

const SALT_ROUNDS = 10;

async function hashPassword(password) {
  return bcypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password, hashedPassword) {
  const match = await bcypt.compare(password, hashedPassword);
  if (!match) {
    throw new HttpError(401, 'Invalid credentials');
  }
  return true;
}

module.exports = {
  hashPassword,
  verifyPassword,
};