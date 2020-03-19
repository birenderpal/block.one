import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Spinner from '../components/Spinner';

let spinner = null
describe('<Spinner>', () => {
    beforeEach(() => {
        spinner = shallow(<Spinner />)
    });
    afterAll(() => {
        spinner.unmount()
    });

    it('Should create a loader', () => {
        expect(spinner.find('.loader')).to.have.length(1)
    });

    it('Should have loader-md class by default', () => {
        expect(spinner.find('.loader-md')).to.have.length(1)
    });

    it('Should have dark as defaul color class', () => {        
        expect(spinner.find('.loader-dark')).to.have.length(1)
    });

    it('Should apply size class', () => {
        spinner.setProps({ size: "small" });
        expect(spinner.find('.loader-sm')).to.have.length(1)
    })

    it('Should have loader-primary class when color prop is set to primary', () => {
        spinner.setProps({ color: "primary" })
        expect(spinner.find(`.loader-primary`)).to.have.length(1)
    });
})




