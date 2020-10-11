import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDpAUQ1_s0Eo9uLdYh8M6qmEZlu3o3SvCY",
  authDomain: "whatsapp-clone-8cf01.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-8cf01.firebaseio.com",
  projectId: "whatsapp-clone-8cf01",
  storageBucket: "whatsapp-clone-8cf01.appspot.com",
  messagingSenderId: "190935669069",
  appId: "1:190935669069:web:c4b5cb5461231c2af03f04",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
