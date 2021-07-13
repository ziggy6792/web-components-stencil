import { Component, h, Prop, State, Watch, Listen } from '@stencil/core';
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

  @State() error: string = null;

  stockInput: HTMLInputElement;

  @Prop({ reflect: true, mutable: true }) stockSymbol: string;

  @Watch('stockSymbol')
  stockSymnolChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.fetchStockPrice(newValue);
      this.sockUserInput = newValue;
    }
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    this.stockSymbol = this.stockInput.value;
  }

  @Listen('ucSymbolSelected', { target: 'body' })
  onStockSymbolSelect(event: CustomEvent) {
    console.log('stock symbol selected', event.detail);
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
      this.stockInputValid = true;
    }
  }

  fetchStockPrice(stockSymbol: string) {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then((res) => {
        return res.json();
      })
      .then((parsedRes) => {
        const recPrice = parsedRes['Global Quote']['05. price'];
        if (!recPrice) {
          throw new Error('Invalid');
        }
        this.fetchedPrice = +recPrice;
        this.error = null;
      })
      .catch((err) => {
        console.log(err);
        this.error = err.message;
      });
  }

  componentDidLoad() {
    if (this.stockSymbol) {
      this.fetchStockPrice(this.stockSymbol);
      this.sockUserInput = this.stockSymbol;
      this.stockInputValid = true;
    }
  }

  componentDidUpdate() {}

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
        {this.error && <div>{this.error}</div>}
        {!this.error && this.fetchedPrice && <p>Price: ${this.fetchedPrice}</p>}
        {!this.error && !this.fetchedPrice && <p>Please enter ticker</p>}
      </div>,
    ];
  }
}
