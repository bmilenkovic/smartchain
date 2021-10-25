const { throwStatement } = require('@babel/types');
const request = require('request');

const BASE_URL = 'http://localhost:3000';

const postTransact = ({ code, to, value, gasLimit }) => {
    return new Promise((resolve, reject) => {
        request(`${BASE_URL}/account/transact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, to, value, gasLimit })
        }, (error, response, body) => {
            return resolve(JSON.parse(body));
        });
    });
}

const getMine = () => {
    setTimeout(() => {
        return new Promise((resolve, reject) => {
            request(`${BASE_URL}/blockchain/mine`, (error, response, body) => {
                return resolve(JSON.parse(body));
            });
        }, 1000);
    });
}

let toAccountData;
postTransact({})
    .then(postTransactResponse => {
        console.log(
            'postTransactResponse (Create Account Transaction)',
            postTransactResponse
        );

        toAccountData = postTransactResponse.transaction.data.accountData;

        return getMine();
    }).then(getMineResponse => {
        console.log('getMineResponse', getMineResponse);

        return postTransact({ to: toAccountData.address, value: 20 });

    })
    .then(postTransactResponse2 => {
        console.log(
            'postTransactResponse2 (Standard Transaction)',
            postTransactResponse2
        );

        return getMine();

    })

    .then((getMineResponse) => {
        console.log('getMineResponse', getMineResponse);
    });
