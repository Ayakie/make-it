import { ref } from "vue"
import { projectAuth } from "../firebase/config"
import { onAuthStateChanged} from "firebase/auth"

// if currently not logged in, the value is null
const user = ref(projectAuth.currentUser)

onAuthStateChanged(projectAuth, (_user) => {
    user.value = _user
    console.log('User state change. current user is ', user.value)
})

const getUser = () => {
    return user
}

export default getUser