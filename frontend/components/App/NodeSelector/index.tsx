import assert from 'assert';
import React, { ReactNode, Fragment } from 'react';
import { Routes, Route } from "react-router-dom";

type NodeProps = {
  nodes: ReactNode[];
  paths: string[]; 
}

export const Nodeselector = (props: NodeProps) => {
  const { nodes, paths } = props;
  assert.strictEqual(nodes.length, paths.length,  `RouterSelector: Length mismatch\ ${nodes.length}: ${paths.length}`);

  return (
    <Fragment>
      <Routes >
        {
          nodes.map((node, i) => (
            <Route key={i} path={paths[i]} element={node} /> 
          ))
        }
      </Routes>
    </Fragment>
  )
}
