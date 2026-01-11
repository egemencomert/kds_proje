# 🚛 Lojistik Filo ve Sefer Yönetimi - Karar Destek Sistemi (KDS)

Bu proje, Ege lojistik firmasının araç filosunu yönetmek, sefer maliyetlerini analiz etmek ve operasyonel kararları veri odaklı bir şekilde optimize etmek için geliştirilmiş bir **Karar Destek Sistemi** uygulamasıdır.

## 📝 Proje Açıklaması

Sistem; araçların teknik durumları, yakıt tüketimi ve rota verimliliği gibi verileri işleyerek yönetim katmanına stratejik öngörüler sunar. Node.js ve MySQL tabanlı geliştirilen bu çözüm, lojistik operasyonlardaki manuel takibi minimize ederek filonun doluluk oranını ve kârlılığını artırmayı hedefler.

## 🎭 Senaryo Tanımı

**Senaryo:** "Lojistik A.Ş." adında, bünyesinde çekici ve treyler bulunduran bir firmanın yönetim süreçleri simüle edilmiştir.

* **Problem:** Hangi aracın hangi rotada daha verimli olduğunun takip edilememesi ve bakım zamanı gelen araçların sefer sırasında arıza yaparak maliyeti artırması.
* **KDS Çözümü:** Sistem, geçmiş sefer verilerini analiz ederek rota-araç eşleşmesi önerir, bakım takvimini izler ve sefer bazlı kâr-zarar raporları sunar.

## 📂 Proje Yapısı

```text
kds_proje/
├── public/             # CSS, JS ve Görsel dosyaları
├── views/              # EJS arayüz şablonları
├── db.js               # MySQL veritabanı bağlantı yapılandırması
├── app.js              # Uygulama ana giriş noktası (Express)
├── .env                # Ortam değişkenleri (Gizli bilgiler)
└── ER_Diyagrami.png    # Veritabanı mimarisi

```

## 🛠️ Kurulum Adımları

1. **Depoyu Klonlayın:**
```bash
git clone https://github.com/egemencomert/kds_proje.git
cd kds_proje

```


2. **Bağımlılıkları Yükleyin:**
```bash
npm install

```


3. **Veritabanını Hazırlayın:**
* MySQL üzerinde `kds_lojistik` adında bir veritabanı oluşturun.
* Proje içinde bulunan SQL dosyalarını (varsa) içe aktarın veya tablo yapılarını oluşturun.


4. **Ortam Değişkenlerini Yapılandırın:**
Kök dizinde bir `.env` dosyası oluşturun ve kendi bilgilerinize göre doldurun:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=sifreniz
DB_NAME=kds_lojistik
PORT=3000

```


5. **Uygulamayı Başlatın:**
```bash
npm start

```



## 🔌 API & Sayfa Yapısı

| Metot | Sayfa/Endpoint | Açıklama |
| --- | --- | --- |
| `GET` | `/` | Ana sayfa ve genel filo özet raporu. |
| `GET` | `/trucks` | Filodaki tüm araçların listesi ve durumları. |
| `GET` | `/trips` | Seferlerin listesi ve kârlılık verileri. |
| `POST` | `/api/analyze` | Seçilen rota için maliyet analizi yapar. |

## 🚀 Kullanılan Teknolojiler

* **Backend:** Node.js, Express.js
* **Veritabanı:** MySQL (mysql2 kütüphanesi ile)
* **Frontend:** EJS (Embedded JavaScript templates), CSS3
* **Environment:** Dotenv

## 📊 ER Diyagramı

Projenin veritabanı tasarımına ve tablolar arası ilişkilere aşağıdaki görselden ulaşabilirsiniz:

![ER Diyagramı](./kds_proje/ER_Diyagrami.png)


---

## 👨‍💻 Hazırlayan

* **Egemen Cömert** - [GitHub Profilim](https://github.com/egemencomert)

---
