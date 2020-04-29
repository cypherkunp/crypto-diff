('use strict');

const asTable = require('as-table');
const log = require('ololog').noLocate;
const ansi = require('ansicolor').nice;
const ccxt = require('ccxt');

const exchanges = require('../config/exchanges.json');
const exchangeMap = new Map();

let getSupportedExchanges = function() {
  return exchanges.supported;
};

let getTicker = async (exchangeName, symbol, rateLimit = undefined) => {
  // check if the exchange is supported by ccxt
  let exchangeFound = getSupportedExchanges().indexOf(exchangeName) > -1;
  if (exchangeFound) {
    // instantiate the exchange by exchangeName
    let exchange = null;
    if (exchangeMap.has(exchangeName)) exchange = exchangeMap.get(exchangeName);
    else {
      exchange = new ccxt[exchangeName]({ enableRateLimit: true });
      exchangeMap.set(exchangeName, exchange);
    }

    //let exchange = new ccxt[exchangeName]({ enableRateLimit: true })
    exchange.rateLimit = rateLimit ? rateLimit : exchange.rateLimit;
    exchange.tokenBucket.refillRate = 1 / exchange.rateLimit;

    // load all markets from the exchange
    let markets = await exchange.loadMarkets();

    if (symbol in exchange.markets) {
      return await exchange.fetchTicker(symbol);
    } else {
      throw `Symbol, ${symbol.red}, is not supported on the exchange: ${exchangeName.yellow}.`;
    }
  } else {
    throw `Exchange ${exchangeName.red} is not supported.`;
  }
};

// Functions tailored for the CLI interface
let getTickerSymbolPrice = async (exchangeName, symbol, rateLimit = undefined) => {
  let tickerInfo = await getTicker(exchangeName, symbol, rateLimit);
  return tickerInfo.last;
};

module.exports = { getSupportedExchanges, getTicker, getTickerSymbolPrice };
