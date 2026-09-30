import type React from "react";
import { useState } from "react";
import { Badge } from "./components/Badge/Badge";
import { Tabs } from "./components/Tabs/Tabs";
import "./styles/tokens.css"; // Tokens are global; components handle their own module styles

export const App: React.FC = () => {
  const [controlledTab, setControlledTab] = useState<string>("emails");

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "32px 16px",
        fontFamily: "Inter, system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "48px",
      }}
    >
      <header style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "16px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, margin: "0 0 8px 0" }}>
          Design System — Tabs Component
        </h1>
        <p style={{ color: "#4b5563", margin: 0 }}>
          Interactive playground showing dynamic variants, badge integrations, accessibility, and
          responsive states.
        </p>
      </header>

      {/* --- Section 1: Pill Variant (Uncontrolled) --- */}
      <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>
          1. Pill Variant (Uncontrolled)
        </h2>
        <Tabs variant="pill" defaultValue="all">
          <Tabs.List aria-label="Inbox Filter Options">
            <Tabs.Tab value="all">All Items</Tabs.Tab>
            <Tabs.Tab
              value="unread"
              badge={{ label: "12", variant: "positive", "aria-label": "12 unread items" }}
            >
              Unread
            </Tabs.Tab>
            <Tabs.Tab
              value="archived"
              badge={{ label: "99+", variant: "neutral", "aria-label": "99 plus archived items" }}
            >
              Archived
            </Tabs.Tab>
            <Tabs.Tab
              value="spam"
              badge={{ label: "Warning", variant: "negative", "aria-label": "Spam warning" }}
            >
              Spam
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="all">
            <div style={{ padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
              Showing all items in inbox.
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="unread">
            <div style={{ padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
              Showing 12 unread items.
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="archived">
            <div style={{ padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
              Showing archived messages.
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="spam">
            <div style={{ padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
              Showing spam folder content.
            </div>
          </Tabs.Panel>
        </Tabs>
      </section>

      {/* --- Section 2: Underline Variant (Controlled State) --- */}
      <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>
            2. Underline Variant (Controlled)
          </h2>
          <span style={{ fontSize: "14px", color: "#6b7280" }}>
            Active Tab: <strong>{controlledTab}</strong>
          </span>
        </div>

        <Tabs
          variant="underline"
          value={controlledTab}
          onValueChange={(val) => setControlledTab(val)}
        >
          <Tabs.List aria-label="Account Navigation Settings">
            <Tabs.Tab value="emails">Emails</Tabs.Tab>
            <Tabs.Tab
              value="files"
              badge={{ label: "3", variant: "neutral", "aria-label": "3 files available" }}
            >
              Files
            </Tabs.Tab>
            <Tabs.Tab value="edits">Edits</Tabs.Tab>
            <Tabs.Tab value="dashboard" disabled>
              Dashboard (Disabled)
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="emails">
            <div style={{ padding: "16px 0" }}>Email account settings and preference panel.</div>
          </Tabs.Panel>
          <Tabs.Panel value="files">
            <div style={{ padding: "16px 0" }}>
              Uploaded files list and shared document controls.
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="edits">
            <div style={{ padding: "16px 0" }}>Recent revisions and activity history.</div>
          </Tabs.Panel>
          <Tabs.Panel value="dashboard">
            <div style={{ padding: "16px 0" }}>Dashboard analytics.</div>
          </Tabs.Panel>
        </Tabs>
      </section>

      {/* --- Section 3: Standalone Badges Demo --- */}
      <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>
          3. Standalone Badge Component Variants
        </h2>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Badge label="Neutral Badge" variant="neutral" />
          <Badge label="Positive Badge" variant="positive" />
          <Badge label="Negative Badge" variant="negative" />
        </div>
      </section>
    </main>
  );
};

export default App;
