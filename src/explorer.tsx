import React from 'react';
import {getDefault} from 'tupelo-wasm-sdk'

const fetchChainTree = async (did:string)=> {
    const community = await getDefault()
}

const Explorer= ({did}:{did:string}) => {
    return (
      <p>{did}</p>
    )
  }

  export default Explorer