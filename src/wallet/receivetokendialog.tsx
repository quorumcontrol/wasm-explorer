import React, {useState} from 'react'
import {  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, CircularProgress, Button } from '@material-ui/core';
import { ChainTree, receiveTokenTransactionFromPayload } from 'tupelo-wasm-sdk'
import { TokenPayload } from 'tupelo-messages/transactions/transactions_pb';
import { getCommunity } from '../community';

/**
 * Receive token is used on the *receiving* side of a token transaction. The sender does a send transaction and then 
 * (out of band) sends the payload to the receiver. The receiver can then do a receive coin transaction.
 */
export const ReceiveTokenDialog = ({open, onClose, tree}:{open:boolean, onClose:() => void, tree:ChainTree})=> {
    const [code, setCode] = useState("")
    const [loading,setLoading] = useState(false)

    const handleSubmit = async ()=> {
        if (tree === undefined) {
            throw new Error("userTree is undefined")
        }
        let tokenPayload = TokenPayload.deserializeBinary(Buffer.from(code, 'base64'))
        // The receiveTokenTransactionFromPayload function is a helper to create a transaction
        // from a TokenPayload
        let tx = receiveTokenTransactionFromPayload(tokenPayload)

        setLoading(true)
        const community = await getCommunity()
        await community.playTransactions(tree, [tx])
        _onClose()
    }

    const _onClose = ()=> {
        setCode("")
        setLoading(false)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Receive Tokens</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       Receive Tokens
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Code"
                        fullWidth
                        onChange={(evt)=> {setCode(evt.target.value)}}
                        value={code}
                    />
                </DialogContent>
                {loading ? <CircularProgress/> : 
                <DialogActions>
                    <Button onClick={_onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Send
                    </Button>
                </DialogActions>
                }
            </Dialog>
    )
}

export default ReceiveTokenDialog