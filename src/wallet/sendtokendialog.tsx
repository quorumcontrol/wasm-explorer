import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, CircularProgress, Button } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { ChainTree, getDefault, sendTokenTransaction } from 'tupelo-wasm-sdk'

const uuidv4: () => string = require('uuid/v4');

/**
 * 
 * You can send any token you have a balance of. This dialog will show the user the base64 encoded version of the payload they need to send
 * to the receiver. If that payload is lost, it's difficult to recover.
 * The token transaction flow is this:
 * send token (transaction) -> copy payload -> send payload -> (receiver) get payload -> receive token (transaction)
 */
export const SendTokenDialog = ({ open, onClose, tree, tokenName }: { tokenName: string, open: boolean, onClose: () => void, tree: ChainTree }) => {
    const [amount, setAmount] = useState(0)
    const [destination, setDestination] = useState("")
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState()

    const handleSubmit = async () => {
        if (tree === undefined) {
            throw new Error("userTree is undefined")
        }
        setLoading(true)
        //sendId must be unique to the receiving chaintree. Here we just use a globally unique uuid.
        const uuid = uuidv4()
        const community = await getDefault()
        // const canonicalName = await tokenCanonicalName(tree, tokenName)
        console.log('tokenname: ', tokenName)
    
        // sendTokenAndGetPayload is a helper function to both play the send token transaction and then also create the payload
        // from the transaction. it is then shown to the user.
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