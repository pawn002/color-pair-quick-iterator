import type { Meta, StoryObj } from '@storybook/angular';
import { CopyToClipboardButtonComponent } from './copy-to-clipboard-button.component';

const meta: Meta<CopyToClipboardButtonComponent> = {
  title: 'App/Copy to Clipboard Button',
  component: CopyToClipboardButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    color: {
      control: 'color',
    },
    debug: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<CopyToClipboardButtonComponent>;

export const Typical: Story = {
  args: {},
};

export const SomethingToCopy: Story = {
  args: {
    color: 'red',
    debug: true,
  },
};

export const NothingToCopy: Story = {
  args: {
    color: '',
    debug: true,
  },
};
