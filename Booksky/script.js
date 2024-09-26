var overlay = document.querySelector('.Overlay');
var popupbox = document.querySelector('.poupbox');
var addpopupbutton = document.getElementById('addpopupbutton');
var cancel = document.getElementById('Cancel');

var addbook = document.getElementById('addbook');
var container = document.querySelector('.container');
var booktitle = document.getElementById('booktitle');
var bookauthor = document.getElementById('bookauthor');
var bookdescription = document.getElementById('bookdescription');

var Delete = document.getElementById('delete');

addpopupbutton.addEventListener('click',function(){
    overlay.style.display = 'block'
    popupbox.style.display = 'block'
})
cancel.addEventListener('click',function(event)
{
    event.preventDefault();
    overlay.style.display = 'none'
    popupbox.style.display = 'none'
})

addbook.addEventListener('click',function(event){
    event.preventDefault();

    if (!booktitle.value || !bookauthor.value || !bookdescription.value) {
        alert("Please fill in all fields.");
        return;
    }

    var div = document.createElement('div');
    div.setAttribute('class','book-container');

    div.innerHTML = `
        <h2>${booktitle.value}</h2>
        <h3>${bookauthor.value}</h3>
        <p>${bookdescription.value}</p>
        <button onclick="deletee(event)">Delete</button>
    `

    container.append(div);
    overlay.style.display = 'none'
    popupbox.style.display = 'none'

    booktitle.value = "";
    bookauthor.value = "";
    bookdescription.value = "";
})

function deletee(event){
    event.target.parentElement.remove();
}