import React, { useState } from 'react';
import { route,mount } from 'navi';
import { TextField, Button, Grid, Typography, CircularProgress } from '@material-ui/core';
import { EcdsaKey, Tupelo, getDefault, ChainTree, setOwnershipTransaction } from 'tupelo-wasm-sdk';
import { useNavigation } from 'react-navi';


const namespace =  Buffer.from("bbcw-contest-explorer")

const publicUserKey = async (userName:string)=> {
    return EcdsaKey.passPhraseKey(Buffer.from(userName),namespace)
}

const userTree = async (userName:string) => {
    const key = await publicUserKey(userName)
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
    "/registered/:username": route(async (req) => {
        return {
            view: <Registered userName={req.params.username}/>
        }
    })
});

const Registered = ({userName}:{userName:string})=> {
    return (
        <div>
            Successfully registered {userName}
        </div>
    )
}

const UsernameUnavailable = ({userName}:{userName:string}) => {
    return (
        <div>
            Username {userName} is NOT available.
        </div>
    )
}

const UsernameAvailable = ({userName}:{userName:string}) => {

    const navigation = useNavigation()
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)


    const registerUser = async ()=> {
        const insecureKey = await publicUserKey(userName)

        const secureKey = await EcdsaKey.passPhraseKey(Buffer.from(password), Buffer.from(userName))
        const secureKeyAddress = await Tupelo.ecdsaPubkeyToAddress(secureKey.publicKey)
        
        const community = await getDefault()
        const tree = await ChainTree.newEmptyTree(community.blockservice, insecureKey)

        await community.playTransactions(tree, [setOwnershipTransaction([secureKeyAddress])])
        navigation.navigate("/login/registered/"+userName)
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