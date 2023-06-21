import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import mockAxios from 'axios';
import store from '../redux/store';
import Rocket from '../components/Rocket';

describe('Rocket', () => {
  describe('Rocket component', () => {
    it('renders a list of rockets', () => {
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
      const rocket = render(
        <Provider store={store}>
          <Rocket />
        </Provider>,
      );
      expect(rocket).toMatchSnapshot();
    });
    it('should render rocket component', () => {
      const tree = render(
        <Provider store={store}>
          <Rocket />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
