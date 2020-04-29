let calArbitrage = (exchangesTickerSymbolInfo, priceDiff) => {
  let exchangesArbitrageInfo = [];
  let etiLength = exchangesTickerSymbolInfo.length;
  let index = 0;

  for (let i = 0; i < etiLength; i++) {
    const primaryEx = exchangesTickerSymbolInfo[i];
    for (let j = i + 1; j < etiLength; j++) {
      const secondaryEx = exchangesTickerSymbolInfo[j];
      const psDiff = primaryEx.price - secondaryEx.price;
      const absPSDiff = Math.abs(psDiff);
      const arbitrage = absPSDiff >= priceDiff;
      if (arbitrage) {
        exchangesArbitrageInfo[index] = {
          sourceEx: psDiff < 0 ? secondaryEx.name : primaryEx.name,
          targetEx: psDiff < 0 ? primaryEx.name : secondaryEx.name,
          priceDiff: absPSDiff
        };
        index++;
      }
    }
  }
  return exchangesArbitrageInfo;
};

module.exports = { calArbitrage };
