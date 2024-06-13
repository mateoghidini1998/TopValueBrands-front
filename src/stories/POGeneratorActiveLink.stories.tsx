import type { Meta, StoryObj } from '@storybook/react';
import { POGeneratorActiveLink } from './POGeneratorActiveLink';

const meta: Meta<typeof POGeneratorActiveLink> = {
  title: 'POGenerator/ActiveLink',
  component: POGeneratorActiveLink,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    path: { control: 'text' },
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveLink: Story = {
  args: {
    path: "/active",
    title: "Active Link",
    active:true
  },
};
