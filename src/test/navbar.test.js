import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '@testing-library/jest-dom/extend-expect';

describe('Navbar', () => {
  it('renders Navbar component', () => {
    const tree = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});

describe('Navbar', () => {
  it('renders Navbar component', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );

    const navbarElement = screen.getByText(/Space Travelers' Hub/i);
    expect(navbarElement).toBeInTheDocument();
    expect(navbarElement).toHaveClass('ms-2');

    const rocketsLink = screen.getByText(/Rockets/i);
    const missionsLink = screen.getByText(/Missions/i);
    const profileLink = screen.getByText(/Profile/i);

    expect(rocketsLink).toBeInTheDocument();
    expect(missionsLink).toBeInTheDocument();
    expect(profileLink).toBeInTheDocument();
  });
  it('should render the logo', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    const logo = screen.getByAltText(/planet/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'planet.png');
  });
  it('should should have links to paths', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    const rocketsLink = screen.getByText(/Rockets/i);
    const missionsLink = screen.getByText(/Missions/i);
    const profileLink = screen.getByText(/Profile/i);
    expect(rocketsLink).toHaveAttribute('href', '/');
    expect(missionsLink).toHaveAttribute('href', '/missions');
    expect(profileLink).toHaveAttribute('href', '/profile');
  });
});
