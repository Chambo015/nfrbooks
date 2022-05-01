import data from "./data.js"
import Storage from "./storage.js";


class UI {
    static booksGrid = document.querySelector('.books-grid');

    static setBookItem() {
        let quantityBooks = data.booksArray.length


        data.booksArray.forEach(([bookName, url], index, arr) => {
            let bookElem = document.createElement('div')
            bookElem.classList.add('book-item')
            bookElem.id = "book_" + index;

            let img = new Image();
            img.src = url;

            let p = document.createElement('p')
            p.classList.add('title');
            p.textContent = p.title = img.alt = img.title = bookName;

            let countDiv = document.createElement('div')
            countDiv.classList.add('count-wrap')

            let btnDecrement = document.createElement('i'),
                btnIncrement = document.createElement('i'),
                numberCount = document.createElement('p');

            btnDecrement.classList.add('fa-solid', 'fa-circle-minus')
            btnIncrement.classList.add('fa-solid', 'fa-circle-plus');
            numberCount.classList.add('book-count')
            numberCount.innerHTML = Storage.getCount(bookName) || 0

            countDiv.append(btnDecrement, numberCount, btnIncrement)
            bookElem.append(img, p, countDiv)
            UI.booksGrid.append(bookElem)

            if (Storage.getCount(bookName) > 0) {
                bookElem.classList.add('greenBg')
            }

            btnIncrement.addEventListener('click', () => {
                let num = +numberCount.textContent;
                num++
                numberCount.textContent = num;
                Storage.setCount(bookName, num);
                UI.showBooksInArea('have');
                UI.showBooksInArea('need');
                UI.showBooksInArea('trade')
                if (!bookElem.classList.contains('greenBg')) {
                    bookElem.classList.add('greenBg')
                }
            })
            btnDecrement.addEventListener('click', () => {
                let num = +numberCount.textContent;
                num <= 0 ? undefined : num--
                numberCount.textContent = num;
                Storage.setCount(bookName, num);
                UI.showBooksInArea('have');
                UI.showBooksInArea('need');
                UI.showBooksInArea('trade')
                if (num === 0) {
                    bookElem.classList.remove('greenBg')

                }
            })
        })

    }


    static showBooksInArea(status) {
        let textarea = document.querySelector(`.${status}-books`)
        textarea.innerHTML = Storage.getBooks(`${status}`).join('\n')
        textarea.style.height = 'auto'
        if (textarea.scrollHeight > textarea.clientHeight) {
            textarea.style.height = (textarea.scrollHeight + 5) + "px";
        }

    }

    static copyBooks(btnSelector, textareaSelector) {
        let btn = document.querySelector(btnSelector);
        btn.addEventListener('click', () => {
            let textarea = document.querySelector(textareaSelector);
            const inputValue = textarea.value.trim();
            if (inputValue) {
                navigator.clipboard.writeText(inputValue)
                    .then(() => {
                        textarea.select();
                        if (btn.innerText !== 'Скопировано!') {
                            const originalText = btn.innerText;
                            btn.innerText = 'Скопировано!';
                            btn.classList.add('one-book')
                            setTimeout(() => {
                                btn.innerText = originalText;
                                btn.classList.remove('one-book')
                            }, 1500);
                        }
                    })
                    .catch(err => {
                        console.log('Something went wrong', err);
                    })
            }
        })
    }

    static clearData() {
        let btn = document.querySelector('.clear');
        btn.addEventListener('click', () => {
            if (confirm('Вы уверены? Вся база собранных книг будет удалена')) {
                Storage.clearStorage();
                UI.booksGrid.innerHTML = "";
                Storage.setFirstBooks(data.firstInitData);
                UI.setBookItem();
                UI.showBooksInArea('have');
                UI.showBooksInArea('need');
                UI.showBooksInArea('trade');
            }
        })
    }
}

Storage.setFirstBooks(data.firstInitData)
UI.setBookItem()
UI.showBooksInArea('have')
UI.showBooksInArea('need')
UI.showBooksInArea('trade')
UI.copyBooks('.write-have-btn', '.have-books')
UI.copyBooks('.write-need-btn', '.need-books')
UI.copyBooks('.write-trade-btn', '.trade-books')
UI.clearData()





function booksCopy(selector) {
    /* Get the text field */
    let copyText = document.querySelector(`.${selector}-books`);
    /* Select the text field */
    copyText.select();
    /* Copy the text inside the text field */
    document.execCommand("copy");
    /* Alert the copied text */
    /* alert("Copied the text: " + copyText.value); */
}