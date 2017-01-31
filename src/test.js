"use strict";
const cb = require('./createPromises');
const index = require('./index');

index.allSettled(
    [
        cb(100, 100),
        cb(100, 100, true),
        cb(100, 100)
    ]
).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

index.inSequence(cb(200, 'first')).then(data => console.log(data));
index.inSequence(cb(100, 'second')).then(data => console.log(data));
index.inSequence(cb(100, 'third')).then(data => console.log(data));
