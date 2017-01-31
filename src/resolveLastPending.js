"use strict";
const pendingCB = [];
let firstP = Promise.resolve(true);
module.exports = (cb) => {
    pendingCB.push(cb);
    firstP = firstP.catch(() => {}).then(
        () => {
            if (pendingCB.length > 1) {
                pendingCB.shift();
                throw new Error('stale data');
            } else {
                return pendingCB.pop()();
            }
        }
    );
    return firstP;
};
