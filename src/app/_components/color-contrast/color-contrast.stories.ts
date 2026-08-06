import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './color-contrast';

const meta: Meta = {
  title: 'App/Color Contrast',
  tags: ['autodocs'],
  render: (args) => html`
    <style>cc-color-contrast { display: flex; flex: 1; }</style>
    <div style="display:flex;height:200px;width:300px">
      <cc-color-contrast
        colorone=${args['colorOne'] ?? ''}
        colortwo=${args['colorTwo'] ?? ''}
        contrasttype=${args['contrastType'] ?? 'okca'}
      ></cc-color-contrast>
    </div>
  `,
  argTypes: {
    colorOne: { control: 'color' },
    colorTwo: { control: 'color' },
    contrastType: {
      options: ['okca', 'apca', 'bpca', 'deltaE', 'apca object'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Typical: Story = {};

export const OKCA: Story = {
  args: {
    colorOne: '#ffffff',
    colorTwo: '#000000',
    contrastType: 'okca',
  },
};

export const APCA: Story = {
  args: {
    colorOne: '#ffffff',
    colorTwo: '#000000',
    contrastType: 'apca',
  },
};

export const WCAGEnhanced: Story = {
  args: {
    colorOne: '#ffffff',
    colorTwo: '#000000',
    contrastType: 'bpca',
  },
};

export const WCAGEnhancedEdgeCase: Story = {
  args: {
    colorOne: '#928f8f',
    colorTwo: '#ffffff',
    contrastType: 'bpca',
  },
};

export const DeltaE: Story = {
  args: {
    colorOne: '#928f8f',
    colorTwo: '#ffffff',
    contrastType: 'deltaE',
  },
};

export const ObjectContrast: Story = {
  args: {
    colorOne: '#928f8f',
    colorTwo: '#ffffff',
    contrastType: 'apca object',
  },
};
