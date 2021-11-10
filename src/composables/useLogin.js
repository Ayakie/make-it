import { ref } from "vue"
import { app } from '../firebase/config'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const error = ref(null)
const auth = getAuth(app)

const login = async (email, password) => {
    error.value = null
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        error.value = null

        return res

    } catch (err) {
        error.value = "メールアドレスまたはパスワードが間違っています"
    }
}

const useLogin = () => {
    return { error, login }
}

export default useLogin