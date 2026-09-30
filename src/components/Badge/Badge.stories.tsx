import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "positive", "negative"],
      description: "Defines the semantic color variant of the badge",
    },
    label: {
      control: "text",
      description: "Content displayed inside the badge (text string or number)",
    },
    "aria-label": {
      control: "text",
      description: "Accessible screen reader description for assistive technology",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = {
  args: {
    label: "Neutral Badge",
    variant: "neutral",
  },
};

export const Positive: Story = {
  args: {
    label: "Positive Badge",
    variant: "positive",
  },
};

export const Negative: Story = {
  args: {
    label: "Warning",
    variant: "negative",
  },
};

export const NumericCount: Story = {
  args: {
    label: 12,
    variant: "positive",
    "aria-label": "12 new notifications",
  },
};
