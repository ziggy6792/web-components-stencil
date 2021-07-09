import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'uc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  @Prop({ reflect: true }) title: string;
  @Prop({ reflect: true, mutable: true }) open: boolean;

  onCloseDrawer() {
    this.open = false;
  }

  render() {
    return (
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={() => this.onCloseDrawer()}>X</button>
        </header>
        <section id='tabs'>
          <button class='active'>Navigation</button>
          <button>Contact</button>
        </section>
        <main>
          <slot />
        </main>
      </aside>
    );
  }
}
