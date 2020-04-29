# crypto-diff

```
$ node cli.js
Usage: cli.js <command> [options]

Commands:
  cli.js arbitrage  Crypto Arbitrage Detective.                                                           [aliases: arb]
  cli.js ticker     Return the ticker symbol details on the specified exchange                           [aliases: tick]
  cli.js support    List of support exchanges and their trading pairs.                                    [aliases: sup]

Options:
  --help     Show help                                                                                         [boolean]
  --version  Show version number                                                                               [boolean]

Examples:
  cli.js arb -e binance,okex,bittrex -s BTC/USDT -d 5 --watch arb
  cli.js tick -e binance -s BTC/USDT tick
  cli.js sup --exchanges tick
  cli.js sup --exchanges --tradingPairs tick
```

```
$ node cli.js ticker binance BTC/USDT
--------------------------------------------------------
binance BTC/USDT
{ symbol: 'BTC/USDT',
  timestamp: 1548355014060,
  datetime: '2019-01-24T18:36:54.060Z',
  high: 3576.97,
  low: 3514.5,
  bid: 3555.03,
  bidVolume: 0.028962,
  ask: 3555.9,
  askVolume: 0.052859,
  vwap: 3546.46421643,
  open: 3563.94,
  close: 3555.05,
  last: 3555.05,
  previousClose: 3563.92,
  change: -8.89,
  percentage: -0.249,
  average: undefined,
  baseVolume: 23917.204993,
  quoteVolume: 84821511.66468963 }
```

```
$ node cli.js --help
Usage: cli.js <command> [options]

Commands:
  cli.js arbitrage  Crypto Arbitrage Detective.                                                           [aliases: arb]
  cli.js ticker     Return the ticker symbol details on the specified exchange                           [aliases: tick]
  cli.js support    List of support exchanges and their trading pairs.                                    [aliases: sup]

Options:
  --help     Show help                                                                                         [boolean]
  --version  Show version number                                                                               [boolean]

Examples:
  cli.js arb -e binance,okex,bittrex -s BTC/USDT -d 5 --watch arb
  cli.js tick -e binance -s BTC/USDT tick
  cli.js sup --exchanges tick
  cli.js sup --exchanges --tradingPairs tick
```

```
$ node cli.js -e binance,okex,bittrex -s BTC/USDT -d 2 -w Arbitrage detection enabled in watch
mode. Watching arbitrage for the trading pair BTC/USDT between exchanges binance, okex, bittrex....

Time took to fetch ticker symbol prices from all exchanges: 5816.975ms [ { name: 'binance', price:
3554.63 }, { name: 'okex', price: 3553.8504 }, { name: 'bittrex', price: 3556.99999999 } ] Arbitrage
detected between exchanges bittrex and binance for 2.3699999899999966 USDT Arbitrage detected
between exchanges bittrex and okex for 3.149599990000297 USDT

Time took to fetch ticker symbol prices from all exchanges: 5650.694ms [ { name: 'binance', price:
3555.24 }, { name: 'okex', price: 3553.8499 }, { name: 'bittrex', price: 3556.99999999 } ] Arbitrage
detected between exchanges bittrex and okex for 3.1500999899999442 USDT

Time took to fetch ticker symbol prices from all exchanges: 5559.503ms [ { name: 'binance', price:
3555.57 }, { name: 'okex', price: 3553.8501 }, { name: 'bittrex', price: 3556.99999999 } ] Arbitrage
detected between exchanges bittrex and okex for 3.1498999899999944 USDT

Time took to fetch ticker symbol prices from all exchanges: 5768.282ms [ { name: 'binance', price:
3555.2 }, { name: 'okex', price: 3553.8501 }, { name: 'bittrex', price: 3556.99999999 } ] Arbitrage
detected between exchanges bittrex and okex for 3.1498999899999944 USDT

Time took to fetch ticker symbol prices from all exchanges: 6190.932ms [ { name: 'binance', price:
3555.43 }, { name: 'okex', price: 3553.8711 }, { name: 'bittrex', price: 3556.99999999 } ] Arbitrage
detected between exchanges bittrex and okex for 3.1288999900002636 USDT

Time took to fetch ticker symbol prices from all exchanges: 6078.171ms [ { name: 'binance', price:
3555.55 }, { name: 'okex', price: 3553.8605 }, { name: 'bittrex', price: 3556.99999999 } ] Arbitrage
detected between exchanges bittrex and okex for 3.1394999900003313 USDT

Time took to fetch ticker symbol prices from all exchanges: 6192.040ms [ { name: 'binance', price:
3555.56 }, { name: 'okex', price: 3553.8711 }, { name: 'bittrex', price: 3556.99999999 } ] Arbitrage
detected between exchanges bittrex and okex for 3.1288999900002636 USDT

Time took to fetch ticker symbol prices from all exchanges: 6008.562ms [ { name: 'binance', price:
3555.57 }, { name: 'okex', price: 3554.6731 }, { name: 'bittrex', price: 3556.99999999 } ] Arbitrage
detected between exchanges bittrex and okex for 2.326899990000129 USDT

```
