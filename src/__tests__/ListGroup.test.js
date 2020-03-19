import React from 'react';
import { expect } from 'chai';
import { shallow,mount } from 'enzyme';
import ListGroup from '../components/ListGroup';
import ListItem from '../components/ListItem';

let wrapper = null
describe('<ListGroup>', () => {
    beforeEach(() => {
        wrapper = shallow(<ListGroup></ListGroup>)
    });
    afterAll(() => {
        wrapper.unmount()
    });

    it('Should create a list', () => {
        expect(wrapper.find('ul')).to.have.length(1)
    });

    it('Should have list-group class by default', () => {
        expect(wrapper.find('.list-group')).to.have.length(1)
    });    
})


it('Should render children components', () => {
    wrapper = shallow(<ListGroup><ListItem/></ListGroup>)
    expect(wrapper.find('ListItem')).to.have.length(1)
});

it('Should render multiple children components', () => {
    wrapper = shallow(<ListGroup><ListItem/><ListItem/></ListGroup>)
    expect(wrapper.find('ListItem')).to.have.length(2)
});

it('Should render multiple children components', () => {
    wrapper = shallow(<ListGroup><ListItem/><ListItem/></ListGroup>)
    expect(wrapper.find('ListItem')).to.not.have.length(3)
});


it('Should render children html elements', () => {
    wrapper = shallow(<ListGroup><div/></ListGroup>)
    expect(wrapper.find('div')).to.have.length(1)
});

it('Should render children html elements', () => {
    wrapper = shallow(<ListGroup><div/><div/></ListGroup>)
    expect(wrapper.find('div')).to.have.length(2)
});

it('Should render corrent number of html elements', () => {
    wrapper = shallow(<ListGroup><div/><div/></ListGroup>)
    expect(wrapper.find('div')).to.not.have.length(1)
});

