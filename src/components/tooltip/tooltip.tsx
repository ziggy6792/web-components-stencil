import { Component, Prop, h, Method } from '@stencil/core';

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
      <div>
        <div>{JSON.stringify(this.isTooltipVisible)}</div>
        <slot />
      </div>
    );
  }
}
