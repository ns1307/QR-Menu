# QR-Menu
## Goal
The aim is to let customers access the digital menu of restaurants through a website by simply scanning the QR code. The business owner can make many changes to the menu that customers see, such as price updates and content editing, via the Admin Panel:
- Multiple language support: Each category, product name and product description can be set to be different for each language, so the menu supports more than one language.
- Update from Admin Panel: Category Name, Product Name and Product description can be updated separately for each language from the Admin Panel; Language-independent features such as price and product image are common for all languages ​​and can be updated from the Admin Panel.
- Product and Category Update: All information about products and categories can be updated from the Admin Panel.
- Adding/deleting products and categories: New products/categories can be added or existing ones can be deleted from the Admin Panel.
## Technologies
HTML/CSS and Javascript were used for front-end.
Only Node.js was used to make the backend faster.
The data is kept in a ".json" file and updates are made on this file.Because Read/Write in json files are faster than Databases.
Front-end and Back-end communication is done via REST API.
## Ready
Menu is ready, customers can see the menu.
Admin Panel is ready and working with all its functions:
- For the product:
 - Creating a New Product
 - Delete product
 - Product update (Product image, price information, category, name (for each language), description (for each language))
- For category:
 - Creating a New Category
 - Delete category
 - Category update (Category name (for each language))
## ToDo
- Ability to set multiple prices (Optional, some products may have a single price, some products may have multiple prices):
 - For example, showing different prices for a hamburger according to size and these prices can be updated from the Admin Panel. Example scenario: 90gr -> 150TL, 120gr -> 180TL, 150gr -> 200TL etc.
- Preparation of live demo:
 - The project runs on localhost. Once a domain and hosting is set up, the demo will be shared here when it becomes available.
