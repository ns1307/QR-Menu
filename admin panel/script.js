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
const apiUrl = 'http://localhost:3000/api/data';
let data;
fetchData(apiUrl)
  .then(fetchedData => {
    data = fetchedData;
        window.languages = data.languages; // Dilleri doğru bir şekilde yükleyip atıyoruz
        window.categories = data.categories;
        setupAccordion('categories-header', 'categories-container', () => renderCategories(data.categories, data.languages));
        setupAccordion('menu-items-header', 'menu-items-container', () => renderMenuItems(data.menuItems, data.categories, data.languages));
    //console.log('Global Data:', data);
  })
  .catch(error => {
    console.error('Fetch data failed:', error);
  });

//console.log(data);




function setupAccordion(headerId, containerId, renderFunction) {
    const header = document.getElementById(headerId);
    const container = document.getElementById(containerId);
    container.style.display = 'none'; // Başlangıçta içeriği gizle
    header.addEventListener('click', () => {
        const isVisible = container.style.display === 'block';
        container.style.display = isVisible ? 'none' : 'block';
        if (!isVisible && renderFunction) {
            renderFunction();
        }
    });
}

function renderCategories(categories, languages) {
    const container = document.getElementById('categories-container');
    container.innerHTML = ''; // Her genişletmede içeriği temizle ve yeniden oluştur
    if(categories.length>0){
        categories.forEach(category => {
            const div = document.createElement('div');
            div.className = 'category';
            const contentDiv = document.createElement('div');
            const namesInputs = languages.map(lang => `
                <label>Name (${lang.symbol}): <input type="text" value="${category.name[lang.symbol] || ''}" id="name-${lang.symbol}-${category.id}"></label>
            `).join('');
            contentDiv.innerHTML = `
                ${namesInputs}
                <button class="button" onclick="updateCategory(${category.id})">Save</button>
                <button class="button" onclick="deleteCategory(${category.id})">Delete</button>
            `;
            const header = document.createElement('h3');
            header.textContent = `Category ID: ${category.id}`;
            div.appendChild(header);
            div.appendChild(contentDiv);
            container.appendChild(div);
        });
    }
    else{
        const noItems = document.createElement('div');
        noItems.className = 'text-center';
        noItems.textContent = 'No category available. (Hiç kategori oluşturulmamış.)';
        container.appendChild(noItems);
    }
}
function renderMenuItems(menuItems, categories, languages) {
    const container = document.getElementById('menu-items-container');
    container.innerHTML = ''; // Her genişletmede içeriği temizle ve yeniden oluştur
    if(menuItems.length>0){
        menuItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            const contentDiv = document.createElement('div');
            const namesInputs = languages.map(lang => `
                <label>Name (${lang.symbol}): <input type="text" value="${item.name[lang.symbol] || ''}" id="name-${lang.symbol}-${item.id}"></label>
            `).join('');
            const descriptionsInputs = languages.map(lang => `
                <label>Description (${lang.symbol}): <textarea id="desc-${lang.symbol}-${item.id}">${item.description[lang.symbol] || ''}</textarea></label>
            `).join('');
            contentDiv.innerHTML = `
                <img src="images/menu/${item.imageURL}" alt="${item.name.en}" style="width:auto; height:200px;"><br>
                ${namesInputs}
                ${descriptionsInputs}
                <label>Price: <input type="number" id="price-${item.id}" min="0" step="0.01" value="${item.price}"></label>
                <label>Image File: <input type="file" id="file-${item.id}"></label>
                <label>Category:
                    <select id="category-${item.id}">
                        ${categories.map(cat => `<option value="${cat.id}" ${cat.id === item.categoryID ? 'selected' : ''}>${cat.name.en} / ${cat.name.tr}</option>`).join('')}
                    </select>
                </label>
                <button class="button" onclick="updateMenuItem(${item.id})">Save</button>
                <button class="button" onclick="deleteMenuItem(${item.id})">Delete</button>
            `;
            const header = document.createElement('h3');
            header.textContent = `Menu Item ID: ${item.id}`;
            div.appendChild(header);
            div.appendChild(contentDiv);
            container.appendChild(div);
        });
    }
    else{
        const noItems = document.createElement('div');
        noItems.className = 'text-center';
        noItems.textContent = 'No menu item available. (Hiç ürün oluşturulmamış.)';
        container.appendChild(noItems);
    }
}


// updateCategory, updateMenuItem, deleteCategory, deleteMenuItem functions should be implemented as needed

function updateCategory(categoryId) {
    const newCategoryNames = window.languages.map(lang =>({
            lang: lang,
            name: document.getElementById(`name-${lang.symbol}-${categoryId}`)
    }));
    if (!validateFormFields(newCategoryNames.map(item => item.name))) {
        alert('Please fill out all required fields.');
        return;
    }
    let updatedCategory = new Category(categoryId);
    newCategoryNames.forEach((item)=>updatedCategory.setName(item.lang,item.name.value));
    updateCategoryAPI(updatedCategory)
    .then(fetchedData => {
        //console.log("success");
        renderCategories(data.categories, data.languages); 
        renderMenuItems(data.menuItems, data.categories, data.languages);
      })
      .catch(error => {
        console.error('Fetch data failed:', error);
      });

    alert('Category updated! Check menu categories for details. ');

}

async function updateCategoryAPI(newCategory) {
    try {
        const url=`http://localhost:3000/api/categories/${newCategory.id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategory.toJSON())
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const responseData = await response.json();
        const index = data.categories.findIndex(item => item.id === responseData.id);
        //Replace with updated item
        if (index !== -1) {
            // Replace the old item with the updated one
            data.categories[index] = responseData;
        }
        else{
            alert('Category updated but could not render on page. Please reload page. ');
        }
        
        
    } catch (error) {
        console.error('Error:', error);
    }
    

}
function deleteCategory(categoryId) {
    if (confirm('Yow will also remove all menu items related with this category. Are you sure you want to delete this category?')) {
        deleteCategoryAPI(categoryId)
        .then(fetchedData => {
            //console.log("success");
            renderCategories(data.categories, data.languages); 
            renderMenuItems(data.menuItems, data.categories, data.languages);
          })
          .catch(error => {
            console.error('failed:', error);
          });
    
        alert('Category deleted! Check console for details.');
    }
}
async function deleteCategoryAPI(categoryID) {
    try {
        const url=`http://localhost:3000/api/categories/${categoryID}`;
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        //id'si farklı olan öğeleri tekrar ata
        data.categories=data.categories.filter(item => item.id !== categoryID);
        data.menuItems = data.menuItems.filter(item => item.categoryID !== categoryID);
        //console.log('Success:', responseData);
        
    } catch (error) {
        console.error('Error:', error);
    }
    


}
async function updateMenuItem(itemId) {
    const newItemNames = window.languages.map(lang => ({
        lang: lang,
        name: document.getElementById(`name-${lang.symbol}-${itemId}`)
    }));
    const newItemDescriptions = window.languages.map(lang =>  ({
            lang: lang,
            description: document.getElementById(`desc-${lang.symbol}-${itemId}`)
    }));
    
    const price = document.getElementById(`price-${itemId}`);
    const categoryId = document.getElementById(`category-${itemId}`);
    const imageFile = document.getElementById(`file-${itemId}`);
    //const categorySelect = document.getElementById(`category-${itemId}`);
    //const categoryId = categorySelect.value;
    const fieldsToValidate = [...newItemNames.map(item => item.name), ...newItemDescriptions.map(item => item.description), price, categoryId];

    if (!validateFormFields(fieldsToValidate)) {
        alert('Please fill out all required fields.');
        return;
    }

    const index = data.menuItems.findIndex(item => item.id === itemId);
    let fileURL="default.png";
    //Replace with updated item
    if (index !== -1) {
        // Replace the old item with the updated one
        fileURL=data.menuItems[index].imageURL;
    }

    if(imageFile.files.length>0){
        if (!validateImageFile(imageFile)) {
            return;  // Dosya türü geçerli değilse fonksiyonu sonlandır
        }
        else{
            await deleteImageAPI(fileURL);
            fileURL= await uploadImage(imageFile.files[0]);
        }
    }


    let updatedMenuItem= new MenuItem(itemId,fileURL, price.value, Number(categoryId.value));
    newItemNames.forEach((item)=>updatedMenuItem.setName(item.lang,item.name.value));
    newItemDescriptions.forEach((item)=>updatedMenuItem.setDescription(item.lang,item.description.value));
    updateMenuItemAPI(updatedMenuItem)
    .then(() => {
        //console.log("success");
        renderMenuItems(data.menuItems, data.categories, data.languages);
      })
      .catch(error => {
        console.error('Fetch data failed:', error);
      });

    alert('Menu item updated! Check menu items for details. ');
}
async function updateMenuItemAPI(updatedMenuItem) {
    try {
        const url=`http://localhost:3000/api/menuitems/${updatedMenuItem.id}`;
        const obj=JSON.stringify(updatedMenuItem.toJSON());
        console.log(obj);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedMenuItem.toJSON())
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const responseData = await response.json();
        const index = data.menuItems.findIndex(item => item.id === responseData.id);
        //Replace with updated item
        if (index !== -1) {
            // Replace the old item with the updated one
            data.menuItems[index] = responseData;
        }
        else{
            alert('Menu item updated but could not render on page. Please reload page. ');
        }
        //console.log('Success:', responseData);
        
    } catch (error) {
        console.error('Error:', error);
    }
    
}
function deleteMenuItem(itemId) {
    if (confirm('Are you sure you want to delete this menu item? This cannot be undone.')) {
        deleteMenuItemAPI(itemId)
    .then(fetchedData => {
        //console.log("success");
        renderMenuItems(data.menuItems, data.categories, data.languages);
      })
      .catch(error => {
        console.error('failed:', error);
      });

        alert('Menu item deleted! Check menu items for details.');
    }
}
async function deleteMenuItemAPI(itemId) {
    try {
        const url=`http://localhost:3000/api/menuitems/${itemId}`;
        const response = await fetch(url, {
            method: 'DELETE'

        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        //id'si farklı olan öğeleri tekrar ata
        data.menuItems = data.menuItems.filter(item => item.id !== itemId);
        //console.log('Success:', responseData);
        
    } catch (error) {
        console.error('Error:', error);
    }
} 


function showModal(type) {
    const modal = document.getElementById('modal');
    const form = document.getElementById('modal-form');
    form.innerHTML = '';
    if (type === 'category') {
        form.appendChild(buildCategoryForm());
    } else if (type === 'menuItem') {
        form.appendChild(buildMenuItemForm());
    }
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}




function buildCategoryForm() {
    const form = document.createElement('div');
    window.languages.forEach(lang => {
        form.innerHTML += `<label>Name (${lang.symbol}): <input type="text" id="new-category-name-${lang.symbol}" required></label><br>`;
    });
    form.innerHTML += '<button class="button" type="button" onclick="saveNewCategory()">Save New Category</button>';
    return form;
}

function buildMenuItemForm() {
    const form = document.createElement('div');
    window.languages.forEach(lang => {
        form.innerHTML += `<label>Name (${lang.symbol}): <input type="text" id="new-menu-item-name-${lang.symbol}" required></label><br>`;
        form.innerHTML += `<label>Description (${lang.symbol}): <textarea id="new-menu-item-description-${lang.symbol}" required></textarea></label><br>`;
    });
    form.innerHTML += `<label>Price: <input type="number" id="new-menu-item-price" min="0" step="0.01" required></label><br>`;

    const select = document.createElement('select');
    select.id = "new-menu-item-category";
    if (data.categories.length > 0) {
        data.categories.forEach(category => {
            select.innerHTML += `<option value="${category.id}">${category.name.en} / ${category.name.tr}</option>`;
        });
    } else {
        select.innerHTML += `<option disabled selected>No available categories</option>`;
    }
    const selectLabel = document.createElement('label');
    selectLabel.textContent = "Category: ";
    selectLabel.appendChild(select);
    form.appendChild(selectLabel);

    form.innerHTML += `<label>Image: <input type="file" id="new-menu-item-image" accept="image/png, image/jpeg" required></label><br>`;
    form.innerHTML += '<button class="button" type="button" onclick="saveNewMenuItem()">Save New Menu Item</button>';
    return form;
}

function validateFormFields(fields) {
    let isValid = true;
    fields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });
    return isValid;
}

function saveNewCategory() {

    const newCategoryNames = window.languages.map(lang => ({
        lang: lang,
        name: document.getElementById(`new-category-name-${lang.symbol}`)
    }));
    
    if (!validateFormFields(newCategoryNames.map(item => item.name))) {
        alert('Please fill out all required fields.');
        return;
    }
    
    let newCategory = new Category();
    newCategoryNames.forEach((item)=>newCategory.setName(item.lang,item.name.value));

    addNewCategory(newCategory)
    .then(fetchedData => {
        console.log("success");
        closeModal();
        renderCategories(data.categories, data.languages);
      })
      .catch(error => {
        console.error('Fetch data failed:', error);
      });
    console.log("New category details:", newCategory);
   
}

async function addNewCategory(newCategory) {
    try {
        const response = await fetch('http://localhost:3000/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategory.toJSON())
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const responseData = await response.json();
        data.categories.push(responseData);
        //console.log('Success:', responseData);
    } catch (error) {
        console.error('Error:', error);
    }

    alert('New menu item added! Check categories for details.');
}
async function saveNewMenuItem() {
    const newItemNames = data.languages.map(lang => ({
        lang: lang,
        name: document.getElementById(`new-menu-item-name-${lang.symbol}`)
    }));
    const newItemDescriptions = data.languages.map(lang => ({
        lang: lang,
        description: document.getElementById(`new-menu-item-description-${lang.symbol}`)
    }));
    const price = document.getElementById('new-menu-item-price');
    const categoryId = document.getElementById('new-menu-item-category');
    const imageFile = document.getElementById('new-menu-item-image');
    const fieldsToValidate = [...newItemNames.map(item => item.name), ...newItemDescriptions.map(item => item.description), price, categoryId, imageFile];
    

    if (!validateFormFields(fieldsToValidate)) {
        alert('Please fill out all required fields.');
        return;
    }
    if (!validateImageFile(imageFile)) {
        return;  // Dosya türü geçerli değilse fonksiyonu sonlandır
    }
    // Doğrudan categoryId'nin değerini kontrol ediyoruz
    if (!categoryId.value || isNaN(Number(categoryId.value))) {
        alert('No category available yet. Please create category first.');
        categoryId.style.borderColor = 'red';
        return; // Eğer kategori geçerli değilse, işlemi durdur.
    }
    const fileURL= await uploadImage(imageFile.files[0]);

    let newMenuItem= new MenuItem(null,fileURL, price.value, Number(categoryId.value));
    newItemNames.forEach((item)=>newMenuItem.setName(item.lang,item.name.value));
    newItemDescriptions.forEach((item)=>newMenuItem.setDescription(item.lang,item.description.value));

    
    addNewMenuItem(newMenuItem)
    .then(fetchedData => {
        //console.log("success");
        closeModal();
        renderMenuItems(data.menuItems, data.categories, data.languages);        
      })
      .catch(error => {
        console.error('Fetch data failed:', error);
      });
    //console.log("New menu item details:", newMenuItem);
    
}

async function addNewMenuItem(newMenuItem) {
    try {
        const response = await fetch('http://localhost:3000/api/menuitems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMenuItem.toJSON())
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const responseData = await response.json();
        data.menuItems.push(responseData);
        //console.log('Success:', responseData);
    } catch (error) {
        console.error('Error:', error);
    }
    //alert('New category added! Check menu items for details. ');
}

function validateImageFile(input) {
    const file = input.files[0];
    if (file) {
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            alert('Invalid file type. Please select a PNG or JPEG image.');
            input.value = '';  // Hatalı dosya seçimi sonrası input'u temizle
            return false;
        }
    }
    return true;
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
  async function uploadImage(imageFile){
    try {
        // FormData nesnesi oluşturarak form verilerini ekleyin
        const formData = new FormData();
        formData.append('file', imageFile); // Seçilen resim dosyası
        const response = await fetch("http://localhost:3000/images/upload",
        {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            // Handle HTTP errors
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return await response.text(); // Return the response text
        } 
        catch (error) {
        // Log any errors that occur
        console.error('Error:', error);
    }
}
async function deleteImageAPI(fileName){
    try {
        const url=`http://localhost:3000/api/images/${fileName}`;
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}