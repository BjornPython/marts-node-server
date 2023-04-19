


fetch("/data").then(response => response.json()).then(data => {
  const parsedData = JSON.parse(data)
  let martsContainer = document.getElementById("marts-container")
  console.log("martsContainer",martsContainer);
  var contents = ""

  
  for (i=0; i<parsedData.length; i++) {
    contents += `
    <div class="${parsedData[i].title}">
      <h1>${parsedData[i].title}</h1>
      <p>${parsedData[i].description}</p>
      <div class="edit-container">
      <p onclick="removeMart(${parsedData[i].id})">remove</p>
      <p onclick="editMart(${parsedData[i].id})">edit</p>
      </div>
    </div>
    `
  }
  console.log("contents", contents);
  martsContainer.innerHTML = contents

  });



const submitNewMart = () => {
  console.log("IN CLICK");
  const title = document.getElementById("title")
  const description = document.getElementById("description")

  console.log("FORMS: ", title.value, description.value);
  fetch("/create", {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({title: title.value, description: description.value})
  })
  .then(response => {if (response.status === 200) {return response.json()}})
  .then(data => {
    
    let martsContainer = document.getElementById("marts-container")

    martsContainer.innerHTML += `
    <div class="${data.title}">
      <h1>${data.title}</h1>
      <p>${data.description}</p>
      <div class="edit-container">
        <p onclick="removeMart(${data.id})">remove</p>
        <p onclick="editMart(${data.id})">edit</p>
      </div>
    </div>
    `
  })
  }

  

const removeMart = (id) => {
  console.log("REMOVING MART WITH ID: ", id);
  fetch("/delete", {
    method: 'DELETE', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({id})
  })
  .then(response => {
    if (response.status = 200) {
      // delete mart
    } else {
      // del mart failed
    }
  })
}

const editMart = (id) => {
  console.log("EDITING MART WITH ID: ", id);
  fetch("/update", {
    method: 'PATCH', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({id})
  })
  .then(response => {
    if (response.status = 200) {
      // edit new mart
    } else {
      // edit mart failed
    }
  })
}