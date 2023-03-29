import {useState} from "https://esm.sh/stable/preact@10.11.0/deno/hooks.js";

export default function ProfileForm(userData) {
    const [changeProfile, setChangeProfile] = useState(false)
    const [avatarFile, setAvatarFile] = useState()

    const avatar = (userData) => {
        if (userData.userData != null) {
            if (userData.userData.avatar == "") {
                return (
                    <div className="avatar place-self-center">
                        <div className="w-24 rounded-full">
                            <img src="default_user_avatar.svg"
                                 alt="avatar"/>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="avatar place-self-center">
                        <div className="w-24 rounded-full">
                            <img src={userData.userData.avatar}
                                 alt="avatar"/>
                        </div>
                    </div>
                )
            }
        }
    }

    const editProfile = () => {
        setChangeProfile(!changeProfile)
    }

    if (changeProfile) {
        return (
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <div>
                        <p className="label-text mb-2">Фото профиля:</p>
                        <input type="file" accept="image/png, image/gif, image/jpeg"
                               value={avatarFile}
                               onChange={(data) => setAvatarFile(data.target.value)}/>
                    </div>
                    {avatarFile}
                    <div className="form-control">
                        <div className="divider"></div>
                        <label className="label">
                            <span className="label-text">Почта:</span>
                            <span className="label-text">{userData.userData.email}</span>
                        </label>
                        <label className="label">
                            <span className="label-text">Имя:</span>
                            <span className="label-text">{userData.userData.first_name}</span>
                        </label>
                        <label className="label">
                            <span className="label-text">Фамилия:</span>
                            <span className="label-text">{userData.userData.last_name}</span>
                        </label>
                        <label className="label">
                            <span className="label-text">Компания:</span>
                            <span className="label-text">{userData.userData.company}</span>
                        </label>
                        <div className="divider"></div>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="btn btn-warning btn-outline">Сохранить</button>
                            <a className="btn btn-ghost" href="/profile">Отмена</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <button className="focus:outline-none place-self-end hover:scale-110" onClick={editProfile}>
                        <img className="w-5"
                             src="edit_profile.svg"
                             alt="edit"/>
                    </button>
                    {avatar(userData)}
                    <div className="form-control">
                        <div className="divider"></div>
                        <label className="label">
                            <span className="label-text">Почта:</span>
                            <span className="label-text">{userData.userData.email}</span>
                        </label>
                        <label className="label">
                            <span className="label-text">Имя:</span>
                            <span className="label-text">{userData.userData.first_name}</span>
                        </label>
                        <label className="label">
                            <span className="label-text">Фамилия:</span>
                            <span className="label-text">{userData.userData.last_name}</span>
                        </label>
                        <label className="label">
                            <span className="label-text">Компания:</span>
                            <span className="label-text">{userData.userData.company}</span>
                        </label>
                        <div className="divider"></div>
                    </div>
                </div>
            </div>
        )
    }
}