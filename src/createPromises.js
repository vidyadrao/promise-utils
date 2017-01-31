module.exports = (time, val, shouldReject) =>
    (new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldReject) {
                reject(val);
            }
            resolve(val);
        }, time);
    }));
