import {Community} from 'tupelo-wasm-sdk'

export const getCommunity = async ()=> {
    return Community.getDefault()
}