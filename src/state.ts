import { createGlobalState } from 'react-hooks-global-state';
import {EcdsaKey, ChainTree} from 'tupelo-wasm-sdk';

interface IGlobalState {
    userKey?:EcdsaKey
    userTree?:ChainTree
}

const initialState:IGlobalState = {
    userTree:undefined,
    userKey:undefined,
};
export const { GlobalStateProvider, useGlobalState } = createGlobalState(initialState);
