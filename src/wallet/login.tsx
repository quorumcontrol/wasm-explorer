import React, { useState } from 'react';
import { route,mount } from 'navi';
import { TextField, Button, Grid, Typography, CircularProgress } from '@material-ui/core';
import { EcdsaKey, Tupelo, getDefault, ChainTree, setOwnershipTransaction, setDataTransaction } from 'tupelo-wasm-sdk';
import { useNavigation } from 'react-navi';
import { useGlobalState } from '../state';

export const usernameKey = "/_crazywallet/username"
const namespace =  Buffer.from("_crazywallet-dev")

/**
 * Generates a public/private keypair from an *insecure* passphrase.
 * This method is used to generate a ChainTree with a known name (given a namespace)
 * The very first thing you do with the ChainTree should be to ChangeOwner
 * @param userName - the username
 */
const publicUserKey = async (userName:string)=> {
    return EcdsaKey.passPhraseKey(Buffer.from(userName),namespace)
}

/**
 * Fetch the ChainTree based on the username see {@link publicUserKey} for more details
 * on how we determine the ChainTree from the username.
 * 
 * @param userName - the username
 */
const userTree = async (userName:string) => {
    const key = await publicUserKey(userName)
    // Convert the key to a tupelo DID (ChainTree id)
    const did = await Tupelo.ecdsaPubkeyToDid(key.publicKey)

    const community = await getDefault()
    let tip
    try {
        tip = await community.getTip(did)
    } catch(e) {
        if (e == "not found") {
            return null
        }
    }
    if (tip == undefined) {
        throw new Error("tip was undefined")
    }
    const tree = new ChainTree({
        store: community.blockservice,
        tip: tip,
    })
    return tree
}

/**
 * Define the navi routes 
 */
export const loginRoute = mount({
    "/": route(async (req) => {
            return {
                view: <RootLoginPage />
            }
    }),
    "/available/:username": route(async (req) => {
        const username = req.params.username
        const tree = await userTree(username)
        if (tree) {
            return {
                view: <UsernameUnavailable userName={username} />
            }
        } else {
            return {
                view: <UsernameAvailable userName={username} />
            }
        }
    }),
});


/**
 * 
 * When the username is unavailable
 */
const UsernameUnavailable = ({userName}:{userName:string}) => {
    return (
        <div>
            Username {userName} is NOT available.
        </div>
    )
}

/**
 * When the user name is available, offer to register the user with a password.
 * Under the hood, we'll be creating a private key from the password using the
 * warp wallet technique (Brain wallet).
 */
const UsernameAvailable = ({userName}:{userName:string}) => {

    const [_userTree,setUserTree] = useGlobalState("userTree")
    const [_userKey,setUserKey] = useGlobalState("userKey")
    const navigation = useNavigation()
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)


    const registerUser = async ()=> {
        setLoading(true)
        const insecureKey = await publicUserKey(userName)

        const secureKey = await EcdsaKey.passPhraseKey(Buffer.from(password), Buffer.from(userName))
        const secureKeyAddress = await Tupelo.ecdsaPubkeyToAddress(secureKey.publicKey)
        
        const community = await getDefault()
        const tree = await ChainTree.newEmptyTree(community.blockservice, insecureKey)

        await community.playTransactions(tree, [
                // Set the ownership of the chaintree to our secure key (thus owning the username)
                setOwnershipTransaction([secureKeyAddress]),
                // Cache the username inside of the chaintree for easier access later
                setDataTransaction(usernameKey, userName),
        ])
        tree.key = secureKey
        setUserKey(secureKey)
        setUserTree(tree)
        setLoading(false)
        navigation.navigate("/wallet")
    }

    const handleSubmit = (evt:React.FormEvent) => {
        evt.preventDefault()
        registerUser()
    }

    return (
        <div>
            Username {userName} is available.
            <p>Reserve username?</p>
            <form onSubmit={handleSubmit}>
            {loading ? <CircularProgress/> : null}
             <Grid container spacing={2}>
                    <Grid item>
                        <TextField label="password" id="password" type="password" value={password} onChange={(evt) => {setPassword(evt.target.value)}}/>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained">Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}


/**
 * The root login page which just allows for choosing a username
 */
export const RootLoginPage = () => {

    const navigation = useNavigation()
    const [username,setUsername] = useState("")

    const handleSubmit = (evt:React.FormEvent) => {
        evt.preventDefault()
        navigation.navigate("/login/available/" + username)
    }

    return (
        <div>
            <Typography>Login or Register</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item>
                        <TextField label="user name" id="userName" value={username} onChange={(evt) => {setUsername(evt.target.value)}}/>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained">Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}