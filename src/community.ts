import {Community} from 'tupelo-wasm-sdk'

export const getCommunity = async ()=> {
    let c = await Community.getDefault()
    await c.nextUpdate()
    return c
}