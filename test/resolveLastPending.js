"use strict";
const promise = require('../src/createPromises');
const rlp = require('../src/resolveLastPending');
const expect = require('chai').expect;

describe('Resolve last pending Promise', function() {
    it('should resolve immediately if there is only one promise', function(done) {
        rlp(() => promise(50,50)).then(data => {
            expect(data).to.equal(50);
        });
        setTimeout(() => {
            rlp(() => promise(200, 200)).then(data => {
                expect(data).to.equal(200);
                done();
            })
        }, 0);

    });
    it('should reject any pending promise when last one did not resolve', function(done) {
        rlp(() => promise(500,500)).then(data => {
            expect(data).to.equal(500);

        });
        setTimeout(() => {
            rlp(() => promise(200, 200)).then(data => {
                expect(data).to.equal(200);
                done();
            })
        }, 0);
    });
    it('should resolve the last pending promise', function(done) {
        rlp(() => promise(50,50)).then(data => {
            expect(data).to.equal(50);
        });
        setTimeout(() => {
            rlp(() => promise(20, 20)).catch(data => {
                expect(data.message).to.equal('stale data');
            });
            rlp(() => promise(70, 70)).then(data => {
                expect(data).to.equal(70);
                done();
            })
        }, 0);

    });

});