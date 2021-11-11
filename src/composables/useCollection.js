import { ref } from "vue"
import { collection, addDoc } from "firebase/firestore"
import { projectFirestore } from "@/firebase/config"

const useCollection = (collectionName) => {
    const error = ref(null)
    
    // add a new document
    const _addDoc = async(data) => {
        error.value = null
        
        try {
            const docRef = await addDoc(collection(projectFirestore, collectionName), data)

            return docRef

        } catch (err) {
            console.log(err.message)
            error.value = '追加できませんでした'
        }

    }

    return { error, _addDoc }
}

export default useCollection