"use strict";
const promise = require('../src/createPromises');
const rtd = require('../src/raceTillDeath');
const expect = require('chai').expect;

describe('Race till death', function() {
    it('should resolve with the first resolvable promise when none are rejected', function() {
        return rtd([promise(200, 200), promise(50,50), promise(100, 100)]).then(data => {
            expect(data).to.equal(50);
        });
    });
    it('should resolve with the first resolvable promise even when some are rejected', function() {
        return rtd([promise(200, 200), promise(50,50, true), promise(100, 100)]).then(data => {
            expect(data).to.equal(100);
        });
    });
    it('should reject if the all the promises are rejected', function() {
        return rtd([promise(200, 200, true), promise(50,50, true), promise(100, 100, true)]).catch(data => {
            expect(data).to.equal('allrejected');
        });
    });

});
