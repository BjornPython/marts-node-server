const displayMart = (data) => { // Returns a div that displays the martial art.
  return `
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
}

// Fetches and displays the Initial data.
const query = `
{
  martialArts {
    id
    title
    description
  }
}
`;

fetch("/graphql", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }), })
  .then(async res => {
    const response = await res.json()
    parsedData = response.data.martialArts
    let martsContainer = document.getElementById("marts-container")
    var contents = "" // All the martial arts.

    for (i = 0; i < parsedData.length; i++) {
      contents += displayMart(parsedData[i])
    }

    martsContainer.innerHTML = contents // Set Contents of DOM

  });



const submitNewMart = (e) => { //Submit new martial art's form values.
  e.preventDefault()
  const title = document.getElementById("title").value
  const description = document.getElementById("description").value


  console.log("TITLE DESC: ", title, description);

  const query = `mutation CreateMartialArt($input: CreateMartialArtInput) {
    createMartialArt(input: $input) {
      title
      description
    }
  }`

  const body = JSON.stringify({ query, variables: { input: { title, description } } })

  console.log("BODY: ", body);

  fetch("/graphql", { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: "application/json" }, body })

    .then(response => response.json()) // Add martial art to DOM if success.
    .then(data => {
      const createdData = data.data.createMartialArt
      let martsContainer = document.getElementById("marts-container")
      martsContainer.innerHTML += displayMart(createdData)
    })
}



const removeMart = (id) => { // Requests a DELETE request to server

  const query = `
  mutation DeleteMartialArt($input: DeleteMartialArtInput) {
    deleteMartialArt(input: $input) {
      id
    }
  }
  `

  const body = JSON.stringify({ query, variables: { input: { id } } })


  fetch("/graphql", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
    .then(response => {
      if (response.status = 200) {
        // delete mart from DOM if success
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
  else { input.style.display = "none"; editBtn.innerText = "edit" }
}

const saveEdit = (id) => {

  const mart = document.getElementById(id)
  const pTag = mart.querySelector("p")
  const input = mart.querySelector("input")
  const newDesc = input.value

  if (newDesc === "") { return } // If input is empty, cancel update request

  const query = `
  mutation UpdateMartialArt($input: UpdateMartialArtInput) {
    updateMartialArt(input: $input) {
      id
      title
      description
    }
  }
  `


  const body = JSON.stringify({ query, variables: { input: { id, description: newDesc } } })

  fetch("/graphql", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }) // Call server to update
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

const sendgql = async () => {
  console.log("EY");

  const query = `
    {
      martialArts {
        id
        title
        description
      }
    }
  `;

  const response = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();

  console.log("RES: ", data);
};