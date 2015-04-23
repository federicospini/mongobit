
var remove_scriptSig_hex = function (vin) {
  vin.scriptSig && delete vin.scriptSig.hex;
};

var remove_scriptPubKey_hex = function (vout) {
  vout.scriptPubKey && delete vout.scriptPubKey.hex;
};

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
 *   - removes `hex` filed
 */

var adapt_transactions = function (transactions) {
  transactions.forEach(function (transaction) {
    var _id = transaction.txid || transaction._id;
    delete transaction.txid;
    delete transaction.confirmations;
    delete transaction.hex;
    // delete transaction.blockhash;
    // delete transaction.blocktime;
    transaction.vin.forEach(remove_scriptSig_hex);
    transaction.vout.forEach(remove_scriptPubKey_hex);
    transaction._id = _id;
  });
};

/**
 * adapt
 */

module.exports = function (block) {
  adapt_block(block);
  adapt_transactions(block.rawtx);
};
