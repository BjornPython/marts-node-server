


fetch("/data").then(response => response.json()).then(data => {
  const parsedData = JSON.parse(data)
  let martsContainer = document.getElementById("marts-container")
  console.log("martsContainer",martsContainer);
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
  console.log("contents", contents);
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
  console.log("REMOVING MART WITH ID: ", id);
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
      console.log("DELETING FAILED...");
    }
  })
}


const editMart = (id) => {
  console.log("EDITING MART WITH ID: ", id);

  const mart = document.getElementById(id)
  const input = mart.querySelector("input")
  input.placeholder = "Update Description..."
  if (input.style.display !== "block") {input.style.display = "block"} else {input.style.display = "none"}


}

const saveEdit =  (id) => {
  const mart = document.getElementById(id)
  const pTag = mart.querySelector("p")
  const inputVal = mart.querySelector("input").value

  if (inputVal === "") {return}

   fetch("/update", {
    method: 'PATCH', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({id})
  })

  .then(response => {
    if (response.status = 200) {
      // edit new mart
      pTag.innerText = inputVal
    } else {
      // edit mart failed
    }
  })
  
}