// biome-ignore-all lint/a11y/noNoninteractiveTabindex: Content-only tabpanels need a keyboard focus stop.
import type React from "react";
import {
  createContext,
  type KeyboardEvent,
  type ReactNode,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import { Badge, type BadgeProps } from "../Badge";
import styles from "./Tabs.module.css";

// --- Types ---
export type TabVariant = "pill" | "underline";

interface TabsContextType {
  activeValue: string;
  setActiveValue: (value: string) => void;
  variant: TabVariant;
  registerTab: (value: string, element: HTMLButtonElement | null) => void;
  tabIds: React.MutableRefObject<Map<string, { tabId: string; panelId: string }>>;
}

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs compound components must be rendered within a <Tabs> parent.");
  }
  return context;
}

// --- Main Tabs Root Component ---
export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: TabVariant;
  children: ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> & {
  List: typeof TabsList;
  Tab: typeof Tab;
  Panel: typeof TabPanel;
} = ({ defaultValue, value, onValueChange, variant = "pill", children, className = "" }) => {
  const [internalValue, setInternalValue] = useState<string>(defaultValue || "");
  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;

  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const tabIds = useRef<Map<string, { tabId: string; panelId: string }>>(new Map());

  const setActiveValue = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const registerTab = (val: string, element: HTMLButtonElement | null) => {
    if (element) {
      tabRefs.current.set(val, element);
    } else {
      tabRefs.current.delete(val);
    }
  };

  const variantClass = variant === "underline" ? styles.underline : styles.pill;

  return (
    <TabsContext.Provider
      value={{
        activeValue,
        setActiveValue,
        variant,
        registerTab,
        tabIds,
      }}
    >
      <div className={`${styles.tabsRoot} ${variantClass} ${className}`.trim()}>{children}</div>
    </TabsContext.Provider>
  );
};

// --- Tabs.List Component ---
export interface TabsListProps {
  "aria-label": string; // Required for WCAG 2.1 AA Compliance
  children: ReactNode;
  className?: string;
}

const TabsList: React.FC<TabsListProps> = ({
  "aria-label": ariaLabel,
  children,
  className = "",
}) => {
  const { setActiveValue } = useTabsContext();
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!listRef.current) return;

    const tabs = Array.from(
      listRef.current.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    );
    if (tabs.length === 0) return;

    const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const targetTab = tabs[nextIndex];
    targetTab.focus();

    const targetValue = targetTab.getAttribute("data-value");
    if (targetValue) {
      setActiveValue(targetValue);
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      className={`${styles.tabList} ${className}`.trim()}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};

// --- Tabs.Tab Component ---
export interface TabProps {
  value: string;
  badge?: BadgeProps;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

const Tab: React.FC<TabProps> = ({ value, badge, disabled = false, children, className = "" }) => {
  const { activeValue, setActiveValue, registerTab, tabIds } = useTabsContext();
  const generatedId = useId();

  if (!tabIds.current.has(value)) {
    tabIds.current.set(value, {
      tabId: `ds-tab-${generatedId}`,
      panelId: `ds-panel-${generatedId}`,
    });
  }

  const ids = tabIds.current.get(value)!;
  const isSelected = activeValue === value;

  return (
    <button
      ref={(el) => registerTab(value, el)}
      type="button"
      role="tab"
      id={ids.tabId}
      aria-selected={isSelected}
      aria-controls={ids.panelId}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      data-value={value}
      className={`${styles.tab} ${isSelected ? styles.selected : ""} ${className}`.trim()}
      onClick={() => !disabled && setActiveValue(value)}
    >
      <span className={styles.label}>{children}</span>
      {badge && <Badge {...badge} />}
    </button>
  );
};

// --- Tabs.Panel Component ---
export interface TabPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ value, children, className = "" }) => {
  const { activeValue, tabIds } = useTabsContext();
  const isSelected = activeValue === value;
  const ids = tabIds.current.get(value);

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      id={ids?.panelId}
      aria-labelledby={ids?.tabId}
      tabIndex={0}
      className={`${styles.tabPanel} ${className}`.trim()}
    >
      {children}
    </div>
  );
};

Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
