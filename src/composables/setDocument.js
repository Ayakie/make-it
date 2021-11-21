import { ref } from "vue"
import { doc, setDoc } from "firebase/firestore"
import { projectFirestore } from "@/firebase/config"

const setDocument = (collectionName, _id) => {
    const error = ref(null)

    // update document
    const updateDoc = async (data) => {
        error.value = null

        try {
            // merge with existing data
            await setDoc(doc(projectFirestore, collectionName, _id),
            data,
            {merge: true})

        } catch (err) {
            console.log('error occurred in setDoc', err.message)
            error.value = 'データを更新できませんでした'
        }

    }
    return { error, updateDoc }
}

export default setDocument