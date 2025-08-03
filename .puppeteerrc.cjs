const {join} = require('path');

/**
 * @type {import('puppeteer').Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  // Use a specific Chrome executable for Railway
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
}; 