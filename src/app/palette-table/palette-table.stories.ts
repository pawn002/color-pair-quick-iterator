import type { Meta, StoryObj } from '@storybook/angular';
import { PaletteTableComponent } from './palette-table.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<PaletteTableComponent> = {
  title: 'App/Palette Table',
  component: PaletteTableComponent,
  tags: ['autodocs'],
  render: (args: PaletteTableComponent) => ({
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
type Story = StoryObj<PaletteTableComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args
export const Typical: Story = {
  args: {},
};

export const Populated: Story = {
  args: {
    color: '#ff00ff',
  },
};
