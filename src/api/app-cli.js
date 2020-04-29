const chalk = require('chalk');
const asTable = require('as-table');
const ccxt = require('ccxt');
const log = console.log;
const highlight = chalk.green;
const info = chalk.bold.grey;

const { getSupportedExchanges, getTickerSymbolPrice, getTicker } = require('./exchange-api');

const { calArbitrage } = require('../lib/arb-engine');

let watchArbitrageBTWExchanges = async (
  exchanges = [],
  symbol,
  priceDiff = undefined,
  rateLimit = undefined
) => {
  let exchangesTickerSymbolInfo = undefined;
  let exchangeArbitrageInfo = undefined;

  log(`${info('Arbitrage detection enabled in watch mode.')}`);
  log(
    `Watching arbitrage for the trading pair ${symbol} between exchanges ${highlight(
      exchanges.join(', ')
    )}....`
  );
  while (true) {
    console.log();
    console.time('Time took to fetch ticker symbol prices from all exchanges');
    exchangesTickerSymbolInfo = await getTickerSymbolPricePerEx(exchanges, symbol);
    console.timeEnd('Time took to fetch ticker symbol prices from all exchanges');
    log(exchangesTickerSymbolInfo);

    exchangeArbitrageInfo = calArbitrage(exchangesTickerSymbolInfo, priceDiff);
    if (exchangeArbitrageInfo.length > 0) {
      for (const arb of exchangeArbitrageInfo) {
        console.log(
          `Arbitrage detected between exchanges ${arb.sourceEx} and ${arb.targetEx} for ${highlight(
            arb.priceDiff
          )} ${symbol.split('/')[1]}`
        );
      }
    }
  }
};

let getTickerSymbolPricePerEx = async (exchanges = [], symbol, rateLimit = undefined) => {
  let exchangesTickerSymbolInfo = [];
  for (let index = 0; index < exchanges.length; index++) {
    try {
      let tickerPrice = await getTickerSymbolPrice(exchanges[index], symbol, rateLimit);
      exchangesTickerSymbolInfo[index] = {
        name: exchanges[index],
        price: tickerPrice,
      };
    } catch (error) {
      log(error);
      continue;
    }
  }
  return exchangesTickerSymbolInfo;
};

let printArbitrageInfo = async function(
  exchanges = [],
  symbol,
  priceDiff = undefined,
  rateLimit = undefined
) {
  log(chalk.green(`Calculating arbitrage between the exchanges ${exchanges}...`));
  let tickerSymbolPricePerEx = await getTickerSymbolPricePerEx(
    exchanges,
    symbol,
    priceDiff,
    rateLimit
  );
  let calArb = calArbitrage(tickerSymbolPricePerEx, priceDiff);

  log(asTable.configure({ delimiter: ' | ' })(tickerSymbolPricePerEx));
  log();
  log(asTable.configure({ delimiter: ' | ' })(calArb));
};

let printTicker = async (exchangeName, symbol, rateLimit = undefined) => {
  try {
    log('--------------------------------------------------------');
    log(exchangeName.green, symbol.yellow);
    //    exchange.iso8601(exchange.milliseconds())
    let tickerInfo = await getTicker(exchangeName, symbol, rateLimit);
    log(ccxt.omit(tickerInfo, 'info'));
  } catch (error) {
    log(error);
  }
};

let printTickerPrice = async (exchangeName, symbol, rateLimit = undefined) => {
  let tickerPrice = await getTickerSymbolPrice(exchangeName, symbol, rateLimit);
  log(
    `Current price for the ticker symbol ${symbol.yellow} on ${
      exchangeName.green
    } is: ${tickerPrice}`
  );
};

let printSupportedExchanges = () => {
  log(
    chalk.yellow('Exchanges supported by Crypto arbitrage:'),
    chalk.green(getSupportedExchanges().join(', '))
  );
};

let printSupportedTickerSymbol = () => {
  //TODO
};

module.exports = {
  printTicker,
  printTickerPrice,
  printArbitrageInfo,
  printSupportedExchanges,
  watchArbitrageBTWExchanges,
};
