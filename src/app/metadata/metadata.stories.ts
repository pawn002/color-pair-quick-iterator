import type { Meta, StoryObj } from '@storybook/angular';
import { MetadataComponent } from './metadata.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<MetadataComponent> = {
  title: 'App/Metadata Readout',
  component: MetadataComponent,
  tags: ['autodocs'],
  render: (args: MetadataComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    colorOne: {
      control: 'color',
    },
    colorTwo: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<MetadataComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args
export const Typical: Story = {
  args: {},
};

export const SomethingToCopy: Story = {
  args: {
    colorOne: 'red',
    colorTwo: 'white',
  },
};
