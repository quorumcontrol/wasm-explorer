import React from 'react';
import { getDefault, ChainTree } from 'tupelo-wasm-sdk';
import { Typography } from '@material-ui/core';
import { useAsync } from 'react-async-hook';
import NodeDisplay from './nodedisplay';

interface IFetchTreeResult {
    tree?:ChainTree
    found:boolean
    message?:string
}

const fetchTree = async (did: string):Promise<IFetchTreeResult> => {
    if (did === "") {
        return {
            found: false,
        }
    }
    const community = await getDefault()

    try {
        const tip = await community.getTip(did)
        const tree = new ChainTree({
            store: community.blockservice,
            tip: tip,
        })
        return {
            tree: tree,
            found: true,
        }
    } catch (e) {
        if (e === "not found") {
            return {
                found: false,
            }
        }
        throw e
    }
}

const Explorer = ({ did }: { did: string }) => {
    const asyncTree = useAsync(fetchTree, [did])

    let result = asyncTree.result

    return (
        <div>
        {asyncTree.loading && <div>Loading...</div>}
        {asyncTree.error && <div>Error: {asyncTree.error.message}</div>}
        {result && (result.found === undefined || !result.found) && (
            <div>
                <Typography variant="h6">{did}</Typography>
                {(did === "") ? "Awaiting your DID" : "Not found"}
            </div>
        )}
        {(result && result.tree !== undefined) && (
            <div>
            <Typography variant="h6">{did}</Typography>
            <NodeDisplay tree={result.tree}/>
            </div>
        )}
        </div>
    )
}

export default Explorer