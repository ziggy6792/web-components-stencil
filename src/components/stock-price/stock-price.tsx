import { Component, Fragment, h } from '@stencil/core';

@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true,
})
export class StockPrice {
  onFetchStockPrice(event: Event) {
    event.preventDefault();
    console.log('submitted');
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={(event) => this.onFetchStockPrice(event)}>
          <input id='stock-symbol' />
          <button type='submit'>Fetch</button>
        </form>
        <div>
          <p>Price: {0}</p>
        </div>
      </Fragment>
    );
  }
}
