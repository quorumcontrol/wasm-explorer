import React from 'react';
import { getDefault, ChainTree } from 'tupelo-wasm-sdk';
import { Typography, makeStyles, Theme } from '@material-ui/core';
import {Link} from 'react-navi'
import NodeDisplay from './nodedisplay';

const useStyles = makeStyles((theme: Theme) => ({
    pathDisplay: {
        padding: theme.spacing(0, 0.5),
    },
}));

interface IFetchTreeResult {
    tree?:ChainTree
    found:boolean
    message?:string
}

export const fetchTree = async (did: string):Promise<IFetchTreeResult> => {
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


const PathRenderer = ({ did, path }: { did:string, path: string[] }) => {
    const classes = useStyles()

    return (
        <div>
        Path: 
        {path.map((val: string, i: number) => {
            return (
                <Link
                    key={i}
                    className={classes.pathDisplay}
                    href={"/chaintrees/" + did + "?path=" + path.slice(0,i+1).join("/")}
                >
                    {val}/
            </Link>)
        })}</div>
    )
}

const Explorer = ({ did, fetchTreeResult, path, decodedCbor }: { did:string, fetchTreeResult: IFetchTreeResult, path:string[], decodedCbor:any }) => {

    let result = fetchTreeResult

    return (
        <div>
        {result && (result.found === undefined || !result.found) && (
            <div>
                <Typography variant="h6">{did}</Typography>
                {(did === "") ? "Awaiting your DID" : "Not found"}
            </div>
        )}
        {(result && result.tree !== undefined) && (
            <div>
            <Typography variant="h6">{did}</Typography>
            <p>tip: {result.tree.tip.toString()}</p>
            <PathRenderer did={did} path={path}/>
            <NodeDisplay decodedCbor={decodedCbor} path={path} did={did}/>
            </div>
        )}
        </div>
    )
}

export default Explorer