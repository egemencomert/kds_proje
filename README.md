# 🚛 Lojistik Filo ve Sefer Yönetimi - Karar Destek Sistemi (KDS)

Bu proje, bir lojistik firmasının araç filosunu yönetmek, sefer kârlılığını analiz etmek ve operasyonel kararları veri odaklı bir şekilde optimize etmek için geliştirilmiş bir **Karar Destek Sistemi** uygulamasıdır.

## 📝 Proje Açıklaması

Sistem, lojistik süreçlerinde karşılaşılan karmaşık verileri (yakıt tüketimi, rota verimliliği, araç bakım döngüleri) işleyerek karar vericilere stratejik öngörüler sunar. Node.js tabanlı geliştirilen bu çözüm, manuel takibi minimize ederek filonun doluluk oranını ve operasyonel hızını artırmayı hebebler.

## 🎭 Senaryo Tanımı

**Senaryo:** "Lojistik A.Ş." adında, bünyesinde 50'den fazla çekici ve treyler bulunduran bir firmanın yönetim süreçleri simüle edilmiştir.

* **Problem:** Hangi aracın hangi rotada daha az yakıt yaktığının takip edilememesi ve bakım zamanı gelen araçların sefer sırasında arıza yaparak lojistik zincirini aksatması.
* **KDS Çözümü:** Sistem, geçmiş sefer verilerini kullanarak her rota için en ideal aracı önerir, araçların bakım takvimini otomatik izler ve sefer bazlı kâr-zarar analizi yapar.

## 🛠️ Kurulum Adımları

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları takip edin:

1. **Depoyu Klonlayın:**
```bash
git clone https://github.com/egemencomert/kds_proje.git
cd kds_proje

```


2. **Bağımlılıkları Yükleyin:**
```bash
npm install

```


3. **Ortam Değişkenlerini Yapılandırın:**
* Kök dizinde bir `.env` dosyası oluşturun.
* Veritabanı bağlantı adresinizi (MongoDB URI veya SQL Config) ve port bilgilerinizi ekleyin.


4. **Uygulamayı Başlatın:**
```bash
# Geliştirme modu (Nodemon ile)
npm run dev

# Standart çalıştırma
npm start

```



## 🔌 API Endpoint Listesi

Uygulama RESTful bir mimari sunar. Temel endpointler aşağıdadır:

| Metot | Endpoint | Açıklama |
| --- | --- | --- |
| `GET` | `/api/trucks` | Filodaki tüm araçları ve anlık durumlarını listeler. |
| `GET` | `/api/trips` | Tüm geçmiş ve aktif seferlerin listesini getirir. |
| `POST` | `/api/trips/calculate` | Bir seferin tahmini maliyet ve kârlılığını hesaplar. |
| `GET` | `/api/analytics/efficiency` | Araç bazlı yakıt ve performans analiz raporu sunar. |
| `PATCH` | `/api/maintenance/update` | Aracın bakım bilgisini ve servis durumunu günceller. |

## 🚀 Kullanılan Teknolojiler

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** [Veritabanı Türünü Buraya Yazın]
* **Versiyon Kontrol:** Git & GitHub

## 📊 ER Diyagramı
Projenin veritabanı tasarımına ve tablolar arası ilişkilere aşağıdaki görselden ulaşabilirsiniz:

![ER Diyagramı](./kds_proje/ER_Diyagrami.png)


---

## 👨‍💻 Hazırlayan

* **Egemen Cömert** - [GitHub Profilin](https://www.google.com/search?q=https://github.com/egemencomert)

---
