window.onload = function() {
    AccessingListItems()
};

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const closeTodo = ()=> {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('form-section').style.display = 'none';
}
 const  displayNewItemDialogue =()=> {
    document.getElementById('todo-input').value = "";
    document.getElementById('dueDateInput').value = "";
    
    const form = document.getElementById('form-container');
    const formSection = document.getElementById('form-section');
    console.log(form);
    form.style.display = 'flex';
    formSection.style.display = 'flex';
    formSection.style.justifyContent = 'center';
}

const submitForm = (e) => {
    e.preventDefault();

    const item = document.getElementById("todo-input").value;
    const dueDate = document.getElementById('dueDateInput').value;
    const isChecked = false;
    const   id = generateUUID();

    window.firebaseAPIs.addTodoToDB({item, dueDate, isChecked, id});

    closeTodo();
    AccessingListItems();
}

// window.querySnapshot.map((doc) => {
//     console.log(`${doc.id} => ${doc.data().item}`);
//   });


// sending id for the document to delete to index.js
function deleteItem (deletingItemId){
    window.firebaseAPIs.deleteTodoItem(deletingItemId);
    // console.log(todoId);
    AccessingListItems();
}

//accessing the data from index.js 
const AccessingListItems = async ()=>{
const receiveData = await window.firebaseAPIs.getData();
console.log(receiveData)



function listItems() {
    let list = "";
     receiveData.forEach((doc, index) => {
      let currentDate = new Date();
      let dueDate = new Date(doc.dueDate);
      let difference = dueDate - currentDate;
      let daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24));
      // let taskFile = "<span>" + item.file.dataURL + "</span>";
  
      list += "<li class='todo-item' id='todo-item-" + index + "'>" +
        "<div><input class='checkbox' type='checkbox' onclick='taskCompleted(" + index + ")' " + (doc.isChecked ? "checked" : "") + " /> " +
        doc.item +
        "</div>" +
        "<span class='dueDate'>" + daysRemaining + " days remaining</span>" +
      //   "<div class = 'fileImage'><img src='" + item.file.dataURL + "' alt='" + item.file.name + "'></div>" +
        "<button onclick='openUpdateDialog(\"" + doc.id + "\"," + index + ")' class='update'>Update</button>" +
        "<button onclick='deleteItem(\"" + doc.id + "\")' class='remove'>Remove</button></li>";
    });
    document.getElementById("todo-list").innerHTML = list;
  }


  listItems();
}

const openUpdateDialog = async(updateItemId, index)=> {
  const receiveData = await window.firebaseAPIs.getSingleData(updateItemId);
  console.log(receiveData)
  // console.log(updateItemId);
  document.getElementById("update-input").value = receiveData.item;
  document.getElementById("update-dueDate").value = receiveData.dueDate;
  document.getElementById("update-section").style.display = "flex";
  document.getElementById("update-section").setAttribute("data-index", index);
}

function closeUpdateDialog() {
  document.getElementById("update-section").style.display = "none";
  // document.getElementById("update-form-container").style.display = "none";
}

const updateItem = async (event) => {

  event.preventDefault();
  const receiveData = await window.firebaseAPIs.getData();
  console.log(receiveData);

  let updateInputValue = document.getElementById("update-input").value;
  let updateDueDateValue = document.getElementById("update-dueDate").value;

  let index = parseInt(document.getElementById("update-section").getAttribute("data-index"));

  receiveData[index].item = updateInputValue;
  receiveData[index].dueDate = updateDueDateValue;
  console.log(receiveData[index]);

  window.firebaseAPIs.updateToDB(receiveData[index]);

  AccessingListItems();
  closeUpdateDialog();
};

 