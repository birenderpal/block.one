/* eslint-disable no-undef */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import ListItem from '../components/ListItem';

let wrapper = null;

describe('<ListItem>', () => {
  beforeEach(() => {
    wrapper = shallow(<ListItem />);
  });
  afterAll(() => {
    wrapper.unmount();
  });

  it('Should have a list element', () => {
    expect(wrapper.find('li')).to.have.length(1);
  });

  it('Should have list-group class by default', () => {
    expect(wrapper.find('.list-group-item')).to.have.length(1);
  });
});

describe('<LisItem /> props', () => {
  beforeEach(() => {
    wrapper = mount(<ListItem />);
  });
  afterAll(() => {
    wrapper.unmount();
  });

  it('Should be clickable when prop clickable is passed', () => {
    wrapper.setProps({ clickable: true });
    expect(wrapper.find('.clickable')).to.have.length(1);
  });
  it('Should have items inline when prop inline is passed', () => {
    wrapper.setProps({ inline: true });
    expect(wrapper.find('.list-inline')).to.have.length(1);
  });

  it('Should have not have onClick set when it is not clickable', () => {
    expect(wrapper.find('li')).to.not.have.property('onClick');
  });

  it('Should have onClick when it is clickable and execute onClick callback', done => {
    wrapper
      .setProps({ clickable: true, onClick: () => done() })
      .simulate('click');
  });
});

it('Should render children html elements', () => {
  wrapper = shallow(
    <ListItem>
      <div />
    </ListItem>,
  );
  expect(wrapper.find('div')).to.have.length(1);
});

it('Should render children html elements', () => {
  wrapper = shallow(
    <ListItem>
      <div />
      <div />
    </ListItem>,
  );
  expect(wrapper.find('div')).to.have.length(2);
});

it('Should render corrent number of html elements', () => {
  wrapper = shallow(
    <ListItem>
      <div />
      <div />
    </ListItem>,
  );
  expect(wrapper.find('div')).to.not.have.length(1);
});
