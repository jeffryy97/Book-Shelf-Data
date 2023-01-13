class Book { 
    constructor(title, author, subject, language){
        this.title = title;
        this.author = author;
        this.subject = subject;
        this.language = language;
    }
}

class UI {
    static displayBooks() {
        const books = Storage.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

// Add Books to list

    static addBookToList(book) {
        const list = document.getElementById("book-list");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.subject}</td>
            <td>${book.language}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

// Delete Books from list

    static deleteBook(target) {
        if (target.classList.contains("delete")) {
            target.parentElement.parentElement.remove();
        };
    }

// Alert message for missing, adding & removing books

    static showAlert(message, className){
        const div = document.createElement("div");
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");

        container.insertBefore(div, form);

        setTimeout(() => document.querySelector(".alert").remove(), 3000);
    }


// Clears the field after adding a new book to the list

    static clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("language").value = "";
    }
}

class Storage{
    static getBooks(){
        let books;
        if(localStorage.getItem("books") === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        } 
        return books;
    }
    static addBook(book){
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }
    static removeBook(language){
        const books = Storage.getBooks();

        books.forEach((book, index) => {
            if(book.language === language){
                books.splice(index, 1);
        }
    });
    localStorage.setItem("books", JSON.stringify(books));
    }
}


// Displays books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Text fields for "Books" description

document.querySelector('#book-form').addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const subject = document.querySelector('#subject').value;
    const language = document.querySelector('#language').value;

// Error message if the required fields are missing

    if (title === "" || author === "" || subject === "" || language === ""){
        UI.showAlert ("Please fill in all the required fields.");
    } else { 
        const book = new Book(title, author, subject, language);
        UI.addBookToList(book);
        Storage.addBook(book);
        UI.clearFields();
        UI.showAlert("Book added successfully!");

    };
    
});

// "X" button function to delete a book

document.querySelector('#book-list').addEventListener("click", (e) => {
    // console.log(e.target)
    UI.deleteBook(e.target)
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert("Book Removed")
});

