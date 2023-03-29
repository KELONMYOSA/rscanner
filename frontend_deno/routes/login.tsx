import {Head} from "$fresh/runtime.ts";
import {Fragment} from "https://esm.sh/stable/preact@10.11.0/deno/preact.js";
import LoginForm from "../islands/LoginForm.tsx"
import {Handlers} from "$fresh/src/server/types.ts";
import {verifySignedCookie} from "https://deno.land/x/squishy_cookies/mod.ts";
import {getUserData, refreshToken} from "../utils/authenticationJWT.ts";

export const handler: Handlers = {
    async GET(req, ctx) {
        const resp = new Response("", {
            status: 302,
            headers: {
                Location: '/profile'
            }
        });
        const accessToken = await verifySignedCookie(req.headers, "access", Deno.env.get("COOKIE_SECRET"))
        const userData = await getUserData(accessToken)

        if (userData == null) {
            const rToken = await verifySignedCookie(req.headers, "refresh", Deno.env.get("COOKIE_SECRET"))
            const newAccessToken = await refreshToken(rToken)
            if (newAccessToken != null) {
                return resp
            } else {
                return ctx.render()
            }
        } else {
            return resp
        }
    }
}

export default function Login() {
    return (
        <Fragment>
            <html data-theme="fantasy"></html>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="mask-icon" href="/safari-pinned-tab.svg"/>
                <meta name="msapplication-TileColor" content="#da532c"/>
                <meta name="theme-color" content="#ffffff"/>
                <title>Login - rscanner</title>
                <link
                    href="https://cdn.jsdelivr.net/npm/daisyui@2.6.0/dist/full.css"
                    rel="stylesheet"
                    type="text/css"
                />
            </Head>
            <div className="mx-auto h-screen bg-gray-100">
                <div className="p-4 mx-auto max-w-screen-md h-full flex justify-center items-center">
                    <div className="flex-col">
                        <div className="w-full flex justify-center">
                            <img className="m-4"
                                 src="logo_text.svg"
                                 alt="rscanner"/>
                        </div>
                        <LoginForm auth_secret={Deno.env.get("AUTH_SECRET")}/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}