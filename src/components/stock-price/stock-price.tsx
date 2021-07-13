import { Component, h, State } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true,
})
export class StockPrice {
  @State() fetchedPrice: number;

  @State() sockUserInput: string;

  @State() stockInputValid = false;

  stockInput: HTMLInputElement;

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    const stockSymbol = this.stockInput.value;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then((res) => {
        return res.json();
      })
      .then((parsedRes) => {
        this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
        console.log(this.fetchedPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return [
      <form onSubmit={(e) => this.onFetchStockPrice(e)}>
        <input
          id='stock-symbol'
          ref={(el) => (this.stockInput = el)}
          value={this.sockUserInput}
          onInput={(e) => {
            this.sockUserInput = (e.target as HTMLInputElement).value;
            this.stockInputValid = this.sockUserInput.trim()?.length > 0;
          }}
        />
        <button type='submit' disabled={!this.stockInputValid}>
          Fetch
        </button>
      </form>,
      <div>
        <p>Price: ${this.fetchedPrice}</p>
      </div>,
    ];
  }
}
