import React from 'react'
import {mount,route, redirect, map} from 'navi'
import {useGlobalState} from '../state'
import {ChainTree} from 'tupelo-wasm-sdk'

/**
 * Define the navi routes 
 */
export const walletRoute = mount({
    "/": map(async (req, userTreeObj) => {
            const userTree = userTreeObj as ChainTree
            if (userTree.id == undefined) {
                return redirect("/login")
            }
            return route({
                view: <WalletPage tree={userTree} />
            })
    }),
});

const WalletPage = ({tree}:{tree:ChainTree})=> {
    return (
        <h1>Wallet</h1>
    )
}