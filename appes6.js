class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI {
    addBookToList(book){
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
    showAlert(message,className){
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
    deleteBook(target){
         if(target.className === 'delete'){
           target.parentElement.parentElement.remove();
         }
        
    }
    clearfields(){
       document.getElementById('title').value = '';
       document.getElementById('author').value = '';
       document.getElementById('isbn').value = '';
    }
}
//LOCAL STORAGE CLASS
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
           books = []; 
        }else{
           books = JSON.parse(localStorage.getItem('books')); 
        }
        return books;
    }
    static displayBooks(){
       const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI;
            ui.addBookToList(book);
        });
        
        

    }
   static addBooks(book){
       const books = Store.getBooks();
       books.push(book);
       localStorage.setItem('books',JSON.stringify(books));
    }
   static deleteBooks(isbn){
    const books = Store.getBooks();
       books.forEach(function(book,index){
           if(book.isbn === isbn){
               books.splice(index,1);
           }
       });
    localStorage.setItem('books',JSON.stringify(books));

    }
}
//Domload Event Load
document.addEventListener('DOMContentLoaded',Store.displayBooks);
//event lister to add
document.getElementById('book-form').addEventListener('submit',function(e){
    const addBook = document.querySelector('#book-form').value;
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    
    const book = new Book(title,author,isbn);
    
    //int Ui
    const ui = new UI;
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('please fill all fields','error');
    }else{
        ui.addBookToList(book);
        Store.addBooks(book);
        ui.showAlert('book added','success');
        //clear field
        ui.clearfields(); 
    }
    
    e.preventDefault();
});
//event listener for delete
document.getElementById('book-list').addEventListener('click',function(e){
    const ui = new UI;
    ui.deleteBook(e.target);
    //remove books from ls
    Store.deleteBooks(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('book removed','success');
    
    e.preventDefault();
});