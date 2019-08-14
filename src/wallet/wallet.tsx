import React, { useState, useEffect, MouseEvent } from 'react'
import { mount, route, redirect, map } from 'navi'
import { globalStorageStarted, useGlobalState } from '../state'
import { ChainTree, getDefault, establishTokenTransaction } from 'tupelo-wasm-sdk'
import TokenDisplay from './tokendisplay'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Grid, DialogContentText, CircularProgress } from '@material-ui/core';

/**
 * Define the navi routes 
 */
export const walletRoute = mount({
    "/": map(async (req, userTreeObj) => {
        await globalStorageStarted
        const userTree = userTreeObj as ChainTree
        if (userTree.id == undefined) {
            return redirect("/login")
        }
        return route({
            view: <WalletPage tree={userTree} />
        })
    }),
});

const WalletPage = ({ tree }: { tree: ChainTree }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleClose = () => {
        setDialogOpen(false)
    }

    return (
        <div>
            <h1>Wallet</h1>
            <Grid container spacing={2}>
                <Grid item>
                    <Button variant="outlined" onClick={() => { setDialogOpen(true) }}>Establish Token</Button>
                </Grid>
            </Grid>
            <TokenDisplay tree={tree}/>
            <EstablishTokenDialog open={dialogOpen} onClose={handleClose} tree={tree}/>
        </div>
    )
}

const EstablishTokenDialog = ({open, onClose, tree}:{open:boolean, onClose:() => void, tree:ChainTree})=> {

    const [tokenName, setTokenName] = useState("")
    const [maxAmount, setMaxAmount] = useState(0)
    const [loading,setLoading] = useState(false)

    const handleSubmit = async ()=> {
        if (tree == undefined) {
            throw new Error("userTree is undefined")
        }
        setLoading(true)
        const community = await getDefault()
        await community.playTransactions(tree, [establishTokenTransaction(tokenName, maxAmount)])
        _onClose()
    }

    const _onClose = (evt:MouseEvent|void)=> {
        setTokenName("")
        setMaxAmount(0)
        setLoading(false)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Establish Token</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Establish a token with a name and a monetary policy.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Token Name"
                        fullWidth
                        onChange={(evt)=> {setTokenName(evt.target.value)}}
                        value={tokenName}
                    />
                    <TextField
                        margin="dense"
                        id="maximum"
                        label="Maximum Amount"
                        type="number"
                        fullWidth
                        onChange={(evt)=> {setMaxAmount(parseInt(evt.target.value, 10))}}
                        value={maxAmount}
                    />
                </DialogContent>
                {loading ? <CircularProgress/> : 
                <DialogActions>
                    <Button onClick={_onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Establish
                    </Button>
                </DialogActions>
                }
            </Dialog>
    )
}