import {Handlers, PageProps} from "$fresh/server.ts";
import {Head} from "$fresh/src/runtime/head.ts";
import {Fragment} from "https://esm.sh/stable/preact@10.11.0/deno/preact.js";

export const handler: Handlers<string> = {
    async GET(req, ctx) {
        const uid = req.url.substring(req.url.search("activate/") + 9, req.url.search("@"))
        const token = req.url.substring(req.url.search("@") + 1)

        const res = await fetch('http://localhost:8000/api/v1/auth/users/activation/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: uid,
                token: token
            })
        });

        if (res.status == 204) {
            return ctx.render(true)
        } else {
            return ctx.render(false)
        }
    }
}

export default function ActivationPage({data: status}: PageProps<boolean>) {
    const statusForm = () => {
        if (status) {
            return (
                <div className="flex-col">
                    <p className="text-2xl py-10 text-center">Учетная запись была успешно активирована!</p>
                    <div className="flex justify-center">
                        <a className="btn btn-primary" href="/login">Войти</a>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="flex-col">
                    <p className="text-2xl py-10 text-center">Ссылка недействительна!</p>
                    <div className="flex justify-center">
                        <a className="btn btn-primary" href="/">Назад</a>
                    </div>
                </div>
            )
        }
    }

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
                <title>Activation</title>
                <link
                    href="https://cdn.jsdelivr.net/npm/daisyui@2.6.0/dist/full.css"
                    rel="stylesheet"
                    type="text/css"
                />
            </Head>
            <div className="mx-auto h-screen bg-gray-100">
                <div className="w-full flex justify-center">
                    <img className="m-4"
                         src="../logo_text.svg"
                         alt="rscanner"/>
                </div>
                <div className="p-4 mx-auto max-w-screen-md h-5/6 flex justify-center items-center">
                    {statusForm()}
                </div>
            </div>
        </Fragment>
    );
}