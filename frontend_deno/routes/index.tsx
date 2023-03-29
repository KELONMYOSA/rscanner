import {Head} from "$fresh/runtime.ts";
import {Fragment} from "https://esm.sh/stable/preact@10.11.0/deno/preact.js";
import Navigation from "../components/Navigation.tsx";
import {Handlers, PageProps} from "$fresh/src/server/types.ts";
import {IUserData} from "../utils/types.ts";
import {getUserData, refreshToken} from "../utils/authenticationJWT.ts";
import {createSignedCookie, verifySignedCookie} from "https://deno.land/x/squishy_cookies/mod.ts";

export const handler: Handlers<IUserData | null> = {
    async GET(req, ctx) {
        const accessToken = await verifySignedCookie(req.headers, "access", Deno.env.get("COOKIE_SECRET"))
        const userData = await getUserData(accessToken)
        let resp = await ctx.render(userData)
        if (userData == null) {
            const rToken = await verifySignedCookie(req.headers, "refresh", Deno.env.get("COOKIE_SECRET"))
            let newAccessToken = await refreshToken(rToken)
            if (newAccessToken != null) {
                const { cookie: cookieAccess } = await createSignedCookie(
                    "access",
                    newAccessToken.split('.').join('~'),
                    Deno.env.get("COOKIE_SECRET"),
                    {
                        path: "/",
                        maxAge: 60 * 5,
                    },
                );
                newAccessToken = cookieAccess.substring(cookieAccess.search('access=') + 7, cookieAccess.search(';'))
                resp = await ctx.render(await getUserData(newAccessToken))
                await resp.headers.set("Set-cookie", cookieAccess)
            }
        }

        return resp
    }
}

export default function Home({data: userData}: PageProps<IUserData | null>) {
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
                <title>rscanner - Simple Receipt Scanner</title>
                <link
                    href="https://cdn.jsdelivr.net/npm/daisyui@2.6.0/dist/full.css"
                    rel="stylesheet"
                    type="text/css"
                />
            </Head>
            <Navigation userData={userData}/>
            <div className="mx-auto h-screen bg-gray-100">
                <div className="p-4 mx-auto max-w-screen-md bg-gray-100">
                    <h1>{JSON.stringify(userData)}</h1>
                </div>
            </div>
        </Fragment>
    );
}
