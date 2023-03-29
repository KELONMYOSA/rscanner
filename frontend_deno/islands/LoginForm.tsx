import {authUser} from "../utils/authenticationJWT.ts";
import {useEffect, useState} from "https://esm.sh/stable/preact@10.11.0/deno/hooks.js";

export default function LoginForm(auth_secret: string) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [hidden, setHidden] = useState(true)
    const [detailAlertText, setDetailAlertText] = useState('')
    const [usernameAlertText, setUsernameAlertText] = useState('')
    const [passwordAlertText, setPasswordAlertText] = useState('')
    const [usernameAlertClassName, setUsernameAlertClassName] = useState('')
    const [passwordAlertClassName, setPasswordAlertClassName] = useState('')
    const [usernameAlertBorder, setUsernameAlertBorder] = useState('input input-bordered w-full')
    const [passwordAlertBorder, setPasswordAlertBorder] = useState('input input-bordered w-full')

    async function clickAuthButton() {
        const errors = await authUser(username, password, auth_secret.auth_secret)
        if (errors[0] != undefined) {
            setUsernameAlertText(errors[0])
            setUsernameAlertClassName('tooltip tooltip-error')
            setUsernameAlertBorder('input input-bordered w-full border-error')
        } else {
            setUsernameAlertClassName('')
        }
        if (errors[1] != undefined) {
            setPasswordAlertText(errors[1])
            setPasswordAlertClassName('tooltip tooltip-error')
            setPasswordAlertBorder('input input-bordered w-full border-error')
        } else {
            setPasswordAlertClassName('')
        }
        if (errors[2] != undefined) {
            if (errors[2] = 'No active account found with the given credentials') {
                setDetailAlertText('Не найден пользователь с указанными данными!')
            } else {
                setDetailAlertText(errors[2])
            }

        } else {
            setDetailAlertText('')
        }
    }

    useEffect(() => {
        if (usernameAlertText != '') {
            setTimeout(setUsernameAlertBorder, 3000, 'input input-bordered w-full');
            setTimeout(setUsernameAlertText, 3000, '');
            setTimeout(setUsernameAlertClassName, 3000, '');
        }
    }, [usernameAlertText]);

    useEffect(() => {
        if (passwordAlertText != '') {
            setTimeout(setPasswordAlertBorder, 3000, 'input input-bordered w-full');
            setTimeout(setPasswordAlertText, 3000, '');
            setTimeout(setPasswordAlertClassName, 3000, '');
        }
    }, [passwordAlertText]);

    useEffect(() => {
        if (detailAlertText != '') {
            setTimeout(setDetailAlertText, 5000, '');
        }
    }, [detailAlertText]);

    const authAlert = () => {
        if (detailAlertText != '') {
            return (
                <div>
                    <label className="label"/>
                    <div className="alert shadow-lg animate-pulse">
                        <div>
                            <img className="w-5 mr-2"
                                 src="alert.svg"
                                 alt="alert"/>
                            <span>{detailAlertText}</span>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const toggleShow = () => {
        setHidden(!hidden);
    }

    const passImg = () => {
        if (hidden) {
            return <img className="w-5"
                        src="eye_pass_close.svg"
                        alt="hide"/>
        } else {
            return <img className="w-5"
                        src="eye_pass_open.svg"
                        alt="hide"/>
        }
    }

    return (
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <a className="btn btn-sm md:btn-md btn-ghost w-16" href="/">
                    <svg className="h-6 w-6 fill-current md:h-8 md:w-8"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                    </svg>
                </a>

                <div className="form-control">
                    <div className={usernameAlertClassName} data-tip={usernameAlertText}>
                        <label className="input-group">
                            <span className="w-28">Email</span>
                            <input type="email" placeholder="" onChange={(data) => setUsername(data.target.value)}
                                   className={usernameAlertBorder}/>
                        </label>
                    </div>

                    <label className="label"/>

                    <div className={passwordAlertClassName} data-tip={passwordAlertText}>
                        <label className="input-group">
                            <span className="w-28">Пароль</span>
                            <div className="relative w-full">
                                <button className="absolute right-3 inset-y-3 focus:outline-none" onClick={toggleShow}>
                                    {passImg()}
                                </button>
                                <input type={hidden ? 'password' : 'text'}
                                       value={password}
                                       onChange={(data) => setPassword(data.target.value)}
                                       className={passwordAlertBorder}></input>
                            </div>
                        </label>
                    </div>
                    {authAlert()}
                </div>
                <button className="btn btn-accent mt-6" onClick={clickAuthButton}>Войти</button>
            </div>
        </div>
    )
}