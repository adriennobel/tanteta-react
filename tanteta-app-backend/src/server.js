import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
/* GETS RID OF BELOW ERROR 
Access to XMLHttpRequest at 'http://localhost:8000/api/days' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
*/

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/days', async (req, res) => {
    const uri = "mongodb+srv://adriennobel:December2020@tanteta-first.ivq6y1u.mongodb.net/?retryWrites=true&w=majority"

    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client);
        await findThisDayObject(client, "2022-12-23");
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

    async function findThisDayObject(client, date) {
        const result = await client.db("tanteta-app-db").collection("dayObjectWithTimeSlots").findOne({ date: date });

        if (result) {
            console.log(result);
            res.send(result);
        } else {
            console.log("Nothing to show!");
            res.sendStatus(404)
        }
    }

    async function listDatabases(client) {
        const databasesList = await client.db().admin().listDatabases();
        console.log("Admin Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    }

    // const db = client.db('tanteta-app-db');
    // const dayObjects = await db.collection('dayObjectWithTimeSlots').find({});

    // if (dayObjects) {
    //     res.send(dayObjects);
    // } else {
    //     res.sendStatus(404);
    // }

    // res.send(`Hi days!`);
});

app.get('/hello/:name', (req, res) => {
    const { name } = req.params;
    res.send(`Hi ${name}!`);
});

app.post('/api/select-this-new-day-timeslot', (req, res) => {
    const { date, timeSlotsAvailable } = req.body;

    dayObjectWithTimeSlots.push({ date, timeSlotsAvailable });
    res.send(dayObjectWithTimeSlots);
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});


// npx nodemon src/server.js
// mongosh
// ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"]