const express = require('express');
const router = express.Router();
const db = require('../config/db');

// List Trips
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                sef.id,
                t.Plaka,
                s1.Sehir_Adi as Kalkis,
                s2.Sehir_Adi as Varis,
                sef.Tarih,
                sef.Tasinan_Tonaj,
                sef.Navlun_Bedeli,
                sef.Yakit_Gideri,
                (sef.Navlun_Bedeli - sef.Yakit_Gideri) as kar
            FROM seferler sef
            JOIN tirlar t ON sef.Tir_ID = t.ID
            JOIN sehirler s1 ON sef.Kalkis_Sehri_ID = s1.ID
            JOIN sehirler s2 ON sef.Varis_Sehri_ID = s2.ID
            ORDER BY sef.Tarih DESC
        `;
        const [seferler] = await db.query(query);
        res.render('trips', { seferler });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
});

// Add Trip Form
router.get('/ekle', async (req, res) => {
    try {
        const [tirlar] = await db.query("SELECT * FROM tirlar ORDER BY Plaka ASC");
        const [sehirler] = await db.query("SELECT * FROM sehirler ORDER BY Sehir_Adi ASC");
        res.render('trip-add', { tirlar, sehirler });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
});

// Handle Add Trip Post
router.post('/ekle', async (req, res) => {
    const { tir_id, kalkis_id, varis_id, tarih, tonaj, navlun, yakit } = req.body;
    try {
        await db.query(`
            INSERT INTO seferler (Tir_ID, Kalkis_Sehri_ID, Varis_Sehri_ID, Tarih, Tasinan_Tonaj, Navlun_Bedeli, Yakit_Gideri) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [tir_id, kalkis_id, varis_id, tarih, tonaj, navlun, yakit]);
        res.redirect('/seferler');
    } catch (err) {
        console.error(err);
        res.status(500).send("Ekleme Hatası");
    }
});

module.exports = router;
