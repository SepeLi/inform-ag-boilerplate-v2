import type { Meta, StoryObj } from 'storybook/internal/types';
import { Input } from './Input';
import { expect } from 'storybook/test';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Input',
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Welcome to Input!/gi)).toBeTruthy();
  },
};
