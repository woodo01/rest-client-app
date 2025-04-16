import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectDropdown from './select-dropdown';

jest.mock('./dropdown-menu');

describe('SelectDropdown Component', () => {
  const mockOnChange = jest.fn();
  const menuitems = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  it('renders the dropdown with the correct label', () => {
    render(
      <SelectDropdown
        label="Select an option"
        menuitems={menuitems}
        value="option1"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders all menu items', () => {
    render(
      <SelectDropdown
        label="Select an option"
        menuitems={menuitems}
        value="option1"
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByText('Select an option'));

    menuitems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('calls onChange when a menu item is selected', () => {
    render(
      <SelectDropdown
        label="Select an option"
        menuitems={menuitems}
        value="option1"
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByText('Select an option'));
    fireEvent.click(screen.getByText('Option 2'));

    expect(mockOnChange).toHaveBeenCalledWith('option2');
  });

  it('highlights the selected value', () => {
    render(
      <SelectDropdown
        label="Select an option"
        menuitems={menuitems}
        value="option2"
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByText('Select an option'));

    const selectedItem = screen.getByText('Option 2');
    expect(selectedItem).toHaveAttribute('aria-checked', 'true');
  });
});
