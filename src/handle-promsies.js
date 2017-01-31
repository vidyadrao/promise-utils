"use strict";
let lastPromise = Promise.resolve(true);
module.exports.queue = (cb) => {
    lastPromise = lastPromise.then(
        () => cb()
    ).catch(
        () => cb()
    );
    return lastPromise;
};

const listOfCbs = [];
let lastcb = Promise.resolve(true);
module.exports.last = (cb) => {
    listOfCbs.push(cb);
    lastcb = lastcb.catch(() => undefined).then(
        () => {
            if (listOfCbs.length === 1) {
                const lastCb = listOfCbs.pop();
                return lastCb();
            }
            listOfCbs.shift();
            throw new Error('Stale request');
        }
    );
    return lastcb;
};
