
/**
 * adapt_block
 * It performs following transofmations:
 *   - adds an `_id` field containing `hash` of the block
 *   - for the sake of space, removes `hash` field
 *   - removes `confirmation` field from block structure
 *   - removes `hex` field
 *   - perform adapt logic on each transaction of the block
 */

var adapt_block = function (block) {
  block._id = block.hash;
  delete block.hash;
  delete block.confirmations;
  delete block.hex;
  adapt_transactions(block.rawtx);
};

/**
 * adapt_transactions
 * It performs following transofmations:
 *   - adds an `_id` field containing `txid` of the block
 *   - for the sake of space, removes `txid` field
 *   - removes `confirmations` field from each transacion structure
 */

var adapt_transactions = function (transactions) {
  transactions.forEach(function (transaction) {
    transaction._id = transaction.txid;
    delete transaction.txid;
    delete transaction.confirmations;
  });
};

/**
 * adapt
 */

module.exports = function (block) {
  adapt_block(block);
  adapt_transactions(block.rawtx);
};
