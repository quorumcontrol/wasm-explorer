import React, { useState, useEffect } from 'react'
import { mount, route, redirect, map } from 'navi'
import { globalStorageStarted } from '../state'
import { ChainTree } from 'tupelo-wasm-sdk'
import TokenDisplay from './tokendisplay'
import { Button, Grid } from '@material-ui/core';
import ReceiveTokenDialog from './receivetokendialog'
import EstablishTokenDialog from './establishtokendialog'
/**
 * Define the navi routes 
 */
export const walletRoute = mount({
    "/": map(async (req, userTreeObj) => {
        await globalStorageStarted
        const userTree = userTreeObj as ChainTree
        if (userTree.id === undefined) {
            return redirect("/login")
        }
        return route({
            view: <WalletPage tree={userTree} />
        })
    }),
});


/**
 * Demos all the coin transactions:
 * EstablishToken,MintToken,SendToken,ReceiveToken
 * A full flow of creating and then sending a token is this:
 * 
 * * Establish the token with a monetary policy
 * * Mint some tokens (less than the maximum defined in monetaryPolicy)
 * * Send token (that you have a balance of)
 * * copy the payload generated from sending the token and send (out-of-band) to receiver
 * 
 * Then the receiver
 * * Receive token transaction using the sent payload
 * 
 * Note the payload does not need to be kept secure, it is tied directly to the receiving chaintree.
 */
const WalletPage = ({ tree }: { tree: ChainTree }) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [receiveDialogOpen,setReceiveDialogOpen] = useState(false)
    const [did,setDid] = useState("")

    const handleClose = () => {
        setDialogOpen(false)
        setReceiveDialogOpen(false)
    }

    useEffect(()=> {
        tree.id().then((id)=> {
            if (id != null) {
                setDid(id)
            }
        })
    })

    return (
        <div>
            <h1>Wallet</h1>
            <p>{did}</p>
            <Grid container spacing={2}>
                <Grid item>
                    <Button variant="outlined" onClick={() => { setDialogOpen(true) }}>Establish Token</Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={()=>{setReceiveDialogOpen(true)}}>Receive Token</Button>
                </Grid>
            </Grid>
            <TokenDisplay tree={tree}/>
            <EstablishTokenDialog open={dialogOpen} onClose={handleClose} tree={tree}/>
            <ReceiveTokenDialog open={receiveDialogOpen} onClose={handleClose} tree={tree}/>
        </div>
    )
}
