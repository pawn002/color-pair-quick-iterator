import type { Meta, StoryObj } from '@storybook/angular';
import { ColorPickerComponent } from './color-picker.component';

// model() signals cause a runtime type extraction failure in Storybook's docs renderer
// (value.replace is not a function). Use extractArgTypes override to bypass automatic extraction.
const colorPickerArgTypes = {
  color: {
    control: 'color',
    type: { name: 'string', required: false },
    description: 'The current color value.',
    table: { defaultValue: { summary: '' } },
  },
  comparedColor: {
    control: 'color',
    type: { name: 'string', required: false },
    description: 'Optional compared color shown as a split swatch (two-way bindable via model()).',
    table: { defaultValue: { summary: '' } },
  },
  inputId: {
    control: 'text',
    type: { name: 'string', required: false },
    description: 'ID attribute for the hidden color input.',
    table: { defaultValue: { summary: 'fg-color' } },
  },
  inputName: {
    control: 'text',
    type: { name: 'string', required: false },
    description: 'Name attribute for the hidden color input.',
    table: { defaultValue: { summary: 'foreground color' } },
  },
  debug: {
    control: 'boolean',
    type: { name: 'boolean', required: false },
    description: 'Enable debug logging.',
    table: { defaultValue: { summary: 'false' } },
  },
  selectedColor: {
    control: false,
    description: 'Emits the selected color string when the user picks a color.',
    table: { type: { summary: 'string' }, category: 'Outputs' },
  },
};

const meta: Meta<ColorPickerComponent> = {
  title: 'App/Color Picker',
  component: ColorPickerComponent,
  tags: ['autodocs'],
  argTypes: colorPickerArgTypes as Meta<ColorPickerComponent>['argTypes'],
  parameters: {
    docs: {
      extractArgTypes: () => colorPickerArgTypes,
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
