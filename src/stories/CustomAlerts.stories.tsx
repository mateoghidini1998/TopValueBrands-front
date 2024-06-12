import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/addon-actions';
import CustomAlert, { CustomAlertOptions, CustomAlertTheme } from '../components/alerts/CustomAlerts';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CustomAlert> = {
  title: 'Example/CustomAlert',
  component: CustomAlert,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: { control: 'select', options: Object.values(CustomAlertOptions) },
    theme: { control: 'select', options: Object.values(CustomAlertTheme) },
  },
  args: {
    // onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    message: "Primary Alert",
    description: "This is a primary alert",
    type: CustomAlertOptions.SUCCESS,
    closable: true,
    showIcon: true,
    visible: true,
    theme: CustomAlertTheme.LIGHT,
  },
};

export const Secondary: Story = {
  args: {
    message: "Secondary Alert",
    description: "This is a secondary alert",
    type: CustomAlertOptions.INFO,
    closable: true,
    showIcon: true,
    visible: true,
    theme: CustomAlertTheme.DARK,
  },
};

export const Warning: Story = {
  args: {
    message: "Warning Alert",
    description: "This is a warning alert",
    type: CustomAlertOptions.WARNING,
    closable: true,
    showIcon: true,
    visible: true,
    theme: CustomAlertTheme.LIGHT,
  },
};

export const Error: Story = {
  args: {
    message: "Error Alert",
    description: "This is an error alert",
    type: CustomAlertOptions.ERROR,
    closable: true,
    showIcon: true,
    visible: true,
    theme: CustomAlertTheme.DARK,
  },
};
