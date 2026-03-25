import type { Meta, StoryObj } from '@storybook/angular';
import { ColorPickerComponent } from './color-picker.component';

const meta: Meta<ColorPickerComponent> = {
  title: 'App/Color Picker',
  component: ColorPickerComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'color',
    },
    comparedColor: {
      control: 'color',
    },
    inputId: {
      control: 'text',
    },
    inputName: {
      control: 'text',
    },
    debug: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<ColorPickerComponent>;

export const Typical: Story = {
  args: {
    color: '#3a86ff',
  },
};

export const WithComparedColor: Story = {
  args: {
    color: '#3a86ff',
    comparedColor: '#ffbe0b',
  },
};

export const Empty: Story = {
  args: {
    comparedColor: '',
  },
};
