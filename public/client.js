


fetch("/data").then(response => response.json()).then(data => {
  const parsedData = JSON.parse(data)
  let martsContainer = document.getElementById("marts-container")
  console.log("martsContainer",martsContainer);
  var contents = ""

  
  for (i=0; i<parsedData.length; i++) {
    contents += `<h1>${parsedData[i].title}</h1><p>${parsedData[i].description}</p>`
  }
  console.log("contents", contents);

  martsContainer.innerHTML = contents

  });



const click123 = () => {
    console.log("IN CLICK");
    console.log(window);
  }

  
