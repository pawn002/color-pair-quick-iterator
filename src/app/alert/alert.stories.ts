import type { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from './alert.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<AlertComponent> = {
  title: 'App/Alert',
  component: AlertComponent,
  tags: ['autodocs'],
  // render: (args: AlertComponent) => ({
  //   props: {
  //     ...args,
  //   },
  // }),
  argTypes: {},
};

export default meta;
type Story = StoryObj<AlertComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args
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
