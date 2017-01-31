"use strict";
let prevCB = Promise.resolve(true);
module.exports = cb => {
    prevCB = prevCB.then(cb).catch(cb);
    return prevCB;
};
