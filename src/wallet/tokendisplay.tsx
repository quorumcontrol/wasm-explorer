import React, { useState, useEffect } from 'react'
import {  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Button } from '@material-ui/core';
import { ChainTree, getDefault, mintTokenTransaction, sendTokenTransaction } from 'tupelo-wasm-sdk'
import SendTokenDialog from './sendtokendialog'
import MintTokenDialog from './minttokendialog'

const tokenPath = ["tree", "_tupelo", "tokens"];

export const NodeRow = ({tree,tokenName}:{tree:ChainTree, tokenName:string})=> {
    const [balance,setBalance] = useState(0)
    const [max,setMax] = useState(0)
    const [loading,setLoading] = useState(true)
    const [loaded,setLoaded] = useState(false)
    const [mintDialogOpen, setMintDialogOpen] = useState(false)
    const [sendDialogOpen, setSendDialogOpen] = useState(false)

    const loadInfo = async ()=> {
        const tokenInfoPath = tokenPath.concat(tokenName)
        const tokenInfoResp = await tree.resolve(tokenInfoPath)
        if (tokenInfoResp.value.monetaryPolicy) {
            const monetaryPolicy = await tree.resolve(tokenInfoPath.concat("monetaryPolicy"))
            setMax(monetaryPolicy.value['maximum'])
        }
        setLoaded(true)

        setBalance(tokenInfoResp.value['balance'])
        setLoading(false)
    }

    useEffect(()=> {
        if (!loaded) {
            loadInfo()
        }
    })

    const handleMintClose = ()=> {
        setMintDialogOpen(false)
        setLoaded(false)
    }

    const handleSendClose = ()=> {
        setSendDialogOpen(false)
        setLoaded(false)
    }

    return (
        <TableRow>
            <TableCell>
                {tokenName}
            </TableCell>
            <TableCell>
                {loading ? <CircularProgress/> : balance}
            </TableCell>
            <TableCell>
                {loading ? <CircularProgress/> : max}
            </TableCell>
            <TableCell>
                <Button onClick={()=>{setMintDialogOpen(true)}}>
                    Mint
                </Button>
                <Button onClick={()=>{setSendDialogOpen(true)}}>
                    Send
                </Button>
                <MintTokenDialog open={mintDialogOpen} onClose={handleMintClose} tree={tree} tokenName={tokenName}/>
                <SendTokenDialog open={sendDialogOpen} onClose={handleSendClose} tree={tree} tokenName={tokenName}/>
            </TableCell>
        </TableRow>
    )
}

export const TokenList = ({ tree }: { tree: ChainTree }) => {
    const [tokens, setTokens] = useState({});
    const [loaded, setLoaded] = useState(false);

    const loadTokens = async () => {
        let tokenResp = await tree.resolve(tokenPath)

        if (tokenResp.value) {
            console.log("tokens resp: ", tokenResp)
            setLoaded(true)
            setTokens(tokenResp.value)
        }
    }

    useEffect(() => {
        if (!loaded) {
            loadTokens()
        }
    })

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Max</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.keys(tokens).map((k: string, i: number) => {
                    return (<NodeRow key={i} tree={tree} tokenName={k}/>)
                })}
            </TableBody>
        </Table>
    )
}

export default TokenList