import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
} from './dropdown-menu';

describe('DropdownMenu Component', () => {
  it('renders basic dropdown menu with items', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="dropdown-trigger">
          Open Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();

    await user.click(screen.getByTestId('dropdown-trigger'));

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('supports checkbox items', async () => {
    const user = userEvent.setup();
    const handleCheckedChange = jest.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="dropdown-trigger">
          Open Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={false}
            onCheckedChange={handleCheckedChange}
          >
            Checkbox Item
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByTestId('dropdown-trigger'));

    await user.click(screen.getByText('Checkbox Item'));

    expect(handleCheckedChange).toHaveBeenCalledWith(true);
  });

  it('supports radio groups and items', async () => {
    const user = userEvent.setup();
    const handleValueChange = jest.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="dropdown-trigger">
          Open Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value="option1"
            onValueChange={handleValueChange}
          >
            <DropdownMenuRadioItem value="option1">
              Option 1
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option2">
              Option 2
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option3">
              Option 3
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByTestId('dropdown-trigger'));

    await user.click(screen.getByText('Option 2'));

    expect(handleValueChange).toHaveBeenCalledWith('option2');
  });

  it('renders labels and separators correctly', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="dropdown-trigger">
          Open Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Section 1</DropdownMenuLabel>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuSeparator data-testid="separator" />
          <DropdownMenuLabel>Section 2</DropdownMenuLabel>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByTestId('dropdown-trigger'));

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();

    expect(screen.getByTestId('separator')).toBeInTheDocument();
  });

  it('renders sub-menus correctly', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="dropdown-trigger">
          Open Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger data-testid="sub-trigger">
              Sub Menu
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
              <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByTestId('dropdown-trigger'));

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByTestId('sub-trigger')).toBeInTheDocument();

    expect(screen.queryByText('Sub Item 1')).not.toBeInTheDocument();

    await user.hover(screen.getByTestId('sub-trigger'));

    expect(screen.getByText('Sub Menu')).toBeInTheDocument();
  });

  it('renders dropdown menu groups', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="dropdown-trigger">
          Open Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Group 1</DropdownMenuLabel>
            <DropdownMenuItem>Group Item 1</DropdownMenuItem>
            <DropdownMenuItem>Group Item 2</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByTestId('dropdown-trigger'));

    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Group Item 1')).toBeInTheDocument();
    expect(screen.getByText('Group Item 2')).toBeInTheDocument();
  });

  it('supports variant prop for menu items', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="dropdown-trigger">
          Open Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem variant="default">Default Item</DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            data-testid="destructive-item"
          >
            Destructive Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByTestId('dropdown-trigger'));

    expect(screen.getByText('Default Item')).toBeInTheDocument();
    expect(screen.getByText('Destructive Item')).toBeInTheDocument();

    const destructiveItem = screen.getByTestId('destructive-item');
    expect(destructiveItem).toHaveAttribute('data-variant', 'destructive');
  });

  it('supports inset prop for menu items and labels', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="dropdown-trigger">
          Open Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset>Inset Label</DropdownMenuLabel>
          <DropdownMenuItem inset data-testid="inset-item">
            Inset Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByTestId('dropdown-trigger'));

    expect(screen.getByText('Inset Label')).toBeInTheDocument();
    expect(screen.getByText('Inset Item')).toBeInTheDocument();

    const insetItem = screen.getByTestId('inset-item');
    expect(insetItem).toHaveAttribute('data-inset', 'true');
  });
});
