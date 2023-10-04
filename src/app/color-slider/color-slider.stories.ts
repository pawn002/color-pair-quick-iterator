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

export const NoHueColor: Story = {
  args: {
    color: 'white',
  },
};
