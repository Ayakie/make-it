import { ref } from "vue"
import { doc, getDoc } from "firebase/firestore"
import { projectFirestore } from "@/firebase/config"

const getDocument = (collectionName, _id) => {
    const document = ref(null)
    const error = ref(null)
    
   const _getDoc = async () => {
       try {
            const docRef = doc(projectFirestore, collectionName, _id)
            const docSnap = await getDoc(docRef)
            document.value = {...docSnap.data(), id: docSnap.id}
            console.log('docSnap: ', docSnap)
            if (!docSnap.exists()) {
                throw new Error('could not fetch the data')
            }
            error.value = null
    
    
        } catch (err) {
            console.log(err)
            error.value = err
            document.value = null
        }
   }
    console.log('document in getDocument()', document.value)

    return { error, document, _getDoc }
}

export default getDocument