import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Button from '../components/Button';

let btn = null;
describe('<Button>', () => {
    beforeEach(() => {
        btn = shallow(<Button>Load</Button>)
    });
    afterAll(() => {
        btn.unmount()
    });

    it('Should create a button', () => {
        expect(btn.find('button')).to.have.length(1)
    });

    it('Should have btn-medium class by default', () => {
        expect(btn.find('.btn-medium')).to.have.length(1)
    });

    it('Should have dark as defaul color class', () => {
        expect(btn.find('.btn-dark')).to.have.length(1)
    });

    it('Should have default text of Load', () => {
        expect(btn.text()).to.equal('Load')
    });

    it('Should apply size class', () => {
        btn.setProps({ btnSize: "small" });
        expect(btn.find('.btn-small')).to.have.length(1)
    })

    it('Should have btn-primary class when btnColor prop is set to primary', () => {
        btn.setProps({ btnColor: "primary" })
        expect(btn.find(`.btn-primary`)).to.have.length(1)
    });
    it('Should change text when passed', () => {
        btn.setProps({ btnText: "TEST" })
        expect(btn.text()).to.equal('TEST')
    });
    it('Should call onClick callback', done => {
        btn.setProps({ onClick: () => done() }).simulate('click')
    });
})




