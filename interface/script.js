var lastTenAccessesArray = []

class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null
        this.last = null
        this.size = 0
      }
      enqueue(value){
        let newNode = new Node(value)
        if(this.first === null){
            this.first = newNode
        }else{
            let current = this.first
            while(current.next != null){
                current = current.next
            }
            current.next = newNode
        }
        this.size++
    }
    dequeue(){
        let current = this.first
        this.first = current.next
        this.size--
        return current.value
    }
    find(position){
        let current = this.first
        let cont = 0
        if(current.value === null){
            return null
        }
        while (cont < position) {
            current = current.next
            cont++
        }
        return current.value
    }
}

var url
function getURL(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        url = tab.url;
      });
}

var accessesQueue = new Queue()
chrome.tabs.onUpdated.addListener(() => {
    getURL()
    if(String(url) != "undefined" ){
        var auxNodeValue
        if(accessesQueue.size == 0){
            auxNodeValue = null
        }else{
            auxNodeValue = accessesQueue.find(accessesQueue.size - 1)
        }
        if(String(url) != auxNodeValue && !(auxNodeValue == null && accessesQueue.size > 0)){
            if(accessesQueue.size == 10){
                accessesQueue.dequeue()
                accessesQueue.enqueue(String(url))
            }else{
                accessesQueue.enqueue(String(url))
                URLStorage()
            }
        }
    }
})

function URLStorage(){
    for (let i = 0; i < accessesQueue.size; i++) {
        if(accessesQueue.find(i) === null){
            lastTenAccessesArray[i] = null
        }else{
            lastTenAccessesArray[i] = accessesQueue.find(i)
        }
    }
}


