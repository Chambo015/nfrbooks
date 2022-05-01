export default class Storage {
    static check() {
        return localStorage.getItem('books') ? true : false
    }

    static getCount(book) {
        let obj = JSON.parse(localStorage.getItem('books'))
        return obj[book]
    }

    static setCount(book, count) {
        let obj = JSON.parse(localStorage.getItem('books'));
        obj[book] = count;
        let newJSON = JSON.stringify(obj)
        localStorage.setItem('books', newJSON)

    }

    static setFirstBooks(data) {
        if(!this.check()) {
            localStorage.setItem('books', JSON.stringify(data))
        }
        
    }

    static getBooks(status){
        let obj = JSON.parse(localStorage.getItem('books'));
        let arr = [];
        let counter = document.querySelector('.count-have-books')
        for (let [key, value] of Object.entries(obj)) {
            if (status === "have" && value > 0) {
                arr.push(value > 1 ? `${key} x${value}` : key)
            } else if (status === "need" && value === 0) {
                arr.push(key)
            } else if (status === "trade" && value > 1) {
                arr.push(key)
            }
        }
        if (status === "have") {
            counter.textContent = arr.length
        }
        return arr
    }

    static clearStorage() {
        localStorage.clear()
    }
}