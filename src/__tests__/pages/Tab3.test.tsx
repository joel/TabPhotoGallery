import React from 'react';
import { render, screen } from '@testing-library/react';
import Tab1 from '../../pages/Tab3';

it('renders welcome message', () => {
  render(<Tab1 />);
  expect(screen.getByText('Tab 3 page')).toBeInTheDocument();
});
