/* eslint-disable no-undef */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import BlockAction from '../components/BlockAction';

let wrapper = null;

describe('<BlockAction>', () => {
  beforeEach(() => {
    wrapper = shallow(<BlockAction />);
  });
  afterAll(() => {
    wrapper.unmount();
  });

  it('Should render block action group', () => {
    expect(wrapper.find('.block-action-group')).to.have.length(1);
  });

  it('Should have align-center as default', () => {
    expect(wrapper.find('.align-center')).to.have.length(1);
  });

  it('Should align-left when align is set to align-left', () => {
    wrapper.setProps({ align: 'align-left' });
    expect(wrapper.find('.align-left')).to.have.length(1);
  });
  it('Should have right class for align', () => {
    wrapper.setProps({ align: 'align-left' });
    expect(wrapper.find('.align-center')).to.have.length(0);
  });
});

it('Should render children html elements', () => {
  wrapper = shallow(
    <BlockAction>
      <div className="child" />
    </BlockAction>,
  );
  expect(wrapper.find('.child')).to.have.length(1);
});

it('Should render children html elements', () => {
  wrapper = shallow(
    <BlockAction>
      <div className="child" />
      <div className="child" />
    </BlockAction>,
  );
  expect(wrapper.find('.child')).to.have.length(2);
});

it('Should render corrent number of html elements', () => {
  wrapper = shallow(
    <BlockAction>
      <div className="child" />
      <div className="child" />
    </BlockAction>,
  );
  expect(wrapper.find('.child')).to.not.have.length(1);
});
