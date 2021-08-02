import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCAt-l_HflKrkbODPAHNDyZIyn7pg7A3Us",
    authDomain: "eventplanningapp-bd87e.firebaseapp.com",
    projectId: "eventplanningapp-bd87e",
    storageBucket: "eventplanningapp-bd87e.appspot.com",
    messagingSenderId: "947851306162",
    appId: "1:947851306162:web:1ce490124a6024cabc55ab"
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}
export default Firebase;
