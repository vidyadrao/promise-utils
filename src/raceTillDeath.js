"use strict";

module.exports = (arr) => {
    let noOfRejects = 0;
    arr = arr.map(
        p => (p.catch(
            () => {
                noOfRejects = noOfRejects + 1;
                return new Promise(
                    (resolve, reject) => {
                        if (noOfRejects === arr.length) {
                            reject('allrejected');
                        }
                    }
                );
            }
        ))
    );
    return Promise.race(arr);
};
