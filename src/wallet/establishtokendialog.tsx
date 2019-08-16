import React, {useState} from 'react'
import {  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, CircularProgress, Button } from '@material-ui/core';
import { ChainTree, Community, establishTokenTransaction } from 'tupelo-wasm-sdk'

/**
 * Establishing a token allows you to mint them. It is done before a mint because it allows you to set a monetary
 * policy. As of this writing, only a maximum is supported in the monetary policy. A maximum of 0 means unlimited.
 * 
 */
export const EstablishTokenDialog = ({open, onClose, tree}:{open:boolean, onClose:() => void, tree:ChainTree})=> {

    const [tokenName, setTokenName] = useState("")
    const [maxAmount, setMaxAmount] = useState(0)
    const [loading,setLoading] = useState(false)

    const handleSubmit = async ()=> {
        if (tree === undefined) {
            throw new Error("userTree is undefined")
        }
        setLoading(true)
        const community = await Community.getDefault()
        await community.playTransactions(tree, [establishTokenTransaction(tokenName, maxAmount)])
        _onClose()
    }

    const _onClose = ()=> {
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

export default EstablishTokenDialog