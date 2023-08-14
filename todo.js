

let todos = []
const ul = document.getElementById('todoList')

// random id generator

function randomId() {

    return Math.floor(Math.random() * 100000)

}

// todo eklendiğinde 

function addTodo() {

    const inputValue = document.getElementById('todoInput');
    console.log("data:", inputValue.value)

    // todoObject

    const todoObject = {

        id: randomId(),
        icerik: inputValue.value

    }


    // local'e kayıt et
    localStorage.setItem("todos", JSON.stringify([...todos, todoObject]))

    // local belleğe gönder
    todos.push(todoObject)
    console.log('local bellek:', todos)

    // fonksiyonu çağırsın
    writeContent(todos)

    // fonksiyonu çağırdıktan sonra inputu boşaltsın
    inputValue.value = ""
}





function writeContent(data) {
    // önceki ul'u temizle
    ul.innerHTML = "";

    todos.map((data) => {


        const deleteItem = `<button class='btn btn-danger ms-5' onclick='removeTodos(this, ${data.id})'><i class="bi bi-trash3"></i></button>`

        const updateItem = `<button class='btn btn-info ms-1' onclick='updateTodos(this, ${data.id})'><i class="bi bi-pencil-fill"></i></button>`

        ul.innerHTML += `<li>${data.icerik} ${deleteItem} ${updateItem} </li>`


    })
}



// todo silen fonksiyon
function removeTodos(buttonTag, id) {

    const onayla = confirm("Bu ögeyi silmek istediğinizden emin misiniz?");

    if (onayla) {
        //filter işlemi yap (local bellekten sil)
        todos = todos.filter((todo) => todo.id != id)

        //front end olarakta sil
        buttonTag.parentNode.remove()

        //local storage'den sil
        localStorage.setItem("todos", JSON.stringify(todos))
    }

}



function updateTodos(buttonTag, id) {

    let todo;
    // Local Belleği Güncelle
    todos = todos.filter((todo) => todo)
    todo = todos.find((todo) => todo.id === id) // Obje dönecek buradan

    if (todo) {

        const newContent = prompt("İçeriği Güncelle")

        if (newContent) {

            todo.icerik = newContent
            //front endde ki veriyi güncelle
            writeContent(todos)


        }

        //Localstorage güncelle
        localStorage.setItem("todos", JSON.stringify(todos))
    }


}



// sayfa yüklendiği zaman todos local belleğe verileri gönder

window.onload = function () {

    // Locali çek
    const cachedTodos = JSON.parse(localStorage.getItem("todos"))

    if (!cachedTodos) {
        return;
    }

    // Local varsa arayin içine ekle

    todos.push(...cachedTodos)
    console.log("Local Belleğimiz", todos)

    // write contenti çağır ve locale yazdir
    // todos.map((todo) => writeContent(todo))
    writeContent(todos)



}