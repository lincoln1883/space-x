import React from 'react';
import { act, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Rockets from '../components/Rockets';

describe('Rockets', () => {
  it('renders Rockets component', () => {
    act(() => {
      const tree = render(
        <Provider store={store}>
          <Rockets />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
