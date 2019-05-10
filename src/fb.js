import * as firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'

const fbConfig = require('./fbconfig.json')
const config = {
  apiKey: fbConfig.apiKey,
  authDomain: fbConfig.authDomain,
  databaseURL: fbConfig.databaseURL,
  projectId: fbConfig.projectId,
  storageBucket: fbConfig.storageBucket,
  messagingSenderId: fbConfig.messagingSenderId
}

firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// collections
const usersCollection = db.collection('users')

export {
  db,
  config,
  auth,
  currentUser,
  usersCollection
}