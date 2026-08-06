import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './color-slider';

const meta: Meta = {
  title: 'App/Color Slider',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width: 400px">
      <cc-color-slider
        id=${args['id'] ?? 'slider-story'}
        name=${args['name'] ?? 'color-slider'}
        label=${args['label'] ?? 'Lightness'}
        color=${args['color'] ?? ''}
        ?constantchroma=${args['constantChroma'] ?? false}
        ?showgradient=${args['showGradient'] ?? false}
        ?debug=${args['debug'] ?? false}
      ></cc-color-slider>
    </div>
  `,
  argTypes: {
    label: { control: 'text' },
    color: { control: 'color' },
    id: { control: 'text' },
    name: { control: 'text' },
    constantChroma: { control: 'boolean' },
    showGradient: { control: 'boolean' },
    debug: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Typical: Story = {
  args: { color: '#3a86ff', showGradient: true },
};

export const RgbRed: Story = {
  args: { color: '#ff0000', constantChroma: true, showGradient: true, debug: true },
};

export const RgbGreen: Story = {
  args: { color: '#008000', constantChroma: true, showGradient: true, debug: true },
};

export const RgbBlue: Story = {
  args: { color: '#0000ff', constantChroma: true, showGradient: true, debug: true },
};

export const NoHueColor: Story = {
  args: { color: '#808080', showGradient: true, debug: true },
};
