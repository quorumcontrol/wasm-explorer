import { createStore } from 'react-hooks-global-state';
import {EcdsaKey, ChainTree, getDefault} from 'tupelo-wasm-sdk';

let resolve:Function
export const globalStorageStarted = new Promise((res)=> {resolve = res})

interface IGlobalState {
    userKey?:EcdsaKey
    userTree?:ChainTree
}

interface IAction {
    type:"setKey"|"setTree"
    userKey?:EcdsaKey
    userTree?:ChainTree
}

const reducer = (state:IGlobalState, action:IAction) => {
    switch (action.type) {
      case 'setKey': return {...state, userKey: action.userKey}
      case 'setTree': return { ...state, userTree: action.userTree };
      default: return state;
    }
  };

const initialState:IGlobalState = {
    userTree:undefined,
    userKey:undefined,
};
const persistentReducer = (state:IGlobalState, action:IAction) => {
    let mutated = reducer(state,action)

    if (mutated.userKey !== undefined && mutated.userKey.privateKey !== undefined) {
        sessionStorage.setItem('userKey', Buffer.from(mutated.userKey.privateKey).toString('hex'))
    }
    if (mutated.userTree !== undefined) {
        mutated.userTree.id().then((id)=> {
            if (id == null) {
                throw new Error("unknown id")
            }
            sessionStorage.setItem('userTreeDid', id)
        }, (err)=> {
            throw err
        })
    }
	return mutated
}

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(persistentReducer, initialState)

async function setStoredState() {
    let keyString = sessionStorage.getItem('userKey')
    if (!keyString || keyString === "") {
        resolve()
        return
    }
    let key = await EcdsaKey.fromBytes(Buffer.from(keyString, 'hex'))

    let userTreeDid = sessionStorage.getItem('userTreeDid')
    if (userTreeDid == null) {
        resolve()
        throw new Error("had a userKey but no user Tree")
    }
    let community = await getDefault()
    let tip = await community.getTip(userTreeDid)

    let tree = new ChainTree({
        tip: tip,
        store: community.blockservice,
        key:key,
    })
    dispatch({
        type: "setKey",
        userKey: key,
    })
    dispatch({
        type:"setTree",
        userTree: tree,
    })
    resolve()
}
setStoredState()