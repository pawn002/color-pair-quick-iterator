import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './copy-to-clipboard-button';

const meta: Meta = {
  title: 'App/Copy to Clipboard Button',
  tags: ['autodocs'],
  render: (args) => html`
    <cc-copy-to-clipboard-button
      color=${args['color'] ?? ''}
      label=${args['label'] ?? 'Copy to Clipboard'}
      ?debug=${args['debug'] ?? false}
    ></cc-copy-to-clipboard-button>
  `,
  argTypes: {
    label: { control: 'text' },
    color: { control: 'color' },
    debug: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Typical: Story = { args: {} };

export const SomethingToCopy: Story = {
  args: { color: '#ff0000', debug: true },
};

export const NothingToCopy: Story = {
  args: { color: '', debug: true },
};
