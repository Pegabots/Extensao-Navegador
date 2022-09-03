let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")
const pegaBtn = document.getElementById("pegaBot")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

const dados = [
        {
            avatar: "https://user-images.githubusercontent.com/102765815/188288761-00166d5f-a014-48b1-9f62-54480b3edb5e.png",
            all: 18,
            info: "<p>Um dos critérios que mais teve peso na análise foi o índice Temporal</p>"
        },   
    
        {
            avatar: "https://user-images.githubusercontent.com/102765815/188288761-00166d5f-a014-48b1-9f62-54480b3edb5e.png",
            all: 74,
            info: "<p>Um dos critérios que mais teve peso na análise foi o índice Temporal</p>"
        }, 
    
        {
            avatar: "https://user-images.githubusercontent.com/102765815/188288761-00166d5f-a014-48b1-9f62-54480b3edb5e.png",
            all: 33,
            info: "<p>Um dos critérios que mais teve peso na análise foi o índice de Sentimento</p>"
        },

        {
            avatar: "https://user-images.githubusercontent.com/102765815/188288761-00166d5f-a014-48b1-9f62-54480b3edb5e.png",
            all: 57,
            info: "<p>Um dos critérios que mais teve peso na análise foi o índice Temporal</p>"
        },

        {
            avatar: "https://user-images.githubusercontent.com/102765815/188288761-00166d5f-a014-48b1-9f62-54480b3edb5e.png",
            all: 86,
            info: "<p>Um dos critérios que mais teve peso na análise foi o índice Temporal</p>"
        },

        {
            avatar: "https://user-images.githubusercontent.com/102765815/188288761-00166d5f-a014-48b1-9f62-54480b3edb5e.png",
            all: 29,
            info: "<p>Um dos critérios que mais teve peso na análise foi o índice de Sentimento</p>"
        },
    ];

// async function requisicao(i){
//     const response = await fetch (https://backend.pegabot.com.br/botometer?socialnetwork=twitter&profile=${i}&search_for=profile&limit=1`)
//     const dados = await response.json()
//     const profile = dados.profiles
//     const botProbability = profile[0].bot_probability
//     const porcentagem = Math.ceil(botProbability.all * 100)
//     const criterio = botProbability.info

//     document.getElementById('porcentagem').innerHTML = porcentagem
//     document.getElementById('info').innerHTML = criterio

//     console.log(porcentagem);
//     console.log(criterio);
// }

pegaBtn.addEventListener('click', function () {
    let input = inputEl.value
    console.log(input)
    // requisicao(input)

    const index = Math.floor(Math.random() * 7)
    
    const porcentagem = dados[index].all
    const criterio = dados[index].info
    const foto = dados[index].avatar

    document.getElementById('porcentagem').innerHTML = porcentagem + '%'
    document.getElementById('info').innerHTML = criterio
    document.querySelector('#img').innerHTML = `<br><img width="70px" height="70px" src="${foto}">`;
})

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

// inputBtn.addEventListener("click", function() {
//     myLeads.push(inputEl.value)
//     inputEl.value = ""
//     localStorage.setItem("myLeads", JSON.stringify(myLeads) )
//     render(myLeads)
// })