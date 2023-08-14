import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDCdKAnQyXBwob-AH_iU9Rf_6eeVlN3d-c',
  authDomain: 'raphaellim-b45a5.firebaseapp.com',
  projectId: 'raphaellim-b45a5',
  storageBucket: 'raphaellim-b45a5.appspot.com',
  messagingSenderId: '993446059556',
  appId: '1:993446059556:web:d40edff1fb1840c8f942b1'
}

initializeApp(firebaseConfig)
const db = getFirestore()

export { db }