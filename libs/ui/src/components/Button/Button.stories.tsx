import type { Meta } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default meta;

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
