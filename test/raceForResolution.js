"use strict";
const rfr = require('../src/raceForResolution');
const expect = require('chai').expect;
const promise = require('../src/createPromises');

describe('Race for resolution', function() {
    it('should resolve with the first resolvable promise', function() {
        return rfr([promise(100, 100), promise(200, 200), promise(50, 50)]).then(data => {
            expect(data).to.equal(50);
        });
    });
    it('should resolve with the first promise which is not rejected', function() {
        return rfr([promise(100, 100), promise(200, 200), promise(50, 50, true)]).then(data => {
            expect(data).to.equal(100);
        });
    });
});
