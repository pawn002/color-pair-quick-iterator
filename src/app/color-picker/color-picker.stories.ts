import type { Meta, StoryObj } from '@storybook/angular';
import { ColorPickerComponent } from './color-picker.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<ColorPickerComponent> = {
  title: 'App/Color Picker',
  component: ColorPickerComponent,
  tags: ['autodocs'],
  render: (args: ColorPickerComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    comparedColor: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<ColorPickerComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args
export const Typical: Story = {
  args: {
    comparedColor: '',
  },
};
