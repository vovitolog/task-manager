module.exports = {
   transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
   preset: 'jest-puppeteer',
   testRegex: './*\\.test\\.js$',
   setupFilesAfterEnv: ['./setupTests.js'],a
};