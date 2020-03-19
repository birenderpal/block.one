/* eslint-disable no-undef */
import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';
import { shallow } from 'enzyme';
import { expect as chaiExpect } from 'chai';

import Blocks from '../components/Blocks';

let wrapper = null;
describe('<Blocks>', () => {
  beforeEach(() => {
    // setup wrapper to be used for each test
    wrapper = shallow(<Blocks getBlock={jest.fn()} getBlocks={jest.fn} />);
  });

  afterAll(() => {
    // cleanup on exiting
    wrapper.unmount();
  });

  it('shows load button', () => {
    chaiExpect(wrapper.find('Button')).to.have.length(1);
  });

  it('Does not show any other component initialy', () => {
    chaiExpect(wrapper.find('Spinner')).to.have.length(0);
    chaiExpect(wrapper.find('ListGroup')).to.have.length(0);
    chaiExpect(wrapper.find('LisItem')).to.have.length(0);
    chaiExpect(wrapper.find('.error')).to.have.length(0);
  });
});

// test for the side effects.
describe('Blocks effects tests', () => {
  // mock data used for mock async functions getBlocks and getBlock.
  const blocks = {
    success: {
      status: 'SUCCESS',
      blocks: [
        {
          id: 1,
          timestamp: 12,
          actions: 1,
        },
        {
          id: 2,
          timestamp: 23,
          actions: 2,
        },
        {
          id: 3,
          timestamp: 34,
          actions: 3,
        },
        {
          id: 4,
          timestamp: 45,
          actions: 4,
        },
        {
          id: 5,
          timestamp: 56,
          actions: 5,
        },
      ],
    },
    error: {
      status: 'ERROR',
      error: 'Error Message',
    },
  };
  const block = {
    success: {
      status: 'SUCCESS',
      block: {
        id: 1,
        timestamp: 12,
        actions: 1,
      },
    },
    error: {
      status: 'ERROR',
      error: 'Error Message',
    },
  };
  const getBlock = jest
    .fn()
    .mockImplementation(() => Promise.resolve(block.success));
  const getBlocks = jest
    .fn()
    .mockImplementation(() => Promise.resolve(blocks.success));

  // Cleanup after each test to have a clean Dom
  //
  afterEach(cleanup);

  // for every fetch (click) the button changes text to Loading..
  it('On button click change button text', async () => {
    // Mock getBlock and getBlocks function returning a resolved promise with sucess
    const { queryByTestId, getByTestId } = render(
      <Blocks getBlock={getBlock} getBlocks={getBlocks} />,
    );

    // click button
    fireEvent.click(getByTestId('load-button'));

    // expect button text to change from Load to Loading..
    expect(getByTestId('load-button').textContent).toBe('Loading..');
    // expect spinner to be shown while the data is returned
    expect(queryByTestId('spinner')).toBeTruthy();

    // Expect No block list to be present while the data is being fetched
    expect(queryByTestId('block-list')).toBeNull();

    // Expect block list to be present when the data is returned
    const blockList = await waitForElement(() => getByTestId('block-list'));

    // Expect block list to have 5 blocks based on the mock data
    expect(blockList.childElementCount).toEqual(5);
    // Expect no error element on success
    expect(queryByTestId('error')).toBeNull();
  });
  it('On error should show error', async () => {
    // Mock async functions with error returned on resolve
    const getBlockWithError = jest
      .fn()
      .mockImplementation(() => Promise.resolve(block.error));
    const getBlocksWithError = jest
      .fn()
      .mockImplementation(() => Promise.resolve(blocks.error));

    const { queryByTestId, getByTestId } = render(
      <Blocks getBlock={getBlockWithError} getBlocks={getBlocksWithError} />,
    );

    // click button
    fireEvent.click(getByTestId('load-button'));
    const error = await waitForElement(() => getByTestId('error'));
    // expect error to be returned and same as the mock data.
    expect(error.textContent).toEqual(blocks.error.error);
    // expect no block list element when there is error returned
    expect(queryByTestId('block-list')).toBeNull();
  });
  it('On block click should fetch block', async () => {
    const { queryByTestId, getByTestId, getAllByTestId } = render(
      <Blocks getBlock={getBlock} getBlocks={getBlocks} />,
    );

    // click button
    fireEvent.click(getByTestId('load-button'));

    // get all the block shown
    const fetchedBlock = await waitForElement(() =>
      getAllByTestId('clickable-block'),
    );

    // click on the first block
    fireEvent.click(fetchedBlock[0]);
    const rawBlock = await waitForElement(() => getAllByTestId('raw-block'));

    // expect the click to call the getBlock function to get block raw data
    expect(getBlock).toHaveBeenCalled();

    // expect raw data to be shown
    expect(rawBlock.length).toBe(1);

    // expect to only have one block expanded and one raw data
    expect(getAllByTestId('block-json').length).toBe(1);

    // click the block again to collapse
    fireEvent.click(fetchedBlock[0]);

    // expect raw json to disappear
    expect(queryByTestId('block-json')).toBeNull();
  });
});
