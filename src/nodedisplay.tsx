import React from 'react';
import { Link } from 'react-navi'
import { Table, TableHead, TableBody, TableRow, TableCell, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {CID} from 'tupelo-wasm-sdk'

const useStyles = makeStyles((theme: Theme) => ({
    preFormatted: {
        whiteSpace: "pre",
    },
}));

const NodeRow = ({ label, value, path, did }: { did: string, path: string[], label: string, value: any }) => {
    const classes = useStyles()
    let display
    if (value && CID.isCID(value)) {
        display = (
            <Link
                href={"/chaintrees/" + did + "?path=" + path.concat(label).join("/")}
            >
                CID: {value.toString()}
            </Link>
        )
    } else {
        display = (
            <code className={classes.preFormatted}>{JSON.stringify(value, null, 2)}</code>
        )
    }

    return (
        <TableRow>
            <TableCell>{label}</TableCell>
            <TableCell>{display}</TableCell>
        </TableRow>
    )
}

const NodeExplorer = ({ decodedCbor, path, did }: { decodedCbor: any, path: string[], did: string }) => {
    return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(decodedCbor).map((k: string, i: number) => {
                        return (
                            <NodeRow key={i} label={k} path={path} did={did} value={decodedCbor[k]} />
                        )
                    })}
                </TableBody>
            </Table>
    )
}

export default NodeExplorer
