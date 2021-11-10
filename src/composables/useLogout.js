import { ref } from "vue"
import { app } from '../firebase/config'
import { getAuth, signOut} from "firebase/auth"

const error = ref(null)
const auth = getAuth(app)

const logout = async () => {
    error.value = null
    try {
        await signOut(auth)

    } catch (err) {
        error.value = err.message
    }
}

const useLogout = () => {
    return { error, logout }
}

export default useLogout