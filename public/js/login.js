let form = document.querySelector(".login-form");

form.addEventListener("submit", sendData);

function sendData(e){
  e.preventDefault();

  let formData = new FormData(form);

  let Params = {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password'),
    }),
    method: "POST"
  }

  fetch('https://storedoor.herokuapp.com/login/send', Params)
  .then(response => response.json())
  .then(data => {
    if(data.success === "Sent"){
      let error = document.querySelector('.error');
      error.innerHTML = "";
      document.querySelector('.errorContainer').style.display = "none";
      if (data.isClerk === false) {
        window.location.href = "https://storedoor.herokuapp.com/dashboard";
      } else {
        window.location.href = "https://storedoor.herokuapp.com/clerkdashboard";
      }
    }else if(data.success === "fail"){
      let error = document.querySelector('.error');
      error.innerHTML = "";
      document.querySelector('.errorContainer').style.display = "block";
      error.innerHTML += `<li> Invalid email Or Password</li>`;
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
