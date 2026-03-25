import type { Meta, StoryObj } from '@storybook/angular';
import { PaletteTableComponent } from './palette-table.component';

const meta: Meta<PaletteTableComponent> = {
  title: 'App/Palette Table',
  component: PaletteTableComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'color',
    },
    debug: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<PaletteTableComponent>;

export const Typical: Story = {
  args: {},
};

export const Populated: Story = {
  args: {
    color: '#ff00ff',
  },
};
