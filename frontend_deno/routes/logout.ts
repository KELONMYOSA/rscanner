import {Handlers} from "$fresh/src/server/types.ts";
import {Cookie} from "https://deno.land/x/another_cookiejar@v5.0.2/cookie.ts";

export const handler: Handlers<string> = {
    async GET(req, ctx) {

        const cookieAccess = new Cookie({
            name: "access",
            value: "",
            expires: 1
        })

        const cookieRefresh = new Cookie({
            name: "refresh",
            value: "",
            expires: 1
        })

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