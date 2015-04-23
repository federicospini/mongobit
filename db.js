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
  var transactions = block.rawtx;
  block.rawtx = transactions.map(function (t) { return t._id; });
  async.series([
    partial(save_block, block),
    partial(save_transaction, transactions)
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


