import React from 'react';
import { useDispatch } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import Rocket from '../components/Rocket';
import '@testing-library/jest-dom/extend-expect';
import { reservedRocket } from '../redux/rockets/rocketsSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Rocket', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders rocket details', () => {
    const rocket = {
      id: '1',
      name: 'Falcon 9',
      image: 'falcon9.jpg',
      description: 'Powerful rocket.',
      reserved: false,
    };

    render(
      <Rocket
        id={rocket.id}
        name={rocket.name}
        description={rocket.description}
        image={rocket.image}
      />,
    );

    expect(screen.getByText(rocket.name)).toBeInTheDocument();
    expect(screen.getByText(rocket.description)).toBeInTheDocument();
    expect(screen.getByAltText(rocket.name)).toHaveAttribute(
      'src',
      rocket.image,
    );
  });

  test('renders "Reserved" badge when rocket is reserved', () => {
    const rocket = {
      id: '1',
      name: 'Falcon 9',
      image: 'falcon9.jpg',
      description: 'Powerful rocket.',
      reserved: true,
    };

    render(
      <Rocket
        id={rocket.id}
        name={rocket.name}
        description={rocket.description}
        image={rocket.image}
        reserved={rocket.reserved}
      />,
    );

    expect(screen.getByText('Reserved')).toBeInTheDocument();
  });

  test('dispatches reservedRocket action when "Reserve Rocket" button is clicked', () => {
    const rocket = {
      id: '1',
      name: 'Falcon 9',
      image: 'falcon9.jpg',
      description: 'Powerful rocket.',
      reserved: false,
    };

    render(
      <Rocket
        id={rocket.id}
        name={rocket.name}
        description={rocket.description}
        image={rocket.image}
      />,
    );

    const reserveButton = screen.getByRole('button', {
      name: 'Reserve Rocket',
    });
    fireEvent.click(reserveButton);

    expect(mockDispatch).toHaveBeenCalledWith(reservedRocket(rocket.id));
  });
});
