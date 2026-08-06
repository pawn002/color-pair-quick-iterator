import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './color-picker';

const meta: Meta = {
  title: 'App/Color Picker',
  tags: ['autodocs'],
  render: (args) => html`
    <cc-color-picker
      inputid=${args['inputId'] ?? 'cp-story'}
      inputname=${args['inputName'] ?? 'color'}
      label=${args['label'] ?? 'Color'}
      color=${args['color'] ?? ''}
      comparedcolor=${args['comparedColor'] ?? ''}
    ></cc-color-picker>
  `,
  argTypes: {
    label: { control: 'text' },
    color: { control: 'color' },
    comparedColor: { control: 'color' },
    inputId: { control: 'text' },
    inputName: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Typical: Story = {
  args: { color: '#3a86ff' },
};

export const WithComparedColor: Story = {
  args: { color: '#3a86ff', comparedColor: '#ffbe0b' },
};

export const Empty: Story = {
  args: { comparedColor: '' },
};
