document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4040/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };

  const randoFort = document.querySelector("#randomFortune");
  const createFortune = document.querySelector("#createFortune");
  let fortContainer = document.querySelector(".fortunes-list");
  const deleteBtn = document.querySelector("#delete-button");
  const deleteFort = document.querySelector("#delete-fortune");
  const editBtn = document.querySelector("#edit-button");
  const editFort = document.querySelector("#edit-fortune");
  const editIndex = document.querySelector("#edit-index");
  

  function getRandomFortune(){
      axios.get("http://localhost:4040/api/fortunes")
      .then(function(res) {
          const data = res.data;
          alert(data);
      })
  }

  function createFortunesList(fortune){
        let listOfFortunes = document.createElement('div');
        listOfFortunes.innerHTML = `<h2> ${fortune}</h2>`
          
          fortContainer.appendChild(listOfFortunes);
  }

  function getAllFortunes(){
      axios.get("http://localhost:4040/api/allfortunes")
      .then(function (res){
          let allFortunes = res.data;
          console.log(allFortunes);
          for (let i = 0; i < allFortunes.length; i++){
            createFortunesList(allFortunes[i]);
          }
      })
  }
  
  function addFortune(){
      //console.log(body);
      fortContainer.innerHTML = '';
      let fortuneText = document.querySelector("#newFortune");
      let body = {
          fortune: fortuneText.value
      }
      axios.post("http://localhost:4040/api/fortunes", body)
      .then(function (res){
          console.log(res.data);
        getAllFortunes();
      })
      fortuneText.value = '';
  }

  function deleteFortune(fortune){
    fortContainer.innerHTML = '';
    let index = deleteFort.value;
    console.log(index);
    axios.delete(`http://localhost:4040/api/fortunes/${index}`)
    .then(function (res){
        getAllFortunes();
    })
  }

  function fortuneEditor(){
    fortContainer.innerHTML = '';
    let fortuneText = document.querySelector("#edit-fortune");
    let body = {
        fortune: fortuneText.value
    }
    //console.log(body);
    let index = editIndex.value;
    console.log(index);
    axios.put(`http://localhost:4040/api/fortunes/${index}`, body)
    .then(function(res) {
        getAllFortunes();
        alert("Change has been made");
    })
  }

  getAllFortunes();
  randoFort.addEventListener("click", getRandomFortune)
  createFortune.addEventListener("click", addFortune);
  deleteBtn.addEventListener("click", deleteFortune);
  editBtn.addEventListener("click", fortuneEditor);