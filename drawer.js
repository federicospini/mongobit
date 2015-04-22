var CLI = require('clui');
var clc = require('cli-color');

var Line = CLI.Line;
var Progress = CLI.Progress;

module.exports = function (bar, status, length) {
  process.stdout.write('\033[5A');
  var blankLine = new Line().fill().output();

  var websiteLine = new Line()
  .padding(2)
  .column(bar.update(status, length), 120)
  .fill()
  .output();

  blankLine.output();
};

