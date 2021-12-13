import { ref, watchEffect } from "vue"
import { collection, onSnapshot, doc, query, where, orderBy } from "firebase/firestore"
import { projectFirestore } from "@/firebase/config"

const getCollection = (collectionName, _query, order='createdAt') => {
    
    const documents = ref([])
    const error = ref(null)
    const isPending = ref(false)

    // register the firestore collection reference
    let collectionRef = collection(projectFirestore, collectionName)
    isPending.value = true

    // query
    collectionRef = query(collectionRef, orderBy(order))


    if (_query) {
        collectionRef = query(collectionRef, where(..._query))
    }

    const unsub = onSnapshot(collectionRef, (snap) => {
        // console.log('snap')
        let results = []

        snap.docs.forEach(doc => {
            // wait for the server to create the timestamp & send it back
            doc.data().createdAt && results.push({...doc.data(), id: doc.id})
        })

        //update values
        documents.value = results
        isPending.value = snap.metadata.hasPendingWrites ? true : false

    }, (err) => {
        console.log(err.message)
        error.value = 'could not fetch the data'
        documents.value = []
        isPending.value = false
    })

    watchEffect((onInvalidate) => {
        // unsub from prev collection when watcher is stopped (component unmounted)
        onInvalidate(() => unsub())
    })
    return { error, documents, isPending }
}

export default getCollection