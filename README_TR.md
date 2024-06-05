# QR-Menu
## İçerik
Amaç restoran,cafe tarzı işletmelerin menüsünün sdaece QR kod okutarak bir website aracılığıyla dijital menüye erişmesidir. Müşterilerin gördüğü menüye, işletme sahibi Admin Paneli aracılığı ile fiyat güncelleme, içerik düzenleme gibi bir çok değişiklik yapabilmektedir:
- Birden fazla dil desteği: Her bir kategori, ürünün adı ve ürün açıklaması her bir dil için farklı olacak şekilde ayarlanabilmektedir, bu sayede menü birden fazla dili desteklemektedir.
- Admin Panelinden Güncelleme: Kategori Adı,Ürün Adı ve Ürün açıklaması her bir dil için ayrı ayrı olmak üzere; fiyat, ürün resmi gibi dilden bağımsız özellikler, bütün diller için ortaktır ve bunların hepsi Admin Panelinden güncellenebilir.
- Ürün ve Kategori Güncelleme: Admin Panelinden ürünler ve kategoriler hakkındaki tüm bilgiler güncellenebilir.
- Ürün ve Kategori ekleme/silme: Admin Panelinden yeni ürün/ kategori eklenebilir veya halihazırda bulunanlar silinebilir.
## Teknolojiler
Front-end için HTML/CSS ve Javascript kullanıldı.
Backend tarafının hızlı olması için sadece Node.js kullanıldı.
veriler bir ".json" dosyasında tutulmaktadır ve güncellemeler bu dosya üzerinde yapılmaktadır. Çünkü json dosyalarındaki Okuma/Yazma Veritabanlarından daha hızlıdır.
Front-end Back-end iletişimi REST API aracılığıyla yapılmaktadır.
## Yapılanlar
Menü hazır, müşteriler menüyü görüntüleyebilir.
Admin Paneli hazır ve tüm fonksiyonlarıyla çaışmaktadır:
- Ürün için:
  - Yeni Ürün oluşturma
  - Ürün silme
  - Ürün güncelleme (Ürün resmi, fiyat bilgisi, kategorisi,ismi (her bir dil için), açıklaması(her bir dil için) )
- Kategori için:
  - Yeni Kategori oluşturma
  - Kategori silme
  - Kategori güncelleme (Kategori ismi (her bir dil için))
## Yapılacaklar
-Birden fazla fiyat belirleyebilme (İsteğe bağlı olacak, bazı ürünler tek fiyat, bazı ürünler çoklu fiyata sahip olabilir.):
  - Örneğin bir hamburger için gramaja göre farklı fiyatların alt alta gösterilmesi ve bu fiyatların Admin Panelinden güncelleneilmesi. Örnek senaryo: 90gr -> 150TL, 120gr -> 180TL, 150gr -> 200TL gibi.
- Canlı demo hazırlanması:
  - Proje localhost'ta çalışmaktadır. Bir domain ve hosting ayarlandıktan sonra demo erişilebilir hale geldiğinde buradan paylaşılacaktır.
