"use strict";
module.exports = function(arr) {
    arr = arr.map(
        p => (p.catch(() =>
            new Promise(
                () => {}
            )
        ))
    );
    return Promise.race(arr);
};
