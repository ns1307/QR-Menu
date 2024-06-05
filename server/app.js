const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const { Language, Category, MenuItem } = require('./models');
const app = express();
const PORT = 3000;
app.use(cors()); // Tüm istekler için CORS'u etkinleştirir

app.use(bodyParser.json());
// Body-parser middleware'lerini ekleyin
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


function readData() {
    return JSON.parse(fs.readFileSync('./data.json', 'utf8'));
}

function writeData(data) {
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2), 'utf8');
}

// Tüm verileri getirme
app.get('/api/data', (req, res) => {
    const data = readData();
    res.status(200).json(data);
});


// 'images' klasörünü oluşturun (eğer mevcut değilse)
const dir = './images';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        let newFileName = file.originalname;
        let filePath = path.join(__dirname, 'images', newFileName);

        while (fs.existsSync(filePath)) {
            newFileName = generateRandomFilename(file.originalname);
            filePath = path.join(__dirname, 'images', newFileName);
        }
        cb(null, newFileName);
    }
});
const upload = multer({ storage: storage });

app.post('/images/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Dosya yüklenmedi.');
    }
    res.send(req.file.filename);
});

function generateRandomFilename(originalName) {
    const ext = path.extname(originalName);
    return `${Date.now()}${ext}`;
}

function generateRandomFilename(originalName) {
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);
    return `${baseName}-${Date.now()}${ext}`;
}
//resim dosyasını çekme, ihtiyaç olmaz, direk resme url'den erişir.
app.get('/image/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'images', fileName);

    // Dosya varlığını kontrol et
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Dosya bulunamadı:', err);
            return res.status(404).send('Dosya bulunamadı');
        }

        // Dosyayı istemciye gönder
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Dosya gönderilirken bir hata oluştu:', err);
                return res.status(500).send('Dosya gönderilemedi');
            }
        });
    });
});

// Bir kategoriye ait bilgileri getirme
app.get('/api/categories/:id', (req, res) => {
    const data = readData();
    const category = data.categories.find(cat => cat.id === parseInt(req.params.id));
    if (category) {
        res.status(200).json(category);
    } else {
        res.status(404).send('Category not found.');
    }
});

// Bir menu-item'a ait bilgileri getirme
app.get('/api/menuItems/:id', (req, res) => {
    const data = readData();
    const menuItem = data.menuItems.find(item => item.id === parseInt(req.params.id));
    if (menuItem) {
        res.status(200).json(menuItem);
    } else {
        res.status(404).send('Menu item not found.');
    }
});

// Kategori güncelleme
app.put('/api/categories/:id', (req, res) => {
    const data = readData();
    const index = data.categories.findIndex(cat => cat.id === parseInt(req.params.id));
    if (index !== -1) {
        // Existing category object
        const category = new Category(data.categories[index].id);

        // Update names for all provided languages in the request
        Object.keys(req.body.name).forEach(langCode => {
            const language = new Language(0, langCode.toUpperCase(), langCode);
            category.setName(language,req.body.name[langCode]);
        });

        // Save the updated category
        data.categories[index] = category;
        writeData(data);
        res.status(200).json(category);
    } else {
        res.status(404).send('Category not found.');
    }
});


app.put('/api/menuItems/:id', (req, res) => {
    const data = readData();
    const index = data.menuItems.findIndex(item => item.id === parseInt(req.params.id));
    if (index !== -1) {
        // Create a new instance of the menuItem to be updated
        const menuItem = new MenuItem(
            data.menuItems[index].id,
            req.body.imageURL,
            req.body.price,
            req.body.categoryID
        );

        // Assuming the body may include names and descriptions in multiple languages
        // and they are objects with language code keys
        Object.keys(req.body.name).forEach(langCode => {
            const language = new Language(0, langCode.toUpperCase(), langCode);
            menuItem.setName(language, req.body.name[langCode]);
        });
        
        Object.keys(req.body.description).forEach(langCode => {
            const language = new Language(0, langCode.toUpperCase(), langCode);
            menuItem.setDescription(language, req.body.description[langCode]);
        });

        // Update the menuItems array
        data.menuItems[index] = menuItem.toJSON();
        writeData(data);
        res.status(200).json(menuItem);
    } else {
        res.status(404).send('Menu item not found.');
    }
});


// Yeni kategori ekleme
app.post('/api/categories', (req, res) => {
  const data = readData();
  const newCategoryId = data.categories.length > 0 ? data.categories[data.categories.length - 1].id + 1 : 0;
  const newCategory = new Category(newCategoryId);

  // Gelen her dil için ad ayarlandı
  for (const lang in req.body.name) {
      const language = new Language(0, lang, lang); // Örnek dil nesnesi
      newCategory.setName(language, req.body.name[lang]);
  }

  data.categories.push(newCategory.toJSON());
  writeData(data);
  res.status(201).json(newCategory);
});

// Yeni menu-item ekleme
app.post('/api/menuItems', (req, res) => {
  const data = readData();
  const newMenuItemId = data.menuItems.length > 0 ? data.menuItems[data.menuItems.length - 1].id + 1 : 0;
  
  const newMenuItem = new MenuItem(
      newMenuItemId,
      req.body.imageURL,
      req.body.price,
      req.body.categoryID
  );

  for (const lang in req.body.name) {
      const language = new Language(0, lang, lang);
      newMenuItem.setName(language, req.body.name[lang]);
  }

  for (const lang in req.body.description) {
      const language = new Language(0, lang, lang);
      newMenuItem.setDescription(language, req.body.description[lang]);
  }

  data.menuItems.push(newMenuItem.toJSON());
  writeData(data);
  res.status(201).json(newMenuItem);
});



// Kategori silme
app.delete('/api/categories/:id', (req, res) => {
  const data = readData();
  const categoryId = parseInt(req.params.id);
  const categoryIndex = data.categories.findIndex(cat => cat.id === categoryId);
  let notMatched = [];
  if (categoryIndex !== -1) {
    // Kategoriye ait olmayan menu-item'ları filtrele, aynı kategorideki itemların görüntülerini sil
    data.menuItems.forEach(item => {
        if (item.categoryID === categoryId) {
          deleteFile(item.imageURL);//delete image
        } else {
          notMatched.push(item);
        }
      });
      

      data.menuItems = notMatched;
      // Kategoriyi sil
      data.categories.splice(categoryIndex, 1);
      writeData(data);
      res.status(200).send('Category and related menu items deleted.');
  } else {
      res.status(404).send('Category not found.');
  }
});

// Menu-item silme
app.delete('/api/menuItems/:id', (req, res) => {
  const data = readData();
  const index = data.menuItems.findIndex(item => item.id === parseInt(req.params.id));
  if (index !== -1) {
    const fileName= data.menuItems[index].imageURL;
    deleteFile(fileName);
    data.menuItems.splice(index, 1); // Menu-item'ı sil
    writeData(data);
    res.status(200).send('Menu item deleted.');
  } else {
      res.status(404).send('Menu item not found.');
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Menu-item silme
app.delete('/api/images/:fileName', async (req, res) => {
    try {
        const result = await deleteFile(req.params.fileName); // await kullanarak sonucu bekleyin
        if (result) {
            res.status(200).send('Image deleted.');
        } else {
            res.status(404).send('File not found.');
        }
    } catch (error) {
        res.status(404).send('File not found:' + req.params.fileName);
    }
});


async function deleteFile(fileName) {
    const filePath = path.join(__dirname, 'images', fileName);

    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Dosya silinirken bir hata oluştu:', err);
                return reject(err); // Hata durumunda reject ile hata dön
            }
            resolve(true); // Dosya başarıyla silindi
        });
    });
}