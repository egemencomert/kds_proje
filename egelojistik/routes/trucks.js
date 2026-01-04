const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        // Tır Listesi ve İstatistikleri
        const query = `
            SELECT 
                t.ID, t.Plaka, t.Model, t.Kapasite_Ton,
                COUNT(sef.id) as Toplam_Sefer,
                COALESCE(SUM(sef.Tasinan_Tonaj), 0) as Toplam_Tasima,
                COALESCE(SUM(sef.Navlun_Bedeli - sef.Yakit_Gideri), 0) as Toplam_Kazanc
            FROM tirlar t
            LEFT JOIN seferler sef ON t.ID = sef.Tir_ID
            GROUP BY t.ID
            ORDER BY Toplam_Kazanc DESC
        `;
        const [tirlar] = await db.query(query);
        res.render('trucks', { tirlar });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
});

module.exports = router;
