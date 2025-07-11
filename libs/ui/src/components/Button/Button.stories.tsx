import type { Meta, StoryObj } from 'storybook/internal/types';
import { Button } from './Button';
import { expect } from 'storybook/test';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary = {
  args: {
    children: '',
    variant: '',
    size: '',
    isLoading: '',
    leftIcon: '',
    rightIcon: '',
    fullWidth: '',
    rounded: '',
    className: '',
    disabled: '',
    props: '',
  },
};

export const Heading: Story = {
  args: {
    children: '',
    variant: '',
    size: '',
    isLoading: '',
    leftIcon: '',
    rightIcon: '',
    fullWidth: '',
    rounded: '',
    className: '',
    disabled: '',
    props: '',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Welcome to Button!/gi)).toBeTruthy();
  },
};
