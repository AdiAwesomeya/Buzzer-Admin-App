import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyARNmlb8OioW5U6K6hpGqaCcLvb2v-L7vk",
  authDomain: "buzzer-app-3cd94.firebaseapp.com",
  databaseURL: "https://buzzer-app-3cd94-default-rtdb.firebaseio.com",
  projectId: "buzzer-app-3cd94",
  storageBucket: "buzzer-app-3cd94.appspot.com",
  messagingSenderId: "107489716628",
  appId: "1:107489716628:web:06f7f809631866d6a18781"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase.database()