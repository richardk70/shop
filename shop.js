'use strict'

var newHeight = 30;

init();

function addItem(){
    var itemToAdd = document.getElementById('itemField');
    if (itemToAdd.value.length >= 1){
        items.push(new Item(itemToAdd.value, 1, false));
        showList();
        newHeight += 44;
        adjustLength();
        itemToAdd.value = ""; // reset Add field
    }

}

function init(){
    adjustLength();
    // ADD button 
    var addBtn = document.getElementById('addBtn');
    // for mouse click
    addBtn.addEventListener('click', addItem );
    // for keyboard ENTER
    window.addEventListener('keydown', (e)=>{
        if (e.key==='Enter')
            addItem();
    });

    // CHECK buttons
    var checks = Array.from(document.getElementsByClassName('fa-check'));
    checks.forEach(check => check.addEventListener('click', (e)=>{
        var ID = e.target.id.slice(1);
        if (items[ID].done === false){
            items[ID].done = true; 
            check.style.color = 'grey';
        } else {
            items[ID].done = false;
            check.style.color = 'black';
        }
        showList();
        }
    ));

    // DELETE buttons
    var dels = Array.from(document.getElementsByClassName('fa-times'));
    dels.forEach(del => del.addEventListener('click', (e)=>{
        delItem(e.target.id);
    }));
}

function Item(name, quan, done){
    this.name = name;
    this.quan = quan;
    this.done = done;
};

var items = [];

function delItem(id){
    var itemID = id.slice(1);
    items.splice(itemID, 1);
    showList();
    newHeight -= 44;
    adjustLength();
}

function showList(){
    var UL = document.getElementsByTagName('ul')[0];
    var str = "";
    for (var i = 0; i < items.length; i++){
        if (items[i].done === true)
            str += `<li><span class='strike'>${items[i].name}</span>
            <span><i id='C${i}' class='fa fa-check black' aria-hidden="true"></i></span>`;
        else
            str += `<li><span class='black'>${items[i].name}</span>
            <span><i id='C${i}' class='fa fa-check grey' aria-hidden="true"></i></span>`;
        
        str += `<span><i id='X${i}' class='fa fa-times' aria-hidden="true"></i></span>
                </li>`;
            }
    UL.innerHTML = str;
    init();
}

function adjustLength(){
    const main = document.getElementById('main');
    main.style.height = newHeight + 'px';
}

