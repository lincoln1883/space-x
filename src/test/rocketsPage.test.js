import React from 'react';
import { act, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import mockAxios from 'axios';
import store from '../redux/store';
import Rocketspage from '../pages/Rockets';
import '@testing-library/jest-dom';

jest.mock('axios');

mockAxios.get.mockResolvedValue({
  data: [
    {
      id: '5e9d0d95eda69973a809d1ec',
      name: 'Falcon 1',
      description:
        'The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.',
      images: ['https://i.imgur.com/4Xf8rvI.jpg'],
    },
  ],
});

describe('Rockets', () => {
  describe('Rockets component', () => {
    it('displays a rockets page', () => {
      act(() => {
        const rocketPage = render(
          <Provider store={store}>
            <Rocketspage />
          </Provider>,
        );
        expect(rocketPage).toMatchSnapshot();
      });
    });
  });
});
