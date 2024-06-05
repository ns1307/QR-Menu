
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
// API endpoint URL

  
const apiUrl = 'http://localhost:3000/api/data';
let data;
fetchData(apiUrl)
  .then(fetchedData => {
    data = fetchedData;
    if(data.categories.length >0){
        selectedCategoryID=data.categories[0].id;
    }
    populateLanguageDropdown();
    //console.log('Global Data:', data);
  })
  .catch(error => {
    console.error('Fetch data failed:', error);
  });

//console.log(data);

function updateMenu(languageSymbol) {
    const categoriesDiv = document.querySelector('.categories');
    categoriesDiv.innerHTML = ''; // Reset categories
    if(data.categories.length==0){
        const noItems = document.createElement('div');
        noItems.className = 'text-center';
        noItems.textContent = 'No category available. (Hiç kategori yok.)';
        categoriesDiv.appendChild(noItems);
    }
    else{
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
    
        filterMenuItemsByCategory(languageSymbol);
        
    }
    

}

// Event Listener
document.getElementById('languageDropdown').addEventListener('change', (e) => {
    updateMenu(e.target.value);
});
document.getElementById('languageDropdown').addEventListener('change', (e) => {
    updateMenu(e.target.value);
});


function filterMenuItemsByCategory(language) {
    const languageSymbol = document.getElementById('languageDropdown').value;
    const menuItemsDiv = document.querySelector('.menu-items');
    menuItemsDiv.innerHTML = ''; // Menü ögelerini temizle

    const filteredItems = data.menuItems.filter(item => item.categoryID === selectedCategoryID);
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
        noItems.textContent = 'No items available in this category (Bu kategoride hiç bir ürün yok)';
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


async function fetchData(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const fetchedData = await response.json();
      return fetchedData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  }
  