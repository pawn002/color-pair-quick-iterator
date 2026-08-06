import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './alert';

const meta: Meta = {
  title: 'App/Alert',
  tags: ['autodocs'],
  render: (args) => html`
    <cc-alert .alertMessage=${{ message: args['message'] ?? '' }}></cc-alert>
  `,
  argTypes: {
    message: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Typical: Story = { args: {} };

export const ColorCopied: Story = {
  args: { message: 'Color One Variant, #ffe1df, copied to clipboard.' },
};

export const AppWarning: Story = {
  args: { message: 'Warning' },
};
