-- Veritabanı Oluşturma
CREATE DATABASE IF NOT EXISTS ege_lojistik;
USE ege_lojistik;

-- Tabloları Temizle (Geliştirme aşaması için)
DROP TABLE IF EXISTS seferler;
DROP TABLE IF EXISTS tirlar;
DROP TABLE IF EXISTS sehirler;

-- 1. Sehirler Tablosu
CREATE TABLE sehirler (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Sehir_Adi VARCHAR(100) NOT NULL
);

-- 2. Tırlar Tablosu
CREATE TABLE tirlar (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Plaka VARCHAR(20) NOT NULL,
    Kapasite_Ton DECIMAL(10,2) NOT NULL,
    Model VARCHAR(100)
);

-- 3. Seferler Tablosu
CREATE TABLE seferler (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Tir_ID INT,
    Kalkis_Sehri_ID INT,
    Varis_Sehri_ID INT,
    Tarih DATE,
    Tasinan_Tonaj DECIMAL(10,2),
    Navlun_Bedeli DECIMAL(10,2), -- Gelir
    Yakit_Gideri DECIMAL(10,2),  -- Gider
    FOREIGN KEY (Tir_ID) REFERENCES tirlar(ID),
    FOREIGN KEY (Kalkis_Sehri_ID) REFERENCES sehirler(ID),
    FOREIGN KEY (Varis_Sehri_ID) REFERENCES sehirler(ID)
);

-- VERİ EKLEME (SEEDING)

-- Şehirler (İzmir merkezli lojistik için önemli rotalar)
INSERT INTO sehirler (Sehir_Adi) VALUES 
('İzmir'), ('İstanbul'), ('Ankara'), ('Bursa'), ('Antalya'), 
('Adana'), ('Konya'), ('Gaziantep'), ('Denizli'), ('Manisa');

-- Tırlar
INSERT INTO tirlar (Plaka, Kapasite_Ton, Model) VALUES
('35 EGE 01', 25.00, 'Mercedes Actros 2022'),
('35 TR 35', 20.00, 'Volvo FH 2021'),
('35 KSK 1912', 24.00, 'Scania R500 2023'),
('35 GZ 99', 22.00, 'Ford F-Max 2020'),
('35 LOJ 88', 25.00, 'Mercedes Actros 2022');

-- Seferler (30 Adet Gerçekçi Veri - İzmir Çıkışlı/Varışlı)
-- Senaryo: İzmir-İstanbul hattı yoğun ve karlı, ama dolu gidip boş dönme riski var.
-- İzmir-Ankara stabil.

INSERT INTO seferler (Tir_ID, Kalkis_Sehri_ID, Varis_Sehri_ID, Tarih, Tasinan_Tonaj, Navlun_Bedeli, Yakit_Gideri) VALUES
-- İzmir (1) -> İstanbul (2) Seferleri (Yoğun Hat)
(1, 1, 2, '2023-11-01', 24.50, 45000, 18000),
(2, 1, 2, '2023-11-03', 19.80, 42000, 17500),
(3, 1, 2, '2023-11-05', 23.00, 44000, 18200),
(4, 1, 2, '2023-11-08', 21.50, 43000, 17800),
(1, 1, 2, '2023-11-12', 25.00, 46000, 18100), -- Tam kapasite
(5, 1, 2, '2023-11-15', 24.80, 45500, 18300),
(2, 1, 2, '2023-11-20', 19.50, 41000, 17400),

-- İstanbul (2) -> İzmir (1) Dönüş (Genelde daha az yük olabilir veya parsiyel)
(1, 2, 1, '2023-11-03', 15.00, 25000, 17000), -- Düşük karlılık
(3, 2, 1, '2023-11-07', 22.00, 35000, 17500),

-- İzmir (1) -> Ankara (3)
(4, 1, 3, '2023-11-02', 20.00, 32000, 14000),
(5, 1, 3, '2023-11-06', 22.00, 34000, 14500),
(5, 1, 3, '2023-11-14', 21.00, 33000, 14200),

-- İzmir (1) -> Bursa (4)
(2, 1, 4, '2023-11-10', 18.00, 20000, 8000),
(3, 1, 4, '2023-11-18', 23.50, 24000, 8500),

-- İzmir (1) -> Denizli (9) (Kısa Mesafe)
(1, 1, 9, '2023-11-05', 25.00, 12000, 4000),
(1, 1, 9, '2023-11-09', 24.00, 11500, 3800),
(1, 1, 9, '2023-11-25', 25.00, 12000, 4000), -- Sık sefer

-- Denizli (9) -> İzmir (1)
(1, 9, 1, '2023-11-06', 20.00, 9000, 3500),

-- İzmir (1) -> Gaziantep (8) (Uzun Yol - Yüksek Gelir Yüksek Gider)
(4, 1, 8, '2023-11-15', 22.00, 65000, 32000),
(5, 1, 8, '2023-11-25', 24.50, 68000, 33000),

-- Çeşitli Rotalar
(2, 3, 1, '2023-11-09', 18.50, 28000, 13500), -- Ankara -> İzmir
(3, 4, 1, '2023-11-20', 20.00, 18000, 8200),  -- Bursa -> İzmir

-- Karar Destek Algoritmasını Tetikleyecek Veriler:
-- İzmir-İstanbul sefer sayısı zaten yüksek (7+), Doluluk oranlarını yüksek tuttuk.
-- İzmir-Denizli de yüksek doluluk ve sık sefer.

-- Ekstra Seferler
(5, 1, 2, '2023-11-28', 24.00, 45000, 18000),
(3, 1, 2, '2023-11-29', 23.80, 44500, 17900),
(2, 1, 3, '2023-11-22', 19.00, 31000, 13800),
(4, 3, 5, '2023-11-12', 21.00, 30000, 12000), -- Ankara -> Antalya
(1, 5, 1, '2023-11-15', 15.00, 20000, 10000), -- Antalya -> İzmir
(5, 1, 7, '2023-11-30', 25.00, 38000, 15000), -- İzmir -> Konya
(2, 7, 1, '2023-12-02', 12.00, 25000, 14000); -- Konya -> İzmir (Boş dönüş riski)
