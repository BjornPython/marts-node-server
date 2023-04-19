


fetch("/data").then(response => response.json()).then(data => {
  const parsedData = JSON.parse(data)
  let martsContainer = document.getElementById("marts-container")
  var contents = ""

  
  for (i=0; i<parsedData.length; i++) {
    contents += `
    <div class="mart-ctr" id="${parsedData[i].id}">
      <h1>${parsedData[i].title}</h1>
      <p>${parsedData[i].description}</p>
      <input/>
      <div class="edit-container">
      <p onclick="removeMart('${parsedData[i].id}')">remove</p>
      <p onclick="editMart('${parsedData[i].id}')">edit</p>
      <p onclick="saveEdit('${parsedData[i].id}')">save</p>

      </div>
    </div>
    `
  }
  martsContainer.innerHTML = contents

  });



const submitNewMart = () => {
  const title = document.getElementById("title")
  const description = document.getElementById("description")

  fetch("/create", {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({title: title.value, description: description.value})
  })
  .then(response => {if (response.status === 200) {return response.json()}})
  .then(data => {
    // If success, add the martial art to DOM
    let martsContainer = document.getElementById("marts-container")
    martsContainer.innerHTML += `
    <div class="mart-ctr" id="${data.id}">
      <h1>${data.title}</h1>
      <p>${data.description}</p>
      <input />
      <div class="edit-container">
        <p onclick="removeMart('${data.id}')">remove</p>
        <p onclick="editMart('${data.id}')">edit</p>
        <p onclick="saveEdit('${data.id}')">save</p>
      </div>
    </div>
    `
  })
  }

  

const removeMart = (id) => {
  fetch("/delete", {
    method: 'DELETE', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({id})
  })
  .then(response => {
    if (response.status = 200) {
      // delete mart
      const mart = document.getElementById(id)
      mart.remove()
    } else {
      // del mart failed
    }
  })
}


const editMart = (id) => {

  const mart = document.getElementById(id)
  const input = mart.querySelector("input")
  const editBtn = mart.querySelector(".edit-container p:nth-child(2)")
  input.placeholder = "Update Description..."
  if (input.style.display !== "block") {
    input.style.display = "block"; 
    editBtn.innerText = "cancel"
  } 
  else {input.style.display = "none"; editBtn.innerText = "edit"}


}

const saveEdit =  (id) => {

  const mart = document.getElementById(id)
  const pTag = mart.querySelector("p")
  const title = mart.querySelector("h1").innerText
  const input = mart.querySelector("input")
  const newDesc = input.value

  if (newDesc === "") {return}

   fetch("/update", {
    method: 'PATCH', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({id, title, newDesc})
  })
  .then(response => {
    if (response.status = 200) {
      // edit new mart
      pTag.innerText = newDesc
      input.style.display = "none"
      input.value = ""
    } else {
      // edit mart failed
    }
  })
  
}