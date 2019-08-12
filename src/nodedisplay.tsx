import React, { useState } from 'react';

import { ChainTree } from 'tupelo-wasm-sdk';
import { useAsync } from 'react-async-hook';
import { Table, TableHead, TableBody, TableRow, TableCell, Link, makeStyles, Theme } from '@material-ui/core';

const resolveTree = (tree: ChainTree, path: string[]) => {
    return tree.resolve(path)
}


const useStyles = makeStyles((theme: Theme) => ({
    pathDisplay: {
        padding: theme.spacing(0, 0.5),
    },
}));

const NodeRow = ({ onNavigate, label, value, path }: { path: string[], onNavigate: Function, label: string, value: any }) => {

    let display
    if (value.constructor.name === "CID") {
        display = (
            <Link
                component="button"
                onClick={() => { onNavigate(path.concat(label)) }}
            >
                Cid: {value.toString()}
            </Link>
        )
    } else {
        display = (
            <p>{JSON.stringify(value)}</p>
        )
    }

    return (
        <TableRow>
            <TableCell>{label}</TableCell>
            <TableCell>{display}</TableCell>
        </TableRow>
    )
}

const PathRenderer = ({ path, onNavigate }: { onNavigate: Function, path: string[] }) => {
    const classes = useStyles()

    return (
        <div>
        Path: 
        {path.map((val: string, i: number) => {
            return (
                <Link
                    key={i}
                    className={classes.pathDisplay}
                    component="button"
                    onClick={() => { onNavigate(path.slice(0, i + 1)) }}
                >
                    {val}/
            </Link>)
        })}</div>
    )
}

const NodeExplorer = ({ tree }: { tree: ChainTree }) => {
    const [path, setPath] = useState([""])
    const asyncRoot = useAsync(resolveTree, [tree, path])

    let result = asyncRoot.result

    const handleNavigation = (newPath: string[]) => {
        console.log("newPath", newPath)
        setPath(newPath)
    }

    return (
        <div>
            {asyncRoot.loading && <div>Loading</div>}
            {asyncRoot.error && <div>Error: {asyncRoot.error.message}</div>}
            {result !== undefined && result.value !== undefined && (
                <div>
                    <p>tip: {tree.tip.toString()}</p>
                    <PathRenderer path={path} onNavigate={handleNavigation} />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Key</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(result.value).map((k: string, i: number) => {
                                if (result === undefined) {
                                    throw new Error("can't have a result negative")
                                }
                                return (
                                    <NodeRow key={i} path={path} onNavigate={(newPath: string[]) => { handleNavigation(newPath) }} label={k} value={result.value[k]} />
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}


export default NodeExplorer