import { ref } from "vue"
// import { app } from '../firebase/config'
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth"

const error = ref(null)
// const auth = getAuth(app)

const signup = async (auth, name, email, password) => {
    error.value = null
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (!res) {
            throw new Error('サインアップが完了しませんでした')
        }
        await updateProfile(auth.currentUser,
             {displayName: name} )
        error.value = null

        return res

    } catch (err) {
        console.log(err.message)
        error.value = err.message
    }

}

const useSignup = () => {
    return {error, signup}
}

export default useSignup