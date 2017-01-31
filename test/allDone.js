"use strict";
const alldone = require('../src/allDone');
const cb = require('../src/createPromises');
const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));
const expect = chai.expect;
describe(
    'all done', function () {
        it(
            'should resolve when all fulfil', function () {
                return alldone(
                    [
                        cb(100, 'first'),
                        cb(100, 'second', true),
                        cb(100, 'third')
                    ]
                ).then(
                    ([first, second, third]) => {
                        expect(first).to.eql({ value: 'first' });
                        expect(second).to.eql({ reason: 'second' });
                        expect(third).to.eql({ value: 'third' });
                    }
                );
            }
        );
        it(
            'should wait for all promises to return', function () {
                const spy = sinon.spy(data => data);
                return alldone(
                    [
                        cb(100, 'first').then(spy),
                        cb(200, 'second').then(spy),
                        cb(150, 'third').then(spy)
                    ]
                ).then(
                    () => {
                        expect(spy).to.have.callCount(3);
                        expect(spy.getCall(0)).to.have.been.calledWith('first');
                        expect(spy.getCall(2)).to.have.been.calledWith('second');
                        expect(spy.getCall(1)).to.have.been.calledWith('third');
                    }
                );
            }
        );
    }
);
