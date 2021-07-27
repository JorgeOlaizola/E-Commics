import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCFAqyyPkQuzgIqGfZx67Of35wXrJhx-DM",
    authDomain: "e-commics.firebaseapp.com",
    projectId: "e-commics",
    storageBucket: "e-commics.appspot.com",
    messagingSenderId: "613947952315",
    appId: "1:613947952315:web:d3d89493f0f75eacef6d9e",
    measurementId: "G-6L22DWGZYS"
  };

  !firebase.apps.length &&
  firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  const {displayName, email, photoURL } = user
  
  return {
    avatar: photoURL,
    username: displayName,
    email,
    hola: "hola"
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase
    .auth()
    .onAuthStateChanged(user => {
      const normalizedUser = mapUserFromFirebaseAuthToUser(user)
      onChange(normalizedUser)
    })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
}

export const onCloseSession = ()=> {
  return firebase.auth().signOut()
} 