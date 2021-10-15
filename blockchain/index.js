const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ block, transactionQueue }) {
        return new Promise((resolve, reject) => {
          Block.validateBlock({
            lastBlock: this.chain[this.chain.length-1],
            block
          }).then(() => {
            this.chain.push(block);
            return resolve();
          }).catch(error => reject(error));
        });
      }
}

module.exports = Blockchain;

const blockchain = new Blockchain();

