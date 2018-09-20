async function getCurrentValue(stock) {
  const url = `https://api.iextrading.com/1.0/stock/${stock.symbol}/ohlc`;
    const response = await fetch(url);
    const parse = await response.json();
    return {symbol: stock.symbol, price: parse.close.price, numShares: stock.numShares};
}

export default getCurrentValue;