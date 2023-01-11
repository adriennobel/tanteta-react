import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
/* GETS RID OF BELOW ERROR 
Access to XMLHttpRequest at 'http://localhost:8000/api/days' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
*/

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/check/:date', async (req, res) => {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@bookingdaysdb.nvf7jlo.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);

    const { date } = req.params;

    try {
        await client.connect();
        await findThisDayObject(client, date);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

    async function findThisDayObject(client, date) {
        const result = await client.db("tanteta-app-db").collection("dayObjectWithTimeSlots").findOne({ date: date });
        const defaultTimeslots = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];

        if (result) {
            console.log("DB Found");
            res.send(result.timeSlotsAvailable);
        } else {
            console.log("Nothing to show!");
            res.send(defaultTimeslots);
            // res.sendStatus(404)
        }
    }

});

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});


// npx nodemon src/server.js
// mongosh
// ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"]