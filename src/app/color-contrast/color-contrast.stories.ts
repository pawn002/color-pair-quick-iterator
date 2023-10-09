import type { Meta, StoryObj } from '@storybook/angular';
import { ColorContrastComponent } from './color-contrast.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<ColorContrastComponent> = {
  title: 'App/Color Contrast',
  component: ColorContrastComponent,
  tags: ['autodocs'],
  render: (args: ColorContrastComponent) => ({
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
    contrastType: {
      options: ['apca', 'bpca'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<ColorContrastComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args
export const Typical: Story = {
  args: {
    colorOne: null,
    colorTwo: null,
    contrastType: null,
  },
};

export const APCA: Story = {
  args: {
    colorOne: 'white',
    colorTwo: 'black',
    contrastType: 'apca',
  },
};

export const WCAGEnhanced: Story = {
  args: {
    colorOne: 'white',
    colorTwo: 'black',
    contrastType: 'bpca',
  },
};

export const WCAGEnhancedEdgeCase: Story = {
  args: {
    colorOne: '#928f8f',
    colorTwo: 'white',
    contrastType: 'bpca',
  },
};
