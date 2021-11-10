import { initializeApp } from 'firebase/app'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import { getAuth } from "firebase/auth"

// const auth = getAuth()

const firebaseConfig = {
    apiKey: "AIzaSyAOLQ10OuZdRl5rTHvgWoF1MqZST_C4i2w",
    authDomain: "dragonash-257b7.firebaseapp.com",
    projectId: "dragonash-257b7",
    storageBucket: "dragonash-257b7.appspot.com",
    messagingSenderId: "89925345596",
    appId: "1:89925345596:web:7a2b4796749b2911c63e39"
  };

// init firebase
const app = firebase.initializeApp(firebaseConfig)

// init service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { timestamp, projectFirestore, projectAuth, app }