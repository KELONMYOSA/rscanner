import {IUserData} from "./types.ts";
import {AES} from "https://deno.land/x/god_crypto/aes.ts";

export async function getUserData(accessToken: string | boolean): Promise<IUserData | null> {
    if (accessToken) {
        if (typeof accessToken !== "boolean") {
            accessToken = accessToken.split('.')[0].split('~').join('.')
        }

        const res = await fetch('http://127.0.0.1:8000/api/v1/auth/users/me/', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
        if (res.status == 200) {
            return await res.json() as IUserData
        } else {
            return null
        }
    } else {
        return null
    }
}

export async function refreshToken(refreshToken: string | boolean): Promise<string | null> {
    if (refreshToken) {
        if (typeof refreshToken !== "boolean") {
            refreshToken = refreshToken.split('.')[0].split('~').join('.')
        }
        const res = await fetch('http://127.0.0.1:8000/api/v1/token/refresh/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: refreshToken
            })
        });
        if (res.status == 200) {
            interface RefreshResponse { access: string }

            return (await res.json() as RefreshResponse).access
        } else {
            return null
        }
    } else {
        return null
    }
}

export async function authUser(username: string, password: string, AUTH_SECRET: string) {
    const res = await fetch('http://127.0.0.1:8000/api/v1/token/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: username,
            password: password
        })
    });
    if (res.status == 200) {
        interface TokenObtainPairResponse {
            refresh: string
            access: string
        }

        const tokenPair = await res.json() as TokenObtainPairResponse
        const tokens = JSON.stringify({
            access: tokenPair.access,
            refresh: tokenPair.refresh,
            date: new Date()
        })

        const aes = new AES(AUTH_SECRET, {
            mode: "cbc",
            iv: "random 16byte iv",
        });

        const cipher = await aes.encrypt(tokens);

        open('/auth?key=' + cipher.hex(), '_self')
    } else {
        interface LoginErrors {
            password: string
            email: string
            detail: string
        }
        const errors = await res.json() as LoginErrors
        return [errors.email, errors.password, errors.detail]
    }
}

export async function registerUser(email:string, password: string) {
    const res = await fetch('http://localhost:8000/api/v1/auth/users/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    if (res.status != 201) {
        interface RegErrors {
            email: string
            password: string
        }
        const errors = await res.json() as RegErrors
        return [errors.email, errors.password]
    } else {
        return true
    }
}