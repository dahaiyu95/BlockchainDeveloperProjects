/**
 *                          Blockchain Class
 *  The Blockchain class contain the basics functions to create your own private blockchain
 *  It uses libraries like `crypto-js` to create the hashes for each block and `bitcoinjs-message` 
 *  to verify a message signature. The chain is stored in the array
 *  `this.chain = [];`. Of course each time you run the application the chain will be empty because and array
 *  isn't a persisten storage method.
 *  
 */

const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./block.js');
const bitcoinMessage = require('bitcoinjs-message');

class Blockchain {

    /**
     * Constructor of the class, you will need to setup your chain array and the height
     * of your chain (the length of your chain array).
     * Also everytime you create a Blockchain class you will need to initialized the chain creating
     * the Genesis Block.
     * The methods in this class will always return a Promise to allow client applications or
     * other backends to call asynchronous functions.
     */
    constructor() {
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }

    /**
     * This method will check for the height of the chain and if there isn't a Genesis Block it will create it.
     * You should use the `addBlock(block)` to create the Genesis Block
     * Passing as a data `{data: 'Genesis Block'}`
     */
    async initializeChain() {
        if( this.height === -1){
            let block = new BlockClass.Block({data: 'Genesis Block'});
            await this._addBlock(block);
        }
    }

    /**
     * Utility method that return a Promise that will resolve with the height of the chain
     */
    getChainHeight() {
        return new Promise((resolve, reject) => {
            resolve(this.height);
        });
    }

    /**
     * _addBlock(block) will store a block in the chain
     * @param {*} block 
     * The method will return a Promise that will resolve with the block added
     * or reject if an error happen during the execution.
     * You will need to check for the height to assign the `previousBlockHash`,
     * assign the `timestamp` and the correct `height`...At the end you need to 
     * create the `block hash` and push the block into the chain array. Don't for get 
     * to update the `this.height`
     * Note: the symbol `_` in the method name indicates in the javascript convention 
     * that this method is a private method. 
     */
    _addBlock(block) {
        return new Promise(async (resolve, reject) => {

            let self = this;
            // set previous hash before set current hash
            if (self.height == -1) {
                block.previousBlockHash = null;
            } else {
                block.previousBlockHash = this.hash;
            }

            // set block info
            block.height = self.height + 1;
            block.time = new Date().getTime().toString().slice(0, -3);
            block.hash = SHA256(JSON.stringify(block)).toString();

            try {
                if (block.validate()) {
                    self.chain.push(block);

                    //update this.height
                    self.height += 1;

                    // return the block
                    resolve(block);

                }
                else {
                    console.error(new Error("Not Valid!"));
                    reject(block)
                    return;
                }
            }
            catch (error) {
                console.error(error);
                reject(error)
                return;
            }
            // push the block to chain

        });
    }

    /**
     * The requestMessageOwnershipVerification(address) method
     * will allow you  to request a message that you will use to
     * sign it with your Bitcoin Wallet (Electrum or Bitcoin Core)
     * This is the first step before submit your Block.
     * The method return a Promise that will resolve with the message to be signed
     * @param {*} address 
     */
    requestMessageOwnershipVerification(address) {
        return new Promise((resolve) => {
            // get timestamp and message
            let timeStamp = new Date().getTime().toString().slice(0, -3);
            let message = `${address}:${timeStamp}:starRegistry`;
            // return message for sign message
            resolve(message);
        });
    }

    /**
     * The submitStar(address, message, signature, star) method
     * will allow users to register a new Block with the star object
     * into the chain. This method will resolve with the Block added or
     * reject with an error.
     * Algorithm steps:
     * 1. Get the time from the message sent as a parameter example: `parseInt(message.split(':')[1])`
     * 2. Get the current time: `let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));`
     * 3. Check if the time elapsed is less than 5 minutes
     * 4. Veify the message with wallet address and signature: `bitcoinMessage.verify(message, address, signature)`
     * 5. Create the block and add it to the chain
     * 6. Resolve with the block added.
     * @param {*} address 
     * @param {*} message 
     * @param {*} signature 
     * @param {*} star 
     */
    submitStar(address, message, signature, star) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            //Get the time from the message sent as a parameter
            let msgTime = parseInt(message.split(':')[1]);
            //Get the current time
            let currTime = parseInt(new Date().getTime().toString().slice(0, -3));
            //Check if the time elapsed is less than 5 minutes
            if (currTime - msgTime >= 300) {
                var error = new Error('Error: the time elapsed is more than 5 minutes');
                console.error(error);
                reject(error);
                return;
            }
            //Veify the message with wallet address and signature
            let verified = bitcoinMessage.verify(message, address, signature);
            if (verified) {
                console.log("signature verified");
            }
            else {
                var error = new Error('signature not verified');
                console.log(error);
                reject(error);
                return;
            }

            // Create the block and add it to the chain(only address are needed.)
            let data = { address: address, message: message, signature: signature, star: star };
            let block = new BlockClass.Block(data);
            await this._addBlock(block);

            //return the block
            resolve(block);


        });
    }

    /**
     * This method will return a Promise that will resolve with the Block
     *  with the hash passed as a parameter.
     * Search on the chain array for the block that has the hash.
     * @param {*} hash 
     */
    getBlockByHash(hash) {
        let self = this;
        return new Promise((resolve, reject) => {
            let block = self.chain.find(p => p.hash == hash);
            if (block) {
                resolve(block);
            } else {
                resolve(null);
            }

        });
    }

    /**
     * This method will return a Promise that will resolve with the Block object 
     * with the height equal to the parameter `height`
     * @param {*} height 
     */
    getBlockByHeight(height) {
        let self = this;
        return new Promise((resolve, reject) => {
            let block = self.chain.filter(p => p.height === height)[0];
            if (block) {
                resolve(block);
            } else {
                resolve(null);
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with an array of Stars objects existing in the chain 
     * and are belongs to the owner with the wallet address passed as parameter.
     * Remember the star should be returned decoded.
     * @param {*} address 
     */
    getStarsByWalletAddress(address) {
        let results = [];
        let self = this;
        return new Promise((resolve, reject) => {
            try {
                self.chain.forEach(async (b) => {
                    let data = await b.getBData();
                    if (data.address === address) {
                        results.push(data);
                    }
                });
                resolve(results);
            }
            catch (error) {
                console.error(error);
                reject(error);
            }
            

        });
    }

    /**
     * This method will return a Promise that will resolve with the list of errors when validating the chain.
     * Steps to validate:
     * 1. You should validate each block using `validateBlock`
     * 2. Each Block should check the with the previousBlockHash
     */
    validateChain() {
        let invalidList = [];
        return new Promise(async (resolve, reject) => {

            if (this.height <= 0) {
                reject(new Error("validate chain failed"));
            }
            try {
                for (var i = 1; i <= this.height; i++) {
                    let block = this.chain[i];
                    let prevBlock = this.chain[i-1];
                    if (!block.validate()) {
                        invalidList.push(block);
                        console.error(new Error("this block not valid"));
                    }
                    else if (prevBlock.hash != block.previousBlockHash) {
                        invalidList.push(block);
                        console.error(new Error("not matched with previous block hash"));
                    }
                }
                resolve(invalidList)
            }
            catch (error) {
                reject(error);
                return;
            }

        });
    }

}

module.exports.Blockchain = Blockchain;   