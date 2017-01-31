"use strict";
module.exports = function(arr) {
    arr = arr.map(p => p.then(data => ({value: data})).catch(err => ({reason: err})));
    return Promise.all(arr);
};
