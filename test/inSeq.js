"use strict";
const promise = require('../src/createPromises');
const inSeq = require('../src/inSeq');
const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));
const expect = chai.expect;


describe('In Sequence', function() {
    it('should resolve all the promises in sequence', function() {
        const spy = sinon.spy(data => data);
        inSeq(() => promise(100, 'first')).then(spy);
        inSeq(() => promise(50, 'second')).then(spy);
        inSeq(() => promise(200, 'third')).then(spy);
        return inSeq(() => promise(150, 'fourth')).then(data => {
            expect(spy).to.have.callCount(3);
            expect(spy.getCall(0)).to.have.been.calledWith('first');
            expect(spy.getCall(1)).to.have.been.calledWith('second');
            expect(spy.getCall(2)).to.have.been.calledWith('third');
        });

    });
    it('should reject all the promises in sequence', function() {
        const spy = sinon.spy(data => data);
        inSeq(() => promise(100, 'first', true)).catch(spy);
        inSeq(() => promise(50, 'second', true)).catch(spy);
        inSeq(() => promise(200, 'third', true)).catch(spy);
        return inSeq(() => promise(150, 'fourth', true)).catch(data => {
            expect(spy).to.have.callCount(3);
            expect(spy.getCall(0)).to.have.been.calledWith('first');
            expect(spy.getCall(1)).to.have.been.calledWith('second');
            expect(spy.getCall(2)).to.have.been.calledWith('third');
        });
    });
    it('should resolve/reject all the promises in sequence', function() {
        const spy = sinon.spy(data => data);
        inSeq(() => promise(100, 'first')).then(spy);
        inSeq(() => promise(50, 'second')).then(spy);
        inSeq(() => promise(200, 'third', true)).catch(spy);
        return inSeq(() => promise(150, 'fourth', true)).catch(data => {
            expect(spy).to.have.callCount(3);
            expect(spy.getCall(0)).to.have.been.calledWith('first');
            expect(spy.getCall(1)).to.have.been.calledWith('second');
            expect(spy.getCall(2)).to.have.been.calledWith('third');
        });
    });
});
