import {Head} from "$fresh/runtime.ts";
import {Fragment} from "https://esm.sh/stable/preact@10.11.0/deno/preact.js";

export default function Register() {
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
                <title>404 - Page not found</title>
                <link
                    href="https://cdn.jsdelivr.net/npm/daisyui@2.6.0/dist/full.css"
                    rel="stylesheet"
                    type="text/css"
                />
            </Head>
            <div className="mx-auto h-screen bg-gray-100">
                <div className="w-full flex justify-center">
                    <img className="m-4"
                         src="logo_text.svg"
                         alt="rscanner"/>
                </div>
                <div className="p-4 mx-auto max-w-screen-md h-5/6 flex justify-center items-center">
                    <div className="max-w-md flex-col">
                        <h1 className="text-9xl font-bold text-center text-accent mb-8">404</h1>
                        <h1 className="text-5xl font-bold text-center">Page no found</h1>
                        <p className="text-xl py-6 text-center">Something went wrong, so this page is broken.</p>
                        <div className="flex justify-center">
                            <a className="btn btn-primary" href="/">Homepage</a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}