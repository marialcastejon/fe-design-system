import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["pill", "underline"],
      description: "Defines the visual variant of the tabs",
    },
    defaultValue: {
      control: "text",
      description: "Default active tab value for uncontrolled state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// --- 1. Pill Variant Story ---
export const PillVariant: Story = {
  args: {
    variant: "pill",
    defaultValue: "emails",
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List aria-label="Inbox navigation">
        <Tabs.Tab value="emails">Emails</Tabs.Tab>
        <Tabs.Tab value="files">Files</Tabs.Tab>
        <Tabs.Tab value="edits">Edits</Tabs.Tab>
        <Tabs.Tab value="messages">Messages</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="emails">
        <div style={{ padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
          Emails panel content.
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="files">
        <div style={{ padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
          Files panel content.
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="edits">
        <div style={{ padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
          Edits panel content.
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="messages">
        <div style={{ padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
          Messages panel content.
        </div>
      </Tabs.Panel>
    </Tabs>
  ),
};

// --- 2. Underline Variant Story ---
export const UnderlineVariant: Story = {
  args: {
    variant: "underline",
    defaultValue: "emails",
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List aria-label="Account navigation">
        <Tabs.Tab value="emails">Emails</Tabs.Tab>
        <Tabs.Tab value="files">Files</Tabs.Tab>
        <Tabs.Tab value="edits">Edits</Tabs.Tab>
        <Tabs.Tab value="dashboard" disabled>
          Dashboard (Disabled)
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="emails">
        <div style={{ padding: "16px 0" }}>Email preferences content.</div>
      </Tabs.Panel>
      <Tabs.Panel value="files">
        <div style={{ padding: "16px 0" }}>Uploaded documents list.</div>
      </Tabs.Panel>
      <Tabs.Panel value="edits">
        <div style={{ padding: "16px 0" }}>Activity log content.</div>
      </Tabs.Panel>
      <Tabs.Panel value="dashboard">
        <div style={{ padding: "16px 0" }}>Dashboard overview.</div>
      </Tabs.Panel>
    </Tabs>
  ),
};

// --- 3. Tabs With Badges Story ---
export const WithBadges: Story = {
  args: {
    variant: "pill",
    defaultValue: "emails",
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List aria-label="Inbox navigation with badges">
        <Tabs.Tab
          value="emails"
          badge={{ label: "12", variant: "positive", "aria-label": "12 unread emails" }}
        >
          Emails
        </Tabs.Tab>
        <Tabs.Tab
          value="files"
          badge={{ label: "3", variant: "neutral", "aria-label": "3 files available" }}
        >
          Files
        </Tabs.Tab>
        <Tabs.Tab
          value="edits"
          badge={{ label: "Warning", variant: "negative", "aria-label": "Warning on edits" }}
        >
          Edits
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="emails">
        <div style={{ padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
          Emails with positive badge.
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="files">
        <div style={{ padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
          Files with neutral count badge.
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="edits">
        <div style={{ padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
          Edits with negative warning badge.
        </div>
      </Tabs.Panel>
    </Tabs>
  ),
};

// --- 4. Controlled Tabs Example ---
export const ControlledState: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState("files");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#4b5563" }}>
          External active tab state: <strong>{activeTab}</strong>
        </p>

        <Tabs variant="pill" value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List aria-label="Controlled navigation">
            <Tabs.Tab value="emails">Emails</Tabs.Tab>
            <Tabs.Tab value="files">Files</Tabs.Tab>
            <Tabs.Tab value="edits">Edits</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="emails">
            <div style={{ padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
              Emails Panel
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="files">
            <div style={{ padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
              Files Panel
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="edits">
            <div style={{ padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
              Edits Panel
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    );
  },
};
