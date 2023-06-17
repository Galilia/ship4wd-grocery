const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());

app.get('/data', (req, res) => {
    fs.readFile('./data/shopData.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        let shopData = JSON.parse(data);

        const { fromDate, toDate } = req.query;

        console.log('Received fromDate:', fromDate);
        console.log('Received toDate:', toDate);

        if (fromDate && toDate) {
            shopData = shopData.filter((item) => {
                const date = new Date(item.date);
                return date >= new Date(fromDate) && date <= new Date(toDate);
            });
        }

        res.json(shopData);
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
