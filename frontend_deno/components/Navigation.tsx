import {IUserData} from "../utils/types.ts";

export default function Navigation(userData: IUserData | null) {
    const checkUserData = (userData) => {
        if (userData.userData == null) {
            return authButtons
        } else {
            return authProfile(userData)
        }
    }

    const avatar = (userData) => {
        if (userData.userData != null) {
            return(
                <img src="default_user_avatar.svg"
                     alt="avatar"/>
            )
        }
    }

    const authProfile = (userData) => {
        return(
            <div className="flex-none gap-2">
                <p className="hidden lg:flex">{userData.userData.email}</p>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {avatar(userData)}
                        </div>
                    </label>
                    <ul tabIndex={0}
                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-32">
                        <li>
                            <a className="justify-between hover:bg-yellow-400 active:bg-pink-700" href="/profile">
                                Профиль
                            </a>
                        </li>
                        <li><a className="hover:bg-yellow-400 active:bg-pink-700">Мои чеки</a></li>
                        <li><a className="hover:bg-red-600 hover:text-white active:bg-pink-700" href="/logout">Выйти</a></li>
                    </ul>
                </div>
            </div>
        )
    }

    const authButtons = (
        <div className="flex-none gap-2">
            <a className="btn btn-outline btn-warning lg:btn-sm btn-xs" href="/register">Регистрация</a>
            <a className="btn btn-primary lg:btn-sm btn-xs" href="/login">Войти</a>
        </div>
    )

    return (
        <div className="navbar sticky top-0 bg-base-100 z-50">
            <a className="shrink mx-2 w-40 lg:w-48" href="/">
                <img className="grow"
                     src="logo_text.svg"
                     alt="rscanner"/>
            </a>
            <a className="flex-1"/>
            {checkUserData(userData)}
        </div>
    )
}