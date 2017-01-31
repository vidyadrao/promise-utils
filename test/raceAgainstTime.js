"use strict";
const rat = require('../src/raceAgainstTime');
const promise = require('../src/createPromises');
const expect = require('chai').expect;
describe('Race against time', function() {
    it('should resolve if any one promise resolves within the time', function() {
        return rat([promise(200, 200), promise(50, 50), promise(100, 100)], 200).then(data => {
            expect(data).to.equal(50);
        });
    });
    it('should reject if any promise does not resolve within the given time', function() {
        return rat([promise(200, 200), promise(50, 50), promise(100, 100)], 20).catch(data => {
            expect(data).to.equal('timeout');
        });
    });
    it('should resolve with the first resolvable promise', function() {
        return rat([promise(200, 200), promise(50, 50, true), promise(100, 100)], 1000).then(data => {
            expect(data).to.equal(100);
        });
    });
});
