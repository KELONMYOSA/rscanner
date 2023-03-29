import {registerUser} from "../utils/authenticationJWT.ts";
import {useEffect, useState} from "https://esm.sh/stable/preact@10.11.0/deno/hooks.js";

export default function RegistrationForm() {
    const [formVisible, setFormVisible] = useState(true)
    const [formClassName, setFormClassName] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidden, setHidden] = useState(true)
    const [emailAlertText, setEmailAlertText] = useState('')
    const [passwordAlertText, setPasswordAlertText] = useState('')
    const [emailAlertClassName, setEmailAlertClassName] = useState('')
    const [passwordAlertClassName, setPasswordAlertClassName] = useState('')
    const [emailAlertBorder, setEmailAlertBorder] = useState('input input-bordered w-full')
    const [passwordAlertBorder, setPasswordAlertBorder] = useState('input input-bordered w-full')

    async function clickRegButton() {
        const errors = await registerUser(email, password)
        if (errors == true) {
            setFormVisible(false)
            setFormClassName('invisible')
        } else {
            if (errors[0] != undefined) {
                setEmailAlertText(errors[0])
                setEmailAlertClassName('tooltip tooltip-error')
                setEmailAlertBorder('input input-bordered w-full border-error')
            } else {
                setEmailAlertClassName('')
            }
            if (errors[1] != undefined) {
                let errorText = ""
                errors[1].forEach(function (value) {
                    errorText += value + " "
                })
                setPasswordAlertText(errorText)
                setPasswordAlertClassName('tooltip tooltip-error')
                setPasswordAlertBorder('input input-bordered w-full border-error')
            } else {
                setPasswordAlertClassName('')
            }
        }
    }

    useEffect(() => {
        if (emailAlertText != '') {
            setTimeout(setEmailAlertBorder, 3000, 'input input-bordered w-full');
            setTimeout(setEmailAlertText, 3000, '');
            setTimeout(setEmailAlertClassName, 3000, '');
        }
    }, [emailAlertText]);

    useEffect(() => {
        if (passwordAlertText != '') {
            setTimeout(setPasswordAlertBorder, 3000, 'input input-bordered w-full');
            setTimeout(setPasswordAlertText, 3000, '');
            setTimeout(setPasswordAlertClassName, 3000, '');
        }
    }, [passwordAlertText]);

    const successForm = () => {
        if (!formVisible) {
            return (
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <a className="btn btn-sm md:btn-md btn-ghost w-16" href="/">
                            <svg className="h-6 w-6 fill-current md:h-8 md:w-8"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                            </svg>
                        </a>

                        <p className="text-xl text-center">На почту {email} была отправлена ссылка для подтверждения регистрации.</p>
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
        <div>
            {successForm()}
            <div className={formClassName}>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <a className="btn btn-sm md:btn-md btn-ghost w-16" href="/">
                            <svg className="h-6 w-6 fill-current md:h-8 md:w-8"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                            </svg>
                        </a>

                        <div className="form-control">
                            <div className={emailAlertClassName} data-tip={emailAlertText}>
                                <label className="input-group">
                                    <span className="w-28">Email</span>
                                    <input type="email" placeholder="me@rscanner.ru"
                                           onChange={(data) => setEmail(data.target.value)}
                                           className={emailAlertBorder}/>
                                </label>
                            </div>

                            <label className="label"/>

                            <div className={passwordAlertClassName} data-tip={passwordAlertText}>
                                <label className="input-group">
                                    <span className="w-28">Пароль</span>
                                    <div className="relative w-full">
                                        <button className="absolute right-3 inset-y-3 focus:outline-none"
                                                onClick={toggleShow}>
                                            {passImg()}
                                        </button>
                                        <input type={hidden ? 'password' : 'text'}
                                               value={password}
                                               onChange={(data) => setPassword(data.target.value)}
                                               className={passwordAlertBorder}></input>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <button className="btn btn-accent mt-6" onClick={clickRegButton}>Зарегистрироваться</button>
                    </div>
                </div>
            </div>
        </div>
    )
}