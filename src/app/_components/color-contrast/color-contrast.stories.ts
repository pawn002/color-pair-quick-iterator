import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';
import { ColorContrastComponent } from './color-contrast.component';

const meta: Meta<ColorContrastComponent> = {
  title: 'App/Color Contrast',
  component: ColorContrastComponent,
  tags: ['autodocs'],
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="display:flex;height:200px;width:300px">${story}</div>`
    ),
  ],
  argTypes: {
    colorOne: {
      control: 'color',
    },
    colorTwo: {
      control: 'color',
    },
    contrastType: {
      options: ['okca', 'apca', 'bpca', 'deltaE', 'apca object'],
      control: { type: 'radio' },
    },
    debug: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<ColorContrastComponent>;

export const Typical: Story = {};

export const OKCA: Story = {
  args: {
    colorOne: 'white',
    colorTwo: 'black',
    contrastType: 'okca',
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

export const DeltaE: Story = {
  args: {
    colorOne: '#928f8f',
    colorTwo: 'white',
    contrastType: 'deltaE',
  },
};

export const ObjectContrast: Story = {
  args: {
    colorOne: '#928f8f',
    colorTwo: 'white',
    contrastType: 'apca object',
  },
};
