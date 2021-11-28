import { ref } from "vue"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { projectFirestore } from "@/firebase/config"

const setDocument = (collectionName, _id) => {
    const error = ref(null)
    const docRef = doc(projectFirestore, collectionName, _id)
    // update document
    const _updateDoc = async (data) => {
        error.value = null

        try {
            await updateDoc(docRef, data)
        } catch (err) {
            console.log('error occurred in setDoc', err.message)
            error.value = err.message
        }

    }

    // delete document
    const _deleteDoc = async () => {
        error.value = null

        try {
            await deleteDoc(docRef)
        } catch (err) {
            error.value = err.message
        }
    }
    return { error, _updateDoc, _deleteDoc }
}

export default setDocument