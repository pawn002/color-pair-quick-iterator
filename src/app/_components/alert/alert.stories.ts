import type { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from './alert.component';

const meta: Meta<AlertComponent> = {
  title: 'App/Alert',
  component: AlertComponent,
  tags: ['autodocs'],
  argTypes: {
    alertMessage: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const Typical: Story = {
  args: {},
};

export const ColorCopied: Story = {
  args: {
    alertMessage: {
      message: 'Color One Variant, #ffe1df, copied to clipboard.',
    },
  },
};

export const AppWarning: Story = {
  args: {
    alertMessage: {
      message: 'Warning',
    },
  },
};
