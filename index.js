let myLeads = []
const inputEl = document.getElementById("input-el")
// const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")
const pegaBtn = document.getElementById("pegaBot")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

async function requisicao(){
    const handle = 'rachellesdev'
    const response = await fetch (`https://backend.pegabot.com.br/botometer?socialnetwork=twitter&profile=${handle}&search_for=profile&limit=1`)
    const dados = await response.json()
    const profile = dados.profiles
    const botProbability = profile[0].bot_probability
    const porcentagem = botProbability.all
    const criterio = botProbability.info

    console.log(porcentagem);
    console.log(criterio);
}

pegaBtn.addEventListener('click', function(){
        let tabs = 'https://twitter.com/rachellesdev'
        tabs = tabs.split('.com/');
        tabs = tabs[1];
        console.log(tabs);
        requisicao()   
})

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
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

deleteBtn.addEventListener("dblclick", function() {
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