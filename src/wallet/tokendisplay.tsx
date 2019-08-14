import React, { useState, useEffect } from 'react'
import { ChainTree, getDefault, mintTokenTransaction } from 'tupelo-wasm-sdk'
import {  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Button } from '@material-ui/core';

const tokenPath = ["tree", "_tupelo", "tokens"];

export const NodeRow = ({tree,tokenName}:{tree:ChainTree, tokenName:string})=> {
    const [balance,setBalance] = useState(0)
    const [max,setMax] = useState(0)
    const [loading,setLoading] = useState(true)
    const [loaded,setLoaded] = useState(false)
    const [mintDialogOpen, setMintDialogOpen] = useState(false)

    const loadInfo = async ()=> {
        const tokenInfoPath = tokenPath.concat(tokenName)
        const tokenInfoResp = await tree.resolve(tokenInfoPath)
        const monetaryPolicy = await tree.resolve(tokenInfoPath.concat("monetaryPolicy"))
        setLoaded(true)

        setBalance(tokenInfoResp.value['balance'])
        setMax(monetaryPolicy.value['maximum'])
        setLoading(false)
    }

    useEffect(()=> {
        if (!loaded) {
            loadInfo()
        }
    })

    const handleMintClose = ()=> {
        setLoaded(false)
        setMintDialogOpen(false)
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
                <Button>
                    Send
                </Button>
                <Button>
                    Receive
                </Button>
                <MintTokenDialog open={mintDialogOpen} onClose={handleMintClose} tree={tree} tokenName={tokenName}/>
            </TableCell>
        </TableRow>
    )
}


const MintTokenDialog = ({open, onClose, tree, tokenName}:{tokenName:string, open:boolean, onClose:() => void, tree:ChainTree})=> {

    const [ammount, setAmmount] = useState(0)
    const [loading,setLoading] = useState(false)

    const handleSubmit = async ()=> {
        if (tree == undefined) {
            throw new Error("userTree is undefined")
        }
        setLoading(true)
        const community = await getDefault()
        await community.playTransactions(tree, [mintTokenTransaction(tokenName, ammount)])
        _onClose()
    }

    const _onClose = ()=> {
        setAmmount(0)
        setLoading(false)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Establish Token</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Mint tokens of type {tokenName}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        onChange={(evt)=> {setAmmount(parseInt(evt.target.value,10))}}
                        value={ammount}
                    />
                   
                </DialogContent>
                {loading ? <CircularProgress/> : 
                <DialogActions>
                    <Button onClick={_onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Mint
                    </Button>
                </DialogActions>
                }
            </Dialog>
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