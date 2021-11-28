import { ref, watchEffect } from "vue"
import { collection, onSnapshot, doc, query, where, orderBy } from "firebase/firestore"
import { projectFirestore } from "@/firebase/config"

const getCollection = (collectionName, _query) => {
    
    const documents = ref([])
    const error = ref(null)

    // register the firestore collection reference
    let collectionRef = collection(projectFirestore, collectionName)
    collectionRef = query(collectionRef, orderBy('createdAt'))


    if (_query) {
        collectionRef = query(collectionRef, where(..._query))
    }

    const unsub = onSnapshot(collectionRef, (snap) => {
        console.log('snap')
        let results = []

        snap.docs.forEach(doc => {
            // wait for the server to create the timestamp & send it back
            doc.data().createdAt && results.push({...doc.data(), id: doc.id})
        })

        //update values
        documents.value = results
        // これいる？
        error.value = null

    }, (err) => {
        console.log(err.message)
        error.value = 'could not fetch the data'
        documents.value = []
    })

    watchEffect((onInvalidate) => {
        // unsub from prev collection when watcher is stopped (component unmounted)
        onInvalidate(() => unsub())
    })
    return { error, documents }
}

export default getCollection