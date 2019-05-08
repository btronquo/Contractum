import * as firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'

// firebase init
const config = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID
}

firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// firestore collections
const usersCollection = db.collection('users')

export {
  db,
  config,
  auth,
  currentUser,
  usersCollection
}