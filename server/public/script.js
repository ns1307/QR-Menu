
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
    constructor(id,imageURL, price, category) {
        this.id = id;
        this.imageURL=imageURL;
        this.name = {};
        this.description = {};
        this.price = price;
        this.category = category;

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
            category: this.category
        };
    }
}

turkish= new Language(0,"🇹🇷 Türkçe","tr");
english=new Language(0,"English","en");
// Categories
hamburgers = new Category(0);
hamburgers.setName(english, "Hamburgers");
hamburgers.setName(turkish, "Hamburgerler");

salads = new Category(1);
salads.setName(english, "Salads");
salads.setName(turkish, "Salatalar");

pasta = new Category(2);
pasta.setName(english, "Pasta");
pasta.setName(turkish, "Makarnalar");

meatDishes = new Category(3);
meatDishes.setName(english, "Meat Dishes");
meatDishes.setName(turkish, "Et Yemekleri");

chickenDishes = new Category(4);
chickenDishes.setName(english, "Chicken Dishes");
chickenDishes.setName(turkish, "Tavuklu Yemekler");

soups = new Category(5);
soups.setName(english, "Soups");
soups.setName(turkish, "Çorba");

desserts = new Category(6);
desserts.setName(english, "Desserts");
desserts.setName(turkish, "Tatlılar");

drinks = new Category(7);
drinks.setName(english, "Drinks");
drinks.setName(turkish, "İçecekler");

// Menu items
// Hamburgers
veganBurger = new MenuItem(0, "veganburger.png", 49.99, hamburgers);
veganBurger.setName(english, "Vegan Burger");
veganBurger.setName(turkish, "Vegan Burger");
veganBurger.setDescription(english, "Special to vegan customers");
veganBurger.setDescription(turkish, "Veganlara özel hazırladığımız burger");

peynirLezizBurger = new MenuItem(1, "peynirLezizBurger.png", 75, hamburgers);
peynirLezizBurger.setName(english, "Cheese Delight Burger");
peynirLezizBurger.setName(turkish, "Peynir Leziz Burger");
peynirLezizBurger.setDescription(english, "Loaded with delicious cheese");
peynirLezizBurger.setDescription(turkish, "Bol peynirli burger");

// More Hamburgers
barbekuDeluxeBurger = new MenuItem(2, "barbekuDeluxeBurger.png", 75, hamburgers);
barbekuDeluxeBurger.setName(english, "Barbecue Deluxe Burger");
barbekuDeluxeBurger.setName(turkish, "Barbekü Deluxe Burger");
barbekuDeluxeBurger.setDescription(english, "Deluxe burger with barbecue sauce");
barbekuDeluxeBurger.setDescription(turkish, "Barbekü soslu deluxe burger");

cheeseBurger = new MenuItem(3, "cheeseBurger.png", 75, hamburgers);
cheeseBurger.setName(english, "Cheese Burger");
cheeseBurger.setName(turkish, "Cheese Burger");
cheeseBurger.setDescription(english, "Classic burger with cheese");
cheeseBurger.setDescription(turkish, "Klasik peynirli burger");

// Pastas
creamyMushroomPasta = new MenuItem(4, "creamyMushroomPasta.png", 49.99, pasta);
creamyMushroomPasta.setName(english, "Creamy & Mushroom Pasta");
creamyMushroomPasta.setName(turkish, "Kremalı&Mantarlı Makarna");
creamyMushroomPasta.setDescription(english, "Pasta with cream and mushrooms");
creamyMushroomPasta.setDescription(turkish, "Kremalı ve mantarlı makarna");

tomatoSaucePasta = new MenuItem(5, "tomatoSaucePasta.png", 75, pasta);
tomatoSaucePasta.setName(english, "Tomato Sauce Pasta");
tomatoSaucePasta.setName(turkish, "Domates Soslu Makarna");
tomatoSaucePasta.setDescription(english, "Pasta in a rich tomato sauce");
tomatoSaucePasta.setDescription(turkish, "Zengin domates soslu makarna");

cheesePasta = new MenuItem(6, "cheesePasta.png", 75, pasta);
cheesePasta.setName(english, "Cheese Pasta");
cheesePasta.setName(turkish, "Peynirli Makarna");
cheesePasta.setDescription(english, "Pasta with a blend of cheeses");
cheesePasta.setDescription(turkish, "Çeşitli peynirlerle hazırlanmış makarna");

veganPasta = new MenuItem(7, "veganPasta.png", 75, pasta);
veganPasta.setName(english, "Vegan Pasta");
veganPasta.setName(turkish, "Vegan Makarna");
veganPasta.setDescription(english, "Delicious vegan-friendly pasta");
veganPasta.setDescription(turkish, "Veganlara uygun lezzetli makarna");

// Meat Dishes
grilledMeatballs = new MenuItem(8, "grilledMeatballs.png", 49.99, meatDishes);
grilledMeatballs.setName(english, "Grilled Meatballs");
grilledMeatballs.setName(turkish, "Izgara Köfte");
grilledMeatballs.setDescription(english, "Juicy grilled meatballs");
grilledMeatballs.setDescription(turkish, "Sulu ızgara köfteler");

yogurtMeatballs = new MenuItem(9, "yogurtMeatballs.png", 75, meatDishes);
yogurtMeatballs.setName(english, "Yogurt Meatballs");
yogurtMeatballs.setName(turkish, "Yoğurtlu köfte");
yogurtMeatballs.setDescription(english, "Meatballs served with yogurt");
yogurtMeatballs.setDescription(turkish, "Yoğurtla servis edilen köfteler");

yogurtKebab = new MenuItem(10, "yogurtKebab.png", 75, meatDishes);
yogurtKebab.setName(english, "Yogurt Kebab");
yogurtKebab.setName(turkish, "Yoğurtlu Kebap");
yogurtKebab.setDescription(english, "Kebab with a yogurt sauce");
yogurtKebab.setDescription(turkish, "Yoğurt soslu kebap");

meatWrap = new MenuItem(11, "meatWrap.png", 75, meatDishes);
meatWrap.setName(english, "Meat Wrap");
meatWrap.setName(turkish, "Etli Dürüm");
meatWrap.setDescription(english, "Wrap filled with seasoned meat");
meatWrap.setDescription(turkish, "Baharatlı etle doldurulmuş dürüm");


// Chicken Dishes
grilledChicken = new MenuItem(12, "grilledChicken.png", 49.99, chickenDishes);
grilledChicken.setName(english, "Grilled Chicken");
grilledChicken.setName(turkish, "Izgara Tavuk");
grilledChicken.setDescription(english, "Perfectly grilled chicken");
grilledChicken.setDescription(turkish, "Mükemmel ızgara tavuk");

buffaloChicken = new MenuItem(13, "buffaloChicken.png", 75, chickenDishes);
buffaloChicken.setName(english, "Buffalo Chicken");
buffaloChicken.setName(turkish, "Tavuklu Buffalo Soslu Yemek");
buffaloChicken.setDescription(english, "Chicken in spicy buffalo sauce");
buffaloChicken.setDescription(turkish, "Acılı buffalo soslu tavuk");

saucedChickenWings = new MenuItem(14, "saucedChickenWings.png", 75, chickenDishes);
saucedChickenWings.setName(english, "Sauced Chicken Wings");
saucedChickenWings.setName(turkish, "Soslu Tavuk Kanat");
saucedChickenWings.setDescription(english, "Chicken wings in a savory sauce");
saucedChickenWings.setDescription(turkish, "Lezzetli soslu tavuk kanatları");

chickenWrap = new MenuItem(15, "chickenWrap.png", 75, chickenDishes);
chickenWrap.setName(english, "Chicken Wrap");
chickenWrap.setName(turkish, "Tavuklu Dürüm");
chickenWrap.setDescription(english, "Wrap filled with spicy chicken");
chickenWrap.setDescription(turkish, "Baharatlı tavukla doldurulmuş dürüm");

// Soups
creamMushroomSoup = new MenuItem(16, "creamMushroomSoup.png", 49.99, soups);
creamMushroomSoup.setName(english, "Cream & Mushroom Soup");
creamMushroomSoup.setName(turkish, "Kremalı&Mantarlı Çorba");
creamMushroomSoup.setDescription(english, "Creamy mushroom soup");
creamMushroomSoup.setDescription(turkish, "Kremalı mantar çorbası");

tomatoSoup = new MenuItem(17, "tomatoSoup.png", 75, soups);
tomatoSoup.setName(english, "Tomato Soup");
tomatoSoup.setName(turkish, "Domates Çorbası");
tomatoSoup.setDescription(english, "Rich and hearty tomato soup");
tomatoSoup.setDescription(turkish, "Zengin ve doyurucu domates çorbası");

soupOfTheDay = new MenuItem(18, "soupOfTheDay.png", 75, soups);
soupOfTheDay.setName(english, "Soup of the Day");
soupOfTheDay.setName(turkish, "Günün Çorbası");
soupOfTheDay.setDescription(english, "Daily special soup");
soupOfTheDay.setDescription(turkish, "Günün özel çorbası");

// Desserts
chocolateCake = new MenuItem(19, "chocolateCake.png", 49.99, desserts);
chocolateCake.setName(english, "Chocolate Cake");
chocolateCake.setName(turkish, "Çikolatalı Kek");
chocolateCake.setDescription(english, "Rich chocolate cake");
chocolateCake.setDescription(turkish, "Zengin çikolatalı kek");

applePie = new MenuItem(20, "applePie.png", 75, desserts);
applePie.setName(english, "Creamy Apple Pie");
applePie.setName(turkish, "Kremalı Elmalı Turta");
applePie.setDescription(english, "Apple pie with creamy filling");
applePie.setDescription(turkish, "Kremalı elmalı turta");

rolledBaklava = new MenuItem(21, "rolledBaklava.png", 75, desserts);
rolledBaklava.setName(english, "Rolled Baklava");
rolledBaklava.setName(turkish, "Dondurmalı Baklava");
rolledBaklava.setDescription(english, "Baklava served with ice cream");
rolledBaklava.setDescription(turkish, "Dondurma ile servis edilen baklava");

spongeCake = new MenuItem(22, "spongeCake.png", 75, desserts);
spongeCake.setName(english, "Sponge Cake");
spongeCake.setName(turkish, "Havuçlu Kek");
spongeCake.setDescription(english, "Soft sponge cake with carrots");
spongeCake.setDescription(turkish, "Havuçlu yumuşak sünger kek");

layeredPastaDessert = new MenuItem(23, "layeredPastaDessert.png", 65, desserts);
layeredPastaDessert.setName(english, "Layered Pasta Dessert");
layeredPastaDessert.setName(turkish, "Dilim Pasta");
layeredPastaDessert.setDescription(english, "Multi-layered sweet pasta");
layeredPastaDessert.setDescription(turkish, "Katmanlı tatlı pasta");

// Drinks
water = new MenuItem(24, "water.png", 14, drinks);
water.setName(english, "Water");
water.setName(turkish, "Su");
water.setDescription(english, "Fresh water");
water.setDescription(turkish, "Taze su");

buttermilk = new MenuItem(25, "buttermilk.png", 14, drinks);
buttermilk.setName(english, "Buttermilk");
buttermilk.setName(turkish, "Ayran");
buttermilk.setDescription(english, "Refreshing buttermilk");
buttermilk.setDescription(turkish, "Ferahlatıcı ayran");

soda = new MenuItem(26, "soda.png", 14, drinks);
soda.setName(english, "Soda");
soda.setName(turkish, "Gazoz");
soda.setDescription(english, "Sparkling soda");
soda.setDescription(turkish, "Gazoz");

fruitJuice = new MenuItem(27, "fruitJuice.png", 14, drinks);
fruitJuice.setName(english, "Fruit Juice");
fruitJuice.setName(turkish, "Meyve Suyu");
fruitJuice.setDescription(english, "Natural fruit juice");
fruitJuice.setDescription(turkish, "Doğal meyve suyu");

lemonade = new MenuItem(28, "lemonade.png", 14, drinks);
lemonade.setName(english, "Lemonade");
lemonade.setName(turkish, "Limonata");
lemonade.setDescription(english, "Freshly squeezed lemonade");
lemonade.setDescription(turkish, "Taze sıkılmış limonata");

// Salads
grilledChickenSalad = new MenuItem(29, "grilledChickenSalad.png", 49.99, salads);
grilledChickenSalad.setName(english, "Grilled Chicken Salad");
grilledChickenSalad.setName(turkish, "Izgara Tavuk Salata");
grilledChickenSalad.setDescription(english, "Grilled chicken breast on a bed of mixed greens");
grilledChickenSalad.setDescription(turkish, "Karışık yeşillikler üzerinde ızgara tavuk göğüs");

mediterraneanSalad = new MenuItem(30, "mediterraneanSalad.png", 75, salads);
mediterraneanSalad.setName(english, "Mediterranean Salad");
mediterraneanSalad.setName(turkish, "Akdeniz Salata");
mediterraneanSalad.setDescription(english, "A fresh mix of Mediterranean veggies with olives and feta");
mediterraneanSalad.setDescription(turkish, "Zeytin ve feta peyniri ile Akdeniz sebzelerinin taze karışımı");

grilledMeatSalad = new MenuItem(31, "grilledMeatSalad.png", 75, salads);
grilledMeatSalad.setName(english, "Grilled Meat Salad");
grilledMeatSalad.setName(turkish, "Izgara Et Salata");
grilledMeatSalad.setDescription(english, "Succulent grilled meat with seasonal greens");
grilledMeatSalad.setDescription(turkish, "Mevsim yeşillikleri ile lezzetli ızgara et");

veganSalad = new MenuItem(32, "veganSalad.png", 75, salads);
veganSalad.setName(english, "Vegan Salad");
veganSalad.setName(turkish, "Vegan Salata");
veganSalad.setDescription(english, "A vibrant salad tailored for vegans");
veganSalad.setDescription(turkish, "Veganlar için özel canlı bir salata");

quinoaHerbSalad = new MenuItem(33, "quinoaHerbSalad.png", 65, salads);
quinoaHerbSalad.setName(english, "Quinoa Herb Salad");
quinoaHerbSalad.setName(turkish, "Kinoalı Çilekli Salata");
quinoaHerbSalad.setDescription(english, "Quinoa mixed with fresh herbs and strawberries");
quinoaHerbSalad.setDescription(turkish, "Taze otlar ve çilek ile karıştırılmış kinoa");

const data = {
    languages: [turkish,english],
    categories: [
        hamburgers, salads, pasta, meatDishes, chickenDishes, soups, desserts, drinks
    ],
    menuItems: [
        veganBurger, peynirLezizBurger, barbekuDeluxeBurger, cheeseBurger,
        creamyMushroomPasta, tomatoSaucePasta, cheesePasta, veganPasta,
        grilledMeatballs, yogurtMeatballs, yogurtKebab, meatWrap,
        grilledChicken, buffaloChicken, saucedChickenWings, chickenWrap,
        creamMushroomSoup, tomatoSoup, soupOfTheDay,
        chocolateCake, applePie, rolledBaklava, spongeCake, layeredPastaDessert,
        water, buttermilk, soda, fruitJuice, lemonade,grilledChickenSalad, mediterraneanSalad, grilledMeatSalad, veganSalad, quinoaHerbSalad
    ]
}

selectedCategoryID=0;
//console.log(JSON.stringify(data));

function updateMenu(languageSymbol) {
    const categoriesDiv = document.querySelector('.categories');
    categoriesDiv.innerHTML = ''; // Reset categories
    data.categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-warning mx-1 ';
        btn.textContent = cat.name[languageSymbol];
        btn.onclick = () => {
            selectedCategoryID=cat.id;
            filterMenuItemsByCategory(languageSymbol);
        }
        categoriesDiv.appendChild(btn);
    });

    filterMenuItemsByCategory(languageSymbol,data.categories[0].id);

}

// Event Listener
document.getElementById('languageDropdown').addEventListener('change', (e) => {
    updateMenu(e.target.value);
});
function filterMenuItemsByCategory(language) {
    const languageSymbol = document.getElementById('languageDropdown').value;
    const menuItemsDiv = document.querySelector('.menu-items');
    menuItemsDiv.innerHTML = ''; // Menü ögelerini temizle

    const filteredItems = data.menuItems.filter(item => item.category.id === selectedCategoryID);
    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="images/menu/${item.imageURL}" class="img-fluid rounded-start border border-warning border-2 custom-image" alt="Görsel: ${item.imageURL}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="card-title">
                            <h5 class="d-inline">${item.name[languageSymbol]}</h5>
                            <span class="price text-warning">${item.price}₺</span>
                        </div>
                        <p class="card-text">${item.description[languageSymbol]}</p>
                    </div>
                </div>
            </div>
        `;
        menuItemsDiv.appendChild(card);
    });

    // Hiçbir öğe bulunamazsa kullanıcıyı bilgilendir
    if (filteredItems.length === 0) {
        const noItems = document.createElement('div');
        noItems.className = 'text-center';
        noItems.textContent = 'No items available in this category';
        menuItemsDiv.appendChild(noItems);
    }
}

function populateLanguageDropdown() {
    const languageDropdown = document.getElementById('languageDropdown');
    data.languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language.symbol;
        option.textContent = language.name;
        languageDropdown.appendChild(option);
        
    });
    updateMenu(languageDropdown.value);
}
populateLanguageDropdown();
document.getElementById('languageDropdown').addEventListener('change', (e) => {
    updateMenu(e.target.value);
});

