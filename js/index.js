const init = () => {
    console.log('Window loaded')
    view.setActiveScreen('registerScreen')
}
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBLAxZNkk361mYaX4KN3S4-SX3alcSxO9A",
    authDomain: "chat-app-953be.firebaseapp.com",
    databaseURL: "https://chat-app-953be.firebaseio.com",
    projectId: "chat-app-953be",
    storageBucket: "chat-app-953be.appspot.com",
    messagingSenderId: "998116278111",
    appId: "1:998116278111:web:e08dc5710b1f15e48180ea"
  };


  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase.app().name)
// document.addEventListener('click',function goToRegister () {
//     view.setActiveScreen('registerScreen');
// },
//     document.addEven4sstListener('click',function goToLogin() {
//         view.setActiveScreen('loginScreen');
//     })
// )
// firestoreFunction()


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (user.emailVerified){
      model.currentUser = {
        displayName: user.displayName,
        email: user.email
      }
      view.setActiveScreen('introScreen')         
    } else {
      view.setActiveScreen('loginScreen')
      alert('Please verify your email first')
    }
    // User is signed in.
  } else {
    view.setActiveScreen('loginScreen')
  }
})


async function firestoreFunction (){
  // get one document
  const documentId = 'tb3ictuqkMcUtPBDRzHw'
  const response = await firebase.firestore().collection('users').doc(documentId).get()
  const user = getDataFromDoc(response)
  console.log(user)
  // user.id = response.id 
  // console.log(user)
  // get many documents
  const response2 = await firebase.firestore().collection('users').where('age','==',20).get()
  // console.log(response2)
  const listUser = getDataFromDocs(response2.docs)
  console.log(listUser)
  // add document
  const userToAdd = {
    name: 'ABC',
    age: 23,
    email: 'abcxyz@gmail.com'
  }
  // firebase.firestore().collection('users').add(userToAdd)

  // update document
  documentIdUpdate = 'nSMkLTBSsltnUW74Kugb'
  const dataToUpdate = {
    name: 'Nguyễn Hải Phong'
  }
  firebase.firestore().collection('users').doc(documentIdUpdate).update(dataToUpdate)
  //delete document
  const docToDelete = 'tYzEg8dn0AtWdW3AUSAa'
  firebase.firestore().collection('users').doc(docToDelete).delete()
}

function goToRegister() {
    document.getElementById('redirect-to-register').style.color = "red";
    view.setActiveScreen('registerScreen')
}
function goToLogin() {
    document.getElementById('redirect-to-login').style.color = "red";
    view.setActiveScreen('loginScreen')
}
function goToChat() {
   document.getElementById('redirect-to-chat').style.color = "red";
   view.setActiveScreen('chatScreen')
}
window.onload = init

getDataFromDoc = (doc) => {
  const data = doc.data() 
  data.id = doc.id
  return data
}
getDataFromDocs = (docs) => {
  return docs.map(item => getDataFromDoc(item))  
}
