import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBaoBa8ZfWyPg7RHwJ78faKeYzgp6Jcp3U',
  authDomain: 'otaku-tracks.firebaseapp.com',
  projectId: 'otaku-tracks',
  storageBucket: 'otaku-tracks.appspot.com',
  appId: '1:104667329874:web:b6c54a3869c90086aef68b'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error: ${error.code}`)
})

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export { auth, db, usersCollection, storage, songsCollection, commentsCollection }
