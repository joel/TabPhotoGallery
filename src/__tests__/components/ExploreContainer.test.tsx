import React from 'react';
import { render, screen } from '@testing-library/react';
import ExploreContainer from '../../components/ExploreContainer';

it('renders welcome message', () => {
  render(<ExploreContainer name='A Name' />);
  expect(screen.getByText('A Name')).toBeInTheDocument();
});
