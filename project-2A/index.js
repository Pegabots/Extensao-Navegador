const form = document.querySelector("#form");
const reportPage = document.querySelector(".report-page");

function sendForm(event){
  event.preventDefault();
  const btnForm = document.querySelector(".form_btn");
  btnForm.disabled = true;

  form.classList.add("hidden");
  reportPage.classList.add("active");

  // getPegabotAPI()
}

form.addEventListener("submit", sendForm);

// async function getPegabotAPI(user){ 
//   try{
//   const response = await fetch(`url da api ${user}`);
//     if(response.ok){
//      //(Opcional) form.innerHTML = `<p class="result-text">Resultado</p>`
//         form.classList.add("hidden");
//         reportPage.classList.add("active");
//       } else {
//         alert("Digite algum usuário!");
//       }
//     }
//   catch(err){
//     console.error("a requisição não foi bem-sucedida", err);
// }

sendForm();