import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, CircularProgress, Button } from '@material-ui/core';
import { ChainTree, Community, mintTokenTransaction } from 'tupelo-wasm-sdk'

/**
 * Mint token is really simple, just take a tokenName and ammount and create it.
 * The token must be *established* (see {@link EstablishTokenDialog }) before you are allowed to mint.
 */
export const MintTokenDialog = ({ open, onClose, tree, tokenName }: { tokenName: string, open: boolean, onClose: () => void, tree: ChainTree }) => {
    const [amount, setAmount] = useState(0)
    const [loading, setLoading] = useState(false)


    const handleSubmit = async () => {
        if (tree === undefined) {
            throw new Error("userTree is undefined")
        }
        setLoading(true)
        const community = await Community.getDefault()
        await community.playTransactions(tree, [mintTokenTransaction(tokenName, amount)])
        _onClose()
    }

    const _onClose = () => {
        setAmount(0)
        setLoading(false)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Mint Tokens</DialogTitle>
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
                    onChange={(evt) => { setAmount(parseInt(evt.target.value, 10)) }}
                    value={amount.toString()}
                />

            </DialogContent>
            {loading ? <CircularProgress /> :
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

export default MintTokenDialog