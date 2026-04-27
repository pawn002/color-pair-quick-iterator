import type { Meta, StoryObj } from '@storybook/angular';
import { ColorSliderComponent } from './color-slider.component';

const meta: Meta<ColorSliderComponent> = {
  title: 'App/Color Slider',
  component: ColorSliderComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    color: {
      control: 'color',
    },
    id: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    constantChroma: {
      control: 'boolean',
    },
    showGradient: {
      control: 'boolean',
    },
    resetSlider: {
      control: 'object',
    },
    debug: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<ColorSliderComponent>;

export const Typical: Story = {
  args: {
    color: '#3a86ff',
    showGradient: true,
  },
};

export const RgbRed: Story = {
  args: {
    color: 'red',
    constantChroma: true,
    showGradient: true,
    debug: true,
  },
};

export const RgbGreen: Story = {
  args: {
    color: 'green',
    constantChroma: true,
    showGradient: true,
    debug: true,
  },
};

export const RgbBlue: Story = {
  args: {
    color: 'blue',
    constantChroma: true,
    showGradient: true,
    debug: true,
  },
};

export const NoHueColor: Story = {
  args: {
    color: 'gray',
    showGradient: true,
    debug: true,
  },
};
