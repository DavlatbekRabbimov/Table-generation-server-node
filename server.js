const app = require('./app');
const generateData = require('./data');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

app.post('/export', function(req, res) {

    const data = req.body;

    if (!data) {
        res.status(500).send('Failed to generate data');
        return;
    }

    const csvWriter = createCsvWriter({
        header: [
            {id: 'id', title: 'ID'},
            {id: 'randomId', title: 'Random ID'},
            {id: 'name', title: 'Name'},
            {id: 'address', title: 'Address'},
            {id: 'phone', title: 'Phone'},
        ],
        path: 'out.csv'
    });

    csvWriter.writeRecords(data)
        .then(() => {
            res.download('out.csv');
        });
});

app.get('/generate', (req, res) => {

    try {
        const region = req.query.region;
        const errors = Number(req.query.errors);
        const seed = Number(req.query.seed);
        const page = Number(req.query.page);
        const range = Number(req.query.range);
        const data = generateData(region, errors, seed, page, range);
        res.json(data);
    } catch (err) {
        console.log(err);
    }

});

