import firebase from 'firebase';

//AQUÍ COPIAS Y PEGAS LO QUE TE DAN
const config = {
    apiKey: "AIzaSyBTE76wsLfSTXV4PJ_z8HcqIt8HpyXJI2Q",
    authDomain: "weruntogether-edaee.firebaseapp.com",
    databaseURL: "https://weruntogether-edaee.firebaseio.com",
    projectId: "weruntogether-edaee",
    storageBucket: "",
    messagingSenderId: "536842306395",
    appId: "1:536842306395:web:9875ab1efb6d4ef3"
};

const firebaseInit = firebase.initializeApp(config)

export default firebaseInit
