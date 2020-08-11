let registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", sendData);

function sendData(e){
  e.preventDefault();

  let formData = new FormData(registerForm);

  let Params = {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      image: formData.get('image')
    }),
    method: "POST"
  }

  fetch('https://storedoor.herokuapp.com/register/send', Params)
  .then(response => response.json())
  .then(data => {
    if(data.success === "Sent"){
      let error = document.querySelector('.error');
      error.innerHTML = "";
      document.querySelector('.errorContainer').style.display = "none";
      window.location.href = "https://storedoor.herokuapp.com/products";
    }else{

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
