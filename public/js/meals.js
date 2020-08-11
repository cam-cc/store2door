let form = document.querySelector("#create-meal-form");

form.addEventListener("submit", sendData);

function sendData(e){
  e.preventDefault();

  let formData = new FormData(form);

  let Params = {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name : formData.get('name'),
      price : formData.get('price'),
      desc : formData.get('desc'),
      category : formData.get('category'),
      qty : formData.get('qty;'),
      image : formData.get('image')
    }),
    method: "POST"
  }

  fetch('https://storedoor.herokuapp.com/meals/add', Params)
  .then(response => response.json())
  .then(data => {
    if(data.success === "Sent"){
      let error = document.querySelector('.error');
      error.innerHTML = "";
      document.querySelector('.errorContainer').style.display = "none";
      window.location.href = "https://storedoor.herokuapp.com/products";
    }else if(data.success === "fail"){
    let error = document.querySelector('.error');
    error.innerHTML = "";
    document.querySelector('.errorContainer').style.display = "block";

    data.errors.forEach((err) => {
      error.innerHTML += `<li>${err.msg}</li>`;
    });
  }
    console.log(data);
  })
  .catch(err => console.log(err));
}
