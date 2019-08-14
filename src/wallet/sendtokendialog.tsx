import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, CircularProgress, Button } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { ChainTree, getDefault, sendTokenTransaction, CID } from 'tupelo-wasm-sdk'

const uuidv4: () => string = require('uuid/v4');

const tokenCanonicalName = async (tree:ChainTree, tokenName:string) => {
    const did = await tree.id()
    return did + ":" + tokenName
}

export const SendTokenDialog = ({ open, onClose, tree, tokenName }: { tokenName: string, open: boolean, onClose: () => void, tree: ChainTree }) => {
    const [amount, setAmount] = useState(0)
    const [destination, setDestination] = useState("")
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState()

    const handleSubmit = async () => {
        if (tree == undefined) {
            throw new Error("userTree is undefined")
        }
        setLoading(true)
        const uuid = uuidv4()
        const community = await getDefault()
        // const canonicalName = await tokenCanonicalName(tree, tokenName)
        console.log('tokenname: ', tokenName)

        const payload = await community.sendTokenAndGetPayload(tree, sendTokenTransaction(uuid, tokenName, amount, destination))
        setCode(Buffer.from(payload.serializeBinary()).toString('base64'))
    }

    const _onClose = () => {
        setAmount(0)
        setDestination("")
        setLoading(false)
        onClose()
    }

    return (
        !code ? <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Send Tokens</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Send tokens of type {tokenName}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Destination"
                    fullWidth
                    onChange={(evt) => { setDestination(evt.target.value) }}
                    value={destination}
                />
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
                        Send
                    </Button>
                </DialogActions>
            }
        </Dialog> : // if we have a code, display it to the user
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Send Tokens</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Give the following snippet to your send coin receiver:
                </DialogContentText>
                <TextareaAutosize>
                    {code}
                </TextareaAutosize>
            </DialogContent>
            <DialogActions>
                    <Button onClick={_onClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
        </Dialog>
        
    )
}

export default SendTokenDialog