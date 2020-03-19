/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme'
import App from '../App';


it('renders blocks', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('Blocks')).toHaveLength(1);
})