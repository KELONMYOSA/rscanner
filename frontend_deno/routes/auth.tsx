import {Handlers, PageProps} from "$fresh/src/server/types.ts";
import {AES} from "https://deno.land/x/god_crypto/aes.ts";
import {encode} from "https://deno.land/x/god_crypto/mod.ts";
import {createSignedCookie} from 'https://deno.land/x/squishy_cookies/mod.ts'

export const handler: Handlers<string> = {
    async GET(req, ctx) {
        const aes = new AES(Deno.env.get("AUTH_SECRET"), {
            mode: "cbc",
            iv: "random 16byte iv",
        });
        const key = req.url.substring(req.url.search('key=') + 4)
        const url = new URL(req.url)
        let data
        try {
            data = await aes.decrypt(encode.hex(key));
        } catch (e) {
            return Response.redirect(url.protocol + url.host + '/login')
        }

        interface AuthData {
            access: string
            refresh: string
            date: string
        }

        const authData = JSON.parse(data.toString()) as AuthData

        if ((new Date().getTime() - new Date(authData.date).getTime()) > 20000) {
            return Response.redirect(url.protocol + url.host + '/login')
        }

        const { cookie: cookieAccess } = await createSignedCookie(
            "access",
            authData.access.split('.').join('~'),
            Deno.env.get("COOKIE_SECRET"),
            {
                path: "/",
                maxAge: 60 * 5,
            },
        );
        const { cookie: cookieRefresh } = await createSignedCookie(
            "refresh",
            authData.refresh.split('.').join('~'),
            Deno.env.get("COOKIE_SECRET"),
            {
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            },
        );

        return new Response("", {
            status: 302,
            headers: [
                ['Location', '/'],
                ['Set-cookie', cookieAccess],
                ['Set-cookie', cookieRefresh],
            ]
        });
    }
}