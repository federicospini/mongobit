var clui = require('clui');
var commands = require('./commands.js')();
var util = require('util');
var utils = require('./utils.js');
var async = require('async');
var draw = require('./drawer.js');
var db = require('./db.js');
var adapt = require('./adapt.js');

var bar = new clui.Progress(100);

var migration = function (done) {
  var begin = 352110; 
  var end = 352100;
  var start = Date.now();
  var blocks = utils.range(begin, end);
  var explored_blocks = 0;
  var transactions_count = 0;
  async.eachLimit(blocks, 1, function (height, next) {
    commands.getBlockHash(height, function (err, blockhash) {
      commands.getBlock(blockhash, function (err, block) {
        // statistics
        explored_blocks += 1;
        transactions_count += block.rawtx.length;

        // logging
        draw(bar, explored_blocks, blocks.length);

        // storaging
        adapt(block); // NB: has side effects on block and block.rawtx 
        db.save_block(block, next);
      });
    });
  }, function () {
    var stop = Date.now();
    var time = stop - start; 
    console.log('• ' + time + ' ms: found ' + transactions_count + ' transactions in ' + explored_blocks + ' blocks.');
    setImmediate(done);
  });
};

/**** MAIN ****/

commands.start([migration]);
