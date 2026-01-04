const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        // 1. ÜST ANALİZ KARTLARI
        const [analizResult] = await db.query(`
            SELECT COUNT(id) as toplam_sefer, 
                   SUM(Navlun_Bedeli) as toplam_ciro, 
                   SUM(Navlun_Bedeli - Yakit_Gideri) as toplam_kar 
            FROM seferler
        `);
        const analiz = analizResult[0];

        // 2. SÜTUN GRAFİĞİ: Şehir Bazlı Sefer Yoğunluğu
        const [sehirYogunluk] = await db.query(`
            SELECT s.Sehir_Adi, COUNT(sef.id) as adet 
            FROM sehirler s 
            JOIN seferler sef ON s.id = sef.Varis_Sehri_ID 
            GROUP BY s.id ORDER BY adet DESC LIMIT 7
        `);

        // 3. PASTA GRAFİĞİ: Rota Bazlı Kar Dağılımı
        const [rotaKarVerileri] = await db.query(`
            SELECT 
                CONCAT(s1.Sehir_Adi, ' - ', s2.Sehir_Adi) as rota_adi, 
                SUM(sef.Navlun_Bedeli - sef.Yakit_Gideri) as toplam_kar 
            FROM seferler sef
            JOIN sehirler s1 ON sef.Kalkis_Sehri_ID = s1.id
            JOIN sehirler s2 ON sef.Varis_Sehri_ID = s2.id
            GROUP BY sef.Kalkis_Sehri_ID, sef.Varis_Sehri_ID 
            ORDER BY toplam_kar DESC LIMIT 5
        `);

        // 4. AKILLI ANALİZ HESAPLAMALARI
        const [enKarliHatResult] = await db.query(`
            SELECT 
                CONCAT(s1.Sehir_Adi, ' -> ', s2.Sehir_Adi) as hat, 
                AVG(sef.Navlun_Bedeli - sef.Yakit_Gideri) as ort_kar 
            FROM seferler sef
            JOIN sehirler s1 ON sef.Kalkis_Sehri_ID = s1.id
            JOIN sehirler s2 ON sef.Varis_Sehri_ID = s2.id
            GROUP BY sef.Kalkis_Sehri_ID, sef.Varis_Sehri_ID 
            ORDER BY ort_kar DESC LIMIT 1
        `);
        const en_karli_hat = enKarliHatResult[0];

        res.render('index', {
            analiz,
            sehir_yogunluk: sehirYogunluk,
            rota_kar_verileri: rotaKarVerileri,
            en_karli_hat
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
});

module.exports = router;
