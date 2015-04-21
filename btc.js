var clui = require('clui');
var commands = require('./commands.js')();
var util = require('util');
var utils = require('./utils.js');
var async = require('async');
var draw = require('./drawer.js');

/**** EXPERIMENTS ****/

function experiment01 (done) {
  var blocks = utils.range(0, 352963);
  var explored_blocks = 0;
  var Progress = clui.Progress;
  var bar = new Progress(100);
  var transactions_number = 0;
  async.eachLimit(blocks, 1, function (i, next) {
    commands.getBlockHash(i, function (err, blockhash) {
      commands.getBlock(blockhash, function (err, block) {
        // var transactionHash = block.tx[0];
        // getRawTransaction(transactionHash, function (err, rawTransaction) {
        //   decodeRawTransaction(rawTransaction, function (err, transaction) {
        //     console.log(err, transaction);
        //   });
        // });
        var transactions = block.rawtx;
        transactions_number += transactions.length;
        // transactions.forEach(function (transaction, transaction_counter) {
          draw(bar, explored_blocks++, blocks.length);
          // console.log('// start transaction ' + transaction_counter + ' of block ' + i + ' - $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
          // console.log(Object.keys(transaction));
          // console.log(util.inspect(transaction, { colors: true, depth: null, showHidden: false }));
          // console.log('id:' + transaction.txid);
          // console.log(' -> vin ---------------');
          // console.log(util.inspect(transaction.vin, { colors: true, showHidden: true, depth: null }));
          // console.log(' <- vout ----------------');
          // console.log(util.inspect(transaction.vout, { colors: true, showHidden: true, depth: null }));
          // var asms = transaction.vin.map(function (input) {
          //   return input.scriptSig.asm.split(' ')[1];
          // });
          // transaction.vout.forEach(function (vout) {
            // types.add(vout.scriptPubKey.type);
          // });
          // addresses.addAll(asms);
          // console.log(util.inspect(asms, { colors: true, depth: null, showHidden: false }));
          // console.log('// end transaction ' + transaction_counter + ' of block ' + i + ' - $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n');
        // });
        // console.log('// end block' + i + ' - ######################################################## \n');
        setImmediate(next);
      });
    });
  }, function () {
    var iter = types.values();
    var next = iter.next();
    while (!next.done) {
      console.log(next.value);
      next = iter.next();
    }
    // console.log('Found ' + types.size + ' transaction types');
    console.log('Found ' + transactions_number + ' transactions');
    setImmediate(done);
  });
}

function experiment02 (done) {
  var begin = 352900; 
  var end = 352963;
  var start = Date.now();
  var blocks = utils.range(begin, end);
  var explored_blocks = 0;
  var transactions_number = 0;
  async.eachLimit(blocks, 1, function (i, next) {
    commands.getBlockHash(i, function (err, blockhash) {
      commands.getBlock(blockhash, function (err, block) {
        var transactions = block.rawtx;
        transactions_number += transactions.length;
        setImmediate(next);
      });
    });
  }, function () {
    var stop = Date.now();
    var time = stop - start; 
    console.log('• ' + time + ' ms: found ' + transactions_number + ' transactions in ' + (end - begin) + ' blocks.');
    setImmediate(done);
  });
}

/**** MAIN ****/

commands.start([experiment02]);

