import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './palette-table';

const meta: Meta = {
  title: 'App/Palette Table',
  tags: ['autodocs'],
  render: (args) => html`
    <cc-palette-table color=${args['color'] ?? ''} ?debug=${args['debug'] ?? false}></cc-palette-table>
  `,
  argTypes: {
    color: { control: 'color' },
    debug: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Typical: Story = { args: {} };

export const Populated: Story = {
  args: {
    color: '#ff00ff',
  },
};
