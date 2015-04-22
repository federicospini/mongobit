var async = require('async');
var partial = require('util-partial');
var mongojs = require('mongojs');
var db = mongojs('bitcoin', ['blocks', 'transactions']);

var save_transaction = function (transaction, done) {
  db.transactions.insert(transaction, done);
};

var save_block = function (block, done) {
  db.blocks.insert(block, done);
};

var save_block_and_transactions = function (block, done) {
  async.series([
    partial(save_block, block),
    partial(async.eachSeries, block.rawtx, save_transaction)
  ], done);
};

/**
 * Module exports
 */

module.exports = {
  save_transaction: save_transaction,
  save_block: save_block,
  save_block_and_transactions: save_block_and_transactions
};


