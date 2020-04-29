const { watchArbitrageBTWExchanges, printArbitrageInfo } = require('../api/app-cli');

exports.command = 'arbitrage';
exports.aliases = 'arb';
exports.describe = 'Crypto Arbitrage Detective.';
exports.builder = {
  exchanges: {
    demand: true,
    alias: 'e',
    string: true,
    description: 'Specify a command separated list of exchanges for arbitrage.',
  },
  symbol: {
    demand: true,
    alias: 's',
    string: true,
    description: 'Specify the ticker symbol for arbitrage.',
  },
  priceDiff: {
    demand: true,
    alias: 'd',
    number: true,
    description: 'Specify the arbitrage between the exchanges.',
  },
  watch: {
    demand: false,
    alias: 'w',
    boolean: true,
    default: false,
    description: 'Runs the command in watch mode.',
  },
};

exports.handler = (argv) => {
  let exchanges = list(argv.exchanges);
  let symbol = argv.symbol;
  let priceDiff = argv.priceDiff;

  if (exchanges && symbol && priceDiff) {
    if (argv.watch) watchArbitrageBTWExchanges(exchanges, symbol, priceDiff);
    else printArbitrageInfo(exchanges, symbol, priceDiff);
  }
};

// Helper Functions
function list(val) {
  return val.split(',').map(String);
}
