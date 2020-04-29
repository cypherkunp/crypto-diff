const { printSupportedExchanges } = require('../api/app-cli');

exports.command = 'support';
exports.aliases = 'sup';
exports.description = 'List of support exchanges and their trading pairs.';
exports.builder = {
  exchange: {
    demand: true,
    alias: 'e',
    boolean: true,
    description: 'Specify the name of the crypto exchange.',
  },
  tradingPairs: {
    demand: false,
    alias: 'p',
    boolean: true,
    description:
      'Lists the trading pair symbol listed on the crypto exchange. To be used along with --exchange',
  },
  isSymbolSupported: {
    demand: false,
    alias: 'i',
    string: true,
    description:
      'Returns true is the trading pair symbol is supported on the crypto exchange. To be used along with --exchange',
  },
};
exports.handler = (argv) => {
  if (argv.exchange && argv.tradingPairs) {
    //TODO
    console.log(`//TODO`);
  } else {
    printSupportedExchanges();
  }
};
