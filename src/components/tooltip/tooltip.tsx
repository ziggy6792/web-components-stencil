import { Component, Prop, h, Method, Fragment, State } from '@stencil/core';

@Component({
  tag: 'uc-tooltip',
  styleUrl: './tooltip.css',
  shadow: true,
})
export class Tooltip {
  @Prop({ reflect: true }) text: string;

  @State()
  isTooltipVisible: boolean;

  toggle() {
    this.isTooltipVisible = !this.isTooltipVisible;
  }

  render() {
    return (
      <Fragment>
        <slot>Some default</slot>
        <span class='icon' onClick={() => this.toggle()}>
          ?
        </span>
        {this.isTooltipVisible && <div>{this.text}</div>}
      </Fragment>
    );
  }
}
