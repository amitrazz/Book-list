//book constructor
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI(){
   
  //  Add book ui
   UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="" class="delete">x</a></td>
    `;
    list.appendChild(row);
    
   } 
   //Show Alert UI
   UI.prototype.showAlert = function(message, className){
       const div = document.createElement('div');
       div.className = `alert ${className}`;
       div.appendChild(document.createTextNode(message));
       const container = document.querySelector('.container');
       const form = document.querySelector('#book-form');
       container.insertBefore(div, form);
       setTimeout(function(){
           document.querySelector('.alert').remove()
       },3000);
   }
   //delete book
   UI.prototype.deleteBook = function(target){
       if(target.className === 'delete'){
           target.parentElement.parentElement.remove();
       }
   
   }
   //clear UI
   UI.prototype.clearfields = function(){
       document.getElementById('title').value = '';
       document.getElementById('author').value = '';
       document.getElementById('isbn').value = '';
   }
   
}
//event lister to add
document.getElementById('book-form').addEventListener('submit',function(e){
    const addBook = document.querySelector('#book-form').value;
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    
    const book = new Book(title,author,isbn);
    
    //int Ui
    const ui = new UI();
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('please fill all fields','error');
    }else{
        ui.addBookToList(book);
        ui.showAlert('book added','success');
        //clear field
        ui.clearfields(); 
    }
    
    e.preventDefault();
});
//event listener for delete
document.getElementById('book-list').addEventListener('click',function(e){
     const ui = new UI();
     ui.deleteBook(e.target);
    ui.showAlert('book removed','success');
    
    e.preventDefault();
});

