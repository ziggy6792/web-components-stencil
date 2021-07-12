import { Component, Prop, h, Method, Fragment } from '@stencil/core';

@Component({
  tag: 'uc-tooltip',
  styleUrl: './tooltip.css',
  shadow: true,
})
export class Tooltip {
  @Prop({ reflect: true }) textContent: string;

  @Prop({ reflect: true }) isTooltipVisible: string;

  render() {
    return (
      <Fragment>
        <slot>Some default</slot>, <span class='icon'>?</span>
      </Fragment>
    );
  }
}
