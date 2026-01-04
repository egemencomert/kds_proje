const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Helper functions for views (similar to PHP helpers)
app.locals.formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
};

app.locals.formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
};

// Routes
const indexRoutes = require('./routes/index');
const tripsRoutes = require('./routes/trips');
const trucksRoutes = require('./routes/trucks');
const routeAnalysisRoutes = require('./routes/routeAnalysis');

app.use('/', indexRoutes);
app.use('/seferler', tripsRoutes);
app.use('/tirlar', trucksRoutes);
app.use('/rota-analizi', routeAnalysisRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
