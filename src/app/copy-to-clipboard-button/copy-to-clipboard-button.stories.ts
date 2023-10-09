import type { Meta, StoryObj } from '@storybook/angular';
import { CopyToClipboardButtonComponent } from './copy-to-clipboard-button.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<CopyToClipboardButtonComponent> = {
  title: 'App/Copy to Clipboard Button',
  component: CopyToClipboardButtonComponent,
  tags: ['autodocs'],
  render: (args: CopyToClipboardButtonComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    color: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<CopyToClipboardButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args
export const Typical: Story = {
  args: {
    color: null,
  },
};

export const SomethingToCopy: Story = {
  args: {
    color: 'red',
  },
};
