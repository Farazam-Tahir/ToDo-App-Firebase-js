import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkHSOaDRxOx492uxna0GTgkHW5e8Of4UY",
  authDomain: "todo-list-b08c5.firebaseapp.com",
  projectId: "todo-list-b08c5",
  storageBucket: "todo-list-b08c5.appspot.com",
  messagingSenderId: "29387370279",
  appId: "1:29387370279:web:7e6d6b66ae32b0c1414302",
  measurementId: "G-1L9Q0BB0T6",
};


const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
// const documentIds = [];


// receciving data from functions.js and sending to database
const addTodoToDB = async (data) => {

  const docRef = await setDoc(doc((collection(database, "todo")), data.id), { ...data }).then(function() {
    console.log("Todo item successfully added!");
  }).catch(function(error) {
    console.error("Error adding todo item: ", error);
  });
  // try {
  //   data.id = generateUUID();

  //   // Create a reference to the collection
  //   const todoCollectionRef = collection(database, "todo");

  //   // Create a reference to the document with the custom ID
  //   const todoDocRef = doc(todoCollectionRef, data.id);

  //   // Add the document to the collection with the specified custom ID and data
  //   await setDoc(todoDocRef, data);

  //   console.log("Document added with custom ID:", data.id);
  // } catch (error) {
  //   console.error("Error adding document:", error);
  // }
};

const updateToDB = async (data) => {
  try {
    await setDoc(doc(collection(database, "todo"), data.id), { ...data });
    console.log("Todo item successfully updated!");
  } catch (error) {
    console.error("Error updating todo item: ", error);
  }
};

// receiving data from database
const getData = async () => {
  const querySnapshot = await getDocs(collection(database, "todo"));
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
  });
  return data;
};

const getSingleData = async (docId) => {
  const userDocument = await getDoc(doc(database, "todo", docId));
  // console.log(userDocument.data());
  return userDocument.data();
  // try {
  //   // Create a reference to the document with the provided document ID
  //   const todoDocRef = doc(database, "todo", docId);

  //   // Get the document snapshot
  //   const docSnap = await getDoc(todoDocRef);

  //   // Check if the document exists
  //   if (docSnap.exists()) {
  //     // Document exists, return the document data
  //     return docSnap.data();
  //   } else {
  //     // Document does not exist
  //     console.log("Document does not exist");
  //     return null;
  //   }
  // } catch (error) {
  //   console.error("Error getting document:", error);
  //   return null;
  // }
};


// receiving document id to delete it, from index.js
const deleteTodoItem = async (todoDeleteId) =>{

  const deleteDocument = await deleteDoc(doc(database, "todo", todoDeleteId)).then(function() {
    console.log("Todo item successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing todo item: ", error);
  });
}

window.firebaseAPIs = { addTodoToDB, getData, deleteTodoItem, getSingleData, updateToDB };

// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data().item}`);
// });

// const addTodo = ()=>{
//     let item = document.getElementById("todo-input").value;
//     let dueDate = document.getElementById('dueDateInput').value;
//     let isChecked = false;
//     let   id = Math.random() * 100;
//     // let fileInput = document.getElementById('fileInput');
//     // let file = fileInput.files.length > 0 ? fileInput.files[0] : null; // Check if a file is selected
//     if (item === "") {
//       return alert('Something is missing');
//     } else {
//         addTodoToDB(item,dueDate,isChecked,id);
//     }
// };
