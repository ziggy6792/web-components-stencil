import { Component, State, h, Fragment, Event, EventEmitter } from '@stencil/core';

import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'uc-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true,
})
export class StockFinder {
  stockNameInput: HTMLInputElement;

  @State() searchResults: { symbol: string; name: string }[] = [];

  @Event({ bubbles: true, composed: true }) ucSymbolSelected: EventEmitter<string>;

  @State() loading = false;

  onFindStocks(event: Event) {
    this.loading = true;
    event.preventDefault();
    const stockName = this.stockNameInput.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
      .then((res) => res.json())
      .then((parsedRes) => {
        this.searchResults = parsedRes['bestMatches'].map((match) => {
          return { name: match['2. name'], symbol: match['1. symbol'] };
        });
        console.log(this.searchResults);
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }

  onSelectSymbol(symbol: string) {
    this.ucSymbolSelected.emit(symbol);
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={(e) => this.onFindStocks(e)}>
          <input id='stock-symbol' ref={(el) => (this.stockNameInput = el)} />
          <button type='submit'>Find!</button>
        </form>
        {!this.loading && (
          <ul>
            {this.searchResults.map((result) => (
              <li onClick={() => this.onSelectSymbol(result.symbol)}>
                <strong>{result.symbol}</strong> - {result.name}
              </li>
            ))}
          </ul>
        )}
        {this.loading && <uc-spinner />}
      </Fragment>
    );
  }
}
