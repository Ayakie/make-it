import { ref } from "vue"
import { doc, updateDoc } from "firebase/firestore"
import { projectFirestore } from "@/firebase/config"

const setDocument = (collectionName, _id) => {
    const error = ref(null)

    // update document
    const _updateDoc = async (data) => {
        error.value = null

        try {
            await updateDoc(doc(projectFirestore, collectionName, _id), data)

        } catch (err) {
            console.log('error occurred in setDoc', err.message)
            error.value = ' ※この項目は必須です'
        }

    }
    return { error, _updateDoc }
}

export default setDocument