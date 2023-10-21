import type { Meta, StoryObj } from '@storybook/angular';
import { ColorSliderComponent } from './color-slider.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<ColorSliderComponent> = {
  title: 'App/Color Slider',
  component: ColorSliderComponent,
  tags: ['autodocs'],
  render: (args: ColorSliderComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    color: {
      control: 'color',
    },
    mode: {
      control: 'select',
      options: ['chroma', 'chromaPlus'],
    },
  },
};

export default meta;
type Story = StoryObj<ColorSliderComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args
export const Typical: Story = {
  args: {
    color: 'coral',
  },
};

export const RgbRed: Story = {
  args: {
    color: 'red',
    debug: true,
  },
};

export const RgbRedChromaPlus: Story = {
  args: {
    color: 'red',
    mode: 'chromaPlus',
    debug: true,
  },
};
export const RgbGreen: Story = {
  args: {
    color: 'green',
  },
};
export const RgbBlue: Story = {
  args: {
    color: 'blue',
  },
};

export const NoHueColor: Story = {
  args: {
    color: 'gray',
  },
};
