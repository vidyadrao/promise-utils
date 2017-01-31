"use strict";

module.exports = function(arr, time) {
    arr = arr.map(
        p => (p.catch(() =>
            new Promise(
                () => {}
            )
        ))
    );
    return new Promise(
        (resolve, reject) => {
            let done = false;
            setTimeout(
                () => {
                    if (!done) {
                        done = true;
                        reject('timeout');
                    }
                }, time
            );
            Promise.race(arr).then(
                data => {
                    if (!done) {
                        done = true;
                        resolve(data);
                    }
                }
            );
        }
    );
};
