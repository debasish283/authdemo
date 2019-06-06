global.assert = require('assert');

describe('finally', function() {
  after(function() {
    console.log('after');
  });
})
