import React, { useState } from 'react';
import { route,mount } from 'navi';
import { TextField, Button, Grid, Typography, CircularProgress } from '@material-ui/core';
import { EcdsaKey, Tupelo, getDefault, ChainTree, setOwnershipTransaction, setDataTransaction } from 'tupelo-wasm-sdk';
import { useNavigation } from 'react-navi';
import { dispatch } from '../state';

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
                view: <UsernameUnavailable userName={username} tree={tree} />
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
const UsernameUnavailable = ({userName, tree}:{userName:string, tree:ChainTree}) => {
    const navigation = useNavigation()

    const [loading,setLoading] = useState(false)
    const [password,setPassword] = useState("")
    const [badPassword,setBadPassword] = useState(false)

    const handleSubmit = async (evt:React.FormEvent)=> {
        evt.preventDefault()

        setLoading(true)
        setBadPassword(false)
        let secureKey = await EcdsaKey.passPhraseKey(Buffer.from(password), Buffer.from(userName))
        let secureAddr = await Tupelo.ecdsaPubkeyToAddress(secureKey.publicKey)
        let resolveResp = await tree.resolve(["tree", "_tupelo", "authentications"])
        setLoading(false)
        let auths:string[] = resolveResp.value
        if (auths.includes(secureAddr)) {
            dispatch({
                type:"setKey",
                userKey: secureKey,
            })
            dispatch({
                type:"setTree",
                userTree: tree,
            })
            navigation.navigate("/wallet")
        } else {
            setBadPassword(true)
        }
        setLoading(false)
    }

    return (
        <div>
            Username {userName} is NOT available.
            <p>Your Username? You can login.</p>
            <form onSubmit={handleSubmit}>
            {loading ? <CircularProgress/> : null}
             <Grid container spacing={2}>
                    <Grid item>
                        <TextField error={badPassword} label="password" id="password" type="password" value={password} onChange={(evt) => {setPassword(evt.target.value)}}/>
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
 * When the user name is available, offer to register the user with a password.
 * Under the hood, we'll be creating a private key from the password using the
 * warp wallet technique (Brain wallet).
 */
const UsernameAvailable = ({userName}:{userName:string}) => {
    const navigation = useNavigation()
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)

    /**
     * * create the private key from the password
     * * change ownership of the known ChainTree to the new key
     * * change the global state to reflect the user is logged in
     */
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
        dispatch({
            type:"setKey",
            userKey: secureKey,
        })
        dispatch({
            type:"setTree",
            userTree: tree,
        })
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