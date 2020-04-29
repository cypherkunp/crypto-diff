#!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');

// Importing the command modules
const arbCMD = require('./src/cmds/arbitrage-cmd');
const tickCMD = require('./src/cmds/ticker-cmd');
const supCMD = require('./src/cmds/support-cmd');

const green = chalk.green;
const terminalWidth = yargs.terminalWidth();

yargs
  .usage('Usage: $0 <command> [options]')
  .command(arbCMD)
  .example(green('$0 arb -e binance,okex,bittrex -s BTC/USDT -d 5 --watch', 'arb'))
  .command(tickCMD)
  .example(green('$0 tick -e binance -s BTC/USDT', 'tick'))
  .command(supCMD)
  .example(green('$0 sup --exchanges', 'tick'))
  .example(green('$0 sup --exchanges --tradingPairs', 'tick'))
  .wrap(Math.min(120, terminalWidth))
  .epilog('Copyright 2018.').argv;

let argv = yargs.argv;
let command = argv._[0];

if (!command) {
  yargs.showHelp();
}
