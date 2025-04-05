import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { 
    this.initBookList();
  }

  booksList: { bookTitle: string; bookAuthor: string; bookISBN: string; bookQuantity: number }[] = [];
  booksCheckedOut: { bookTitle: string; bookBorrower : string; bookCheckoutDate: string }[] = [];

  getBooks() {
    console.log('From book service', this.booksList);
    return this.booksList;
  }

  getCheckedoutBooks() {
    console.log('From book service', this.booksCheckedOut);
    return this.booksCheckedOut;
  }

  returnBook(bookTitle: string) {
    this.booksCheckedOut = this.booksCheckedOut.filter(book => book.bookTitle !== bookTitle);
  }

  updateBookQuantity(bookTitle: string, newQuantity: number) {
    const book = this.booksList.find(b => b.bookTitle === bookTitle);
    if (book) {
      book.bookQuantity = newQuantity;
    }
  }  

  initBookList() {
    this.booksList = [
      { bookTitle: 'Book 1', bookAuthor: 'Author 1', bookISBN: '1234567890', bookQuantity: 10 },
      { bookTitle: 'Book 2', bookAuthor: 'Author 2', bookISBN: '1234567891', bookQuantity: 15 }
    ];
  }
}
