// models.js
class Language {
    constructor(id, name, symbol) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            symbol: this.symbol
        };
    }
}

class Category {
    constructor(id) {
        this.id = id;
        this.name = {};
    }

    setName(language, name) {
        this.name[language.symbol] = name;
    }

    getName(language) {
        return this.name[language.symbol] || "Name not available in this language";
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        };
    }
}

class MenuItem {
    constructor(id, imageURL, price, categoryID) {
        this.id = id;
        this.imageURL = imageURL;
        this.name = {};
        this.description = {};
        this.price = price;
        this.categoryID = categoryID;
    }

    setName(language, name) {
        this.name[language.symbol] = name;
    }

    getName(language) {
        return this.name[language.symbol] || "Name not available in this language";
    }

    setDescription(language, description) {
        this.description[language.symbol] = description;
    }

    getDescription(language) {
        return this.description[language.symbol] || "Description not available in this language";
    }

    toJSON() {
        return {
            id: this.id,
            imageURL: this.imageURL,
            name: this.name,
            description: this.description,
            price: this.price,
            categoryID: this.categoryID
        };
    }
}

module.exports = { Language, Category, MenuItem };
