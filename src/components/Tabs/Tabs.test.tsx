import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tabs } from './Tabs';

describe('Tabs Component', () => {
  const renderTabs = (props = {}) => {
    return render(
      <Tabs defaultValue="tab1" {...props}>
        <Tabs.List aria-label="Test Tabs Navigation">
          <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab
            value="tab2"
            badge={{ label: '3', variant: 'positive', 'aria-label': '3 unread' }}
          >
            Tab 2
          </Tabs.Tab>
          <Tabs.Tab value="tab3" disabled>
            Tab 3 Disabled
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="tab1">Content Panel 1</Tabs.Panel>
        <Tabs.Panel value="tab2">Content Panel 2</Tabs.Panel>
        <Tabs.Panel value="tab3">Content Panel 3</Tabs.Panel>
      </Tabs>
    );
  };

  it('renders default tab and panel content correctly', () => {
    renderTabs();

    expect(screen.getByRole('tab', { name: /tab 1/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content Panel 1')).toBeInTheDocument();
    expect(screen.queryByText('Content Panel 2')).not.toBeInTheDocument();
  });

  it('switches panels when clicking an unselected tab', async () => {
    const user = userEvent.setup();
    renderTabs();

    const tab2 = screen.getByRole('tab', { name: /tab 2/i });
    await user.click(tab2);

    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content Panel 2')).toBeInTheDocument();
    expect(screen.queryByText('Content Panel 1')).not.toBeInTheDocument();
  });

  it('does not trigger selection when clicking a disabled tab', async () => {
    const user = userEvent.setup();
    renderTabs();

    const tab3 = screen.getByRole('tab', { name: /tab 3 disabled/i });
    expect(tab3).toBeDisabled();

    await user.click(tab3);

    expect(screen.getByText('Content Panel 1')).toBeInTheDocument();
    expect(screen.queryByText('Content Panel 3')).not.toBeInTheDocument();
  });

  it('supports controlled mode with onValueChange', async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    renderTabs({ value: 'tab1', onValueChange: handleValueChange });

    const tab2 = screen.getByRole('tab', { name: /tab 2/i });
    await user.click(tab2);

    expect(handleValueChange).toHaveBeenCalledWith('tab2');
  });

  it('handles keyboard navigation with arrow keys (WCAG 2.1 AA)', async () => {
    const user = userEvent.setup();
    renderTabs();

    const tab1 = screen.getByRole('tab', { name: /tab 1/i });
    const tab2 = screen.getByRole('tab', { name: /tab 2/i });

    // Focus initial tab
    tab1.focus();
    expect(tab1).toHaveFocus();

    // Press ArrowRight to move to Tab 2
    await user.keyboard('{ArrowRight}');
    expect(tab2).toHaveFocus();
    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content Panel 2')).toBeInTheDocument();

    // Press ArrowRight again (skips disabled Tab 3 and wraps to Tab 1)
    await user.keyboard('{ArrowRight}');
    expect(tab1).toHaveFocus();
    expect(tab1).toHaveAttribute('aria-selected', 'true');
  });

  it('renders badges inside tabs correctly', () => {
    renderTabs();

    const badge = screen.getByLabelText('3 unread');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('3');
  });
});