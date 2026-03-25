import type { Meta, StoryObj } from '@storybook/angular';
import { MetadataComponent } from './metadata.component';

const meta: Meta<MetadataComponent> = {
  title: 'App/Metadata Readout',
  component: MetadataComponent,
  tags: ['autodocs'],
  argTypes: {
    colorOne: {
      control: 'color',
    },
    colorTwo: {
      control: 'color',
    },
    debug: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<MetadataComponent>;

export const Typical: Story = {
  args: {},
};

export const Populated: Story = {
  args: {
    colorOne: '#ff0000',
    colorTwo: '#ffffff',
  },
};
