var mognojs = require('mongojs');
var db = mongojs('bitcoin', ['blocks', 'transactions']);

var save_transaction = function (transaction, done) {
  db.transactions.insert(transaction, done);
};

var save_block = function (block, done) {
  db.blocks.insert(block, done);
};

/**
 * Module exports
 */

module.exports = {
  save_transaction: save_transaction,
  save_block: save_block
};


