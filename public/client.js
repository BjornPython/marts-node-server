


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
      <p onclick="removeMart()">remove</p>
      <p onclick="editMart()">edit</p>
      </div>
    </div>
    `
  }
  console.log("contents", contents);
  martsContainer.innerHTML = contents

  });



const click123 = () => {
    console.log("IN CLICK");
    console.log(window);
  }

  

const removeMart = () => {
  console.log("REMOVING MART...");
}

const editMart = () => {
  console.log("EDITING MART...");
}