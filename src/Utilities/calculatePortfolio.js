export function calculatePortfolio(
  trade,
  shares,
  symbol,
  newPortfolio,
  tradeValue,
  newCapital
) {
  var ownedShares = newPortfolio.find(function(stock) {
    return stock.symbol === symbol;
  });

  let sell = trade === "Sell";
  newCapital = sell ? (newCapital += tradeValue) : (newCapital -= tradeValue);

  let newNumShares =
    sell && ownedShares.numShares > shares
      ? (ownedShares.numShares -= shares)
      : ownedShares
        ? (ownedShares.numShares += shares)
        : shares;

  if (ownedShares) {
    ownedShares.numShares = newNumShares;
  } else {
    newPortfolio.push({
      symbol: symbol,
      numShares: shares
    });
  }

  newPortfolio = newPortfolio.filter(function(stock) {
    return stock.numShares !== 0;
  });
  return [newPortfolio, newCapital];
}

