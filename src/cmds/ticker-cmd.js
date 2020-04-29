const { printTicker } = require('../api/app-cli');

exports.command = 'ticker';
exports.aliases = 'tick';
exports.description = 'Return the ticker symbol details on the specified exchange';
exports.builder = {
  exchange: {
    demand: true,
    alias: 'e',
    string: true,
    description: 'Specify the name of the crypto exchange.',
  },
  symbol: {
    demand: true,
    alias: 's',
    string: true,
    description: 'Specify the trading pair symbol listed on the crypto exchange.',
  },
  rateLimit: {
    demand: false,
    alias: 'r',
    number: true,
    description: 'Specify the rate limit for polling the crypto exchange.',
  },
};
exports.handler = (argv) => {
  if (argv.exchange && argv.symbol) {
    let rateLimit = argv.rateLimit || undefined;
    printTicker(argv.exchange, argv.symbol, rateLimit);
  }
};
