// import firebase from 'firebase';
import { database, auth } from './Config';



const credentials = {
  apiKey: "AIzaSyDtZf39QsdW1SpgNSkcqIOvolNiixcRVDo",
  authDomain: "uang-1cd90.firebaseapp.com",
  projectId: "uang-1cd90",
  storageBucket: "uang-1cd90.appspot.com",
  messagingSenderId: "367079178934",
  appId: "1:367079178934:web:4ae3c6380f264bd2699c17"
}

const config = {
    name: "Uang"
}

// const Fire = firebase;

const Fire = { database, auth, credentials, config }

export default Fire;
