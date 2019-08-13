import React from 'react';
import { route } from 'navi';


export const loginRoute = route(async (req) => {
    return {
        view: <LoginPage />
    }
})


export const LoginPage = ()=> {
    return (
        <div>
            Login
        </div>
    )
}