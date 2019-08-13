import React, { useState } from 'react';
import {Link} from 'react-navi'
import { ChainTree } from 'tupelo-wasm-sdk';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

const NodeRow = ({ label, value, path, did }: { did:string, path: string[], label: string, value: any }) => {
    let display
    if (value.constructor.name === "CID") {
        display = (
            <Link
                href={"/chaintrees/" + did + "?path="+path.concat(label).join("/")}
            >
                CID: {value.toString()}
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

const NodeExplorer = ({ decodedCbor, path, did }: { decodedCbor: any, path:string[],did:string }) => {
    return (
        <div>
                <div>
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
                </div>
        </div>
    )
}


export default NodeExplorer