import React, { useState, useEffect,useMemo } from 'react';
import Button from './Button';
import Spinner from './Spinner';
import BlockAction from './BlockAction';
import ListItem from './ListItem';
import ListGroup from './ListGroup';

export default function Blocks({ getBlocks, getBlock }) {
  // State which changes on Load button click and triggers fetching of new blocks.
  // This state will have side-effect which will fetch the blocks.
  const [load, setLoad] = useState(false);

  // State with the fetched block details to be passed to BlockList for rendering
  // Change in this state will re-render the BlockList.
  const [blocks, setBlocks] = useState(null);

  const [showBlockNum, setShowBlockNum] = useState(null);

  const [data, setData] = useState(null);

  // Call back for the Load button to change state to load new blocks.
  const loadBlock = () => {
    setLoad(true);
  };

  // Call back to set 
  const blockClick = blockId => {
    blockId === showBlockNum ? setShowBlockNum(null) : setShowBlockNum(blockId);
  };

  
  // Effect which will trigger on state of "load" changes
  // For load=true the effect will fetch the latest blocks.
  // For load=false effect will not do anything

  useEffect(() => {
    if (load) {
      (async () => {
        setBlocks(null);
        let blocks = await getBlocks();
        setBlocks(blocks);
        setLoad(false);
      })();
    }
  }, [load]);

  useEffect(() => {
    if (showBlockNum != null) {
      (async () => {
        let data = await getBlock(showBlockNum);
        if (data.status === 'ERROR') {
          setData(data.error);
        } else {
          setData(JSON.stringify(data.block, null, 2));
        }
      })();
    }
  }, [showBlockNum]);

  return (
    <>
      <div className="blocks" data-testid="blocks">
        <BlockAction align="align-center">
          <Button
            btnColor="primary"
            btnRounded={true}
            btnText={load ? 'Loading..' : 'Load'}
            onClick={loadBlock}
          ></Button>
        </BlockAction>
        <div className="span-19 centered">
        {load ? <Spinner size="large" color="primary"/> : null}
        {blocks ? (
          blocks.status === 'SUCCESS' ? (
            
              <div className="block-list" data-testid="block-list">
                {blocks.blocks.map((block, key) => {
                  return (
                    <ListGroup key={key}>
                      <ListItem
                        clickable={true}
                        inline={true}
                        onClick={blockClick}
                        blockID={block.id}
                      >
                        <span className="list-inline-item"> {block.id}</span>
                        <span className="list-inline-item">
                          {block.timestamp}
                        </span>
                        <span className="list-inline-item">
                          {block.actions}
                        </span>
                      </ListItem>
                      {showBlockNum === block.id ? (
                        <ListItem clickable={false} inline={false}>
                          <pre className="block-data" data-testid="block-json">
                            {data}
                          </pre>
                        </ListItem>
                      ) : null}
                    </ListGroup>
                  );
                })}
              </div>            
          ) : (
            <div className="error" data-testid="error">
              {blocks.error}
            </div>
          )
        ) : null}
        </div>
      </div>
    </>
  );
}

Blocks.displayName = 'Blocks';
