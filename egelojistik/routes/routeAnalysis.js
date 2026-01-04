const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        // En Karlı Rotalar (Çok sefer yapılan) (PHP de >0 filtre var, ama burda mantık değişebilir, PHP'ye sadık kalalım)
        // PHP Kodu: HAVING sefer_sayisi > 0
        const query = `
            SELECT 
                CONCAT(s1.Sehir_Adi, ' - ', s2.Sehir_Adi) as Rota,
                COUNT(sef.id) as Sefer_Sayisi,
                AVG(sef.Navlun_Bedeli - sef.Yakit_Gideri) as Ortalama_Kar,
                SUM(sef.Tasinan_Tonaj) as Toplam_Tonaj
            FROM seferler sef
            JOIN sehirler s1 ON sef.Kalkis_Sehri_ID = s1.id
            JOIN sehirler s2 ON sef.Varis_Sehri_ID = s2.id
            GROUP BY sef.Kalkis_Sehri_ID, sef.Varis_Sehri_ID
            HAVING Sefer_Sayisi > 0
            ORDER BY Ortalama_Kar DESC
        `;
        const [rotalar] = await db.query(query);

        // Verimsiz Rotalar (Kar < 10000 TL)
        const verimsizQuery = `
           SELECT 
                CONCAT(s1.Sehir_Adi, ' - ', s2.Sehir_Adi) as Rota,
                AVG(sef.Navlun_Bedeli - sef.Yakit_Gideri) as Ortalama_Kar
            FROM seferler sef
            JOIN sehirler s1 ON sef.Kalkis_Sehri_ID = s1.id
            JOIN sehirler s2 ON sef.Varis_Sehri_ID = s2.id
            GROUP BY sef.Kalkis_Sehri_ID, sef.Varis_Sehri_ID
            HAVING Ortalama_Kar < 10000
            ORDER BY Ortalama_Kar ASC
        `;
        const [verimsizRotalar] = await db.query(verimsizQuery);

        res.render('route-analysis', { rotalar, verimsizRotalar });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
});

module.exports = router;
