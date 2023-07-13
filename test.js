class Good {
    constructor(id, name, description, sizes, price, available) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.sizes = sizes;
    this.price = price;
    this.available = available;
    }
    
    setAvailable(available_value) {
        this.available = available_value
    }

}


class GoodsList {
    #goods;
    constructor(goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        let goodsList = []
        for (const object of this.#goods) {
           if (this.filter.test(object.name)) {
                goodsList.push(object)            
           } 
        }
        if (this.sortPrice) {
            return goodsList.sort((good1, good2) => [good2.price - good1.price, good1.price - good2.price][Number(this.sortDir)])
        } 
        else {
            return goodsList
        }
    }

    add(good) {
        this.#goods.push(good)
    }

    remove(id) {
        for (const index in this.#goods) {
            if (this.#goods[index].id === id) {
                this.#goods.splice(index, 1)                
            }
        }
    }
}


class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available)
        this.amount = amount
    }
}


class Basket {
    constructor(goods) {
        this.goods = goods
    }

    get totalSum() {
        let summ = 0
        for (const element of this.goods) {
            summ += element.price         
        }
        return summ
    }

    get totalAmount() {
        let amount = 0
        for (const element of this.goods) {
            amount += element.amount         
        }
        return amount 
    }

    add(good, amount) {
        if (good in this.goods) {
            this.goods.amount += amount
        } 
        else {
            let newGood = new BasketGood(good, amount)
            this.goods.push(newGood)
        }   
    }
    
    remove(good, amount) {
        for (const object in this.goods) {
            if (this.goods[object].id === good.id) {
                this.goods[object].amount -= amount         
            }

            if (this.goods[object].amount <= 0) {
                 this.goods.splice(object, 1)
            }
        }
    }

    clear() {
        this.goods = []
    }

    removeUnavailable() {
        this.goods = this.goods.filter((good) => good.available == true)
        
    }
}

let goodsArray = {
    "good1": {
        "id": 1,
        "name": "name1",
        "description": "description1",
        "sizes": ["size1", "size2"],
        "price": 999, 
        "available": true
    },
    "good2": {
        "id": 2,
        "name": "name2",
        "description": "description2",
        "sizes": ["size4", "size3"],
        "price": 999999999999, 
        "available": true
    },
    "good3": {
        "id": 3,
        "name": "name3",
        "description": "description3",
        "sizes": ["size6", "size5"],
        "price": 89999, 
        "available": true
    },
    "good4": {
        "id": 4,
        "name": "name4",
        "description": "description4",
        "sizes": ["size6"],
        "price": 199900, 
        "available": true
    },
    "vodka": {
        "id": 5,
        "vodka": "vodka",
        "description": "description5",
        "sizes": ["size0.25", "size0.5", "size1.0"],
        "price": 777, 
        "available": true
    }
}

let good1 = new Good(1, "name1", "description1", ["size1", "size2"], 999, false)
let good2 = new Good(2, "name2", "description2", ["size1", "size2"], 200, true)
let good3 = new Good(3, "name3", "description3", ["size1", "size2"], 300, true)
let good4 = new Good(4, "name4", "description1", ["size1", "size2"], 400, true)
let good5 = new Good(5, "name5", "description5", ["size1", "size2"], 500, true)
let good6 = new Good(6, "name6", "description6", ["size1", "size2"], 600, true)


// good1.setAvailable(false)
// console.log(good1)


let goodList1 = new GoodsList([good1, good2, good3], /name/, true, true)
goodList1.add(good4)

// goodList1.remove(2)
// console.log(goodList1.list)

let basketGood1 = new BasketGood(good1, 3)
let basketGood2 = new BasketGood(good2, 5)
let basketGood3 = new BasketGood(good3, 1)


let basket1 = new Basket([basketGood1, basketGood2, basketGood3]) 

console.log(basket1.totalSum)
console.log(basket1.totalAmount)

basket1.add(good4, 10)
basket1.remove(good4, 6)
// basket1.clear()
basket1.removeUnavailable()

console.log(basket1)
