import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './metadata';

const meta: Meta = {
  title: 'App/Metadata Readout',
  tags: ['autodocs'],
  render: (args) => html`
    <cc-metadata
      colorone=${args['colorOne'] ?? ''}
      colortwo=${args['colorTwo'] ?? ''}
    ></cc-metadata>
  `,
  argTypes: {
    colorOne: { control: 'color' },
    colorTwo: { control: 'color' },
    debug: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Typical: Story = { args: {} };

export const Populated: Story = {
  args: {
    colorOne: '#ff0000',
    colorTwo: '#ffffff',
  },
};
