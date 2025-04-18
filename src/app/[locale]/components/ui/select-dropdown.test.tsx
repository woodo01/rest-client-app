import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectDropdown from './select-dropdown';
import userEvent from '@testing-library/user-event';

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

  it('displays menu items when dropdown is opened', async () => {
    render(
      <SelectDropdown
        label="Select an option"
        menuitems={menuitems}
        value="option1"
        onChange={mockOnChange}
      />
    );

    const user = userEvent.setup();
    await user.click(screen.getByText('Select an option'));

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });
});
