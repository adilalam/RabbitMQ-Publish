require('dotenv').config();
const { connect, close } = require('./sqlCon');
const { connectDB, db } = require('./mongoCon');
const { publish } = require('./publisher')

async function executingSql() {
    try {
        // before each execution get last offset from mongoDB
        await connectDB();
        let collection = await db.collection("keepTrack");
        let res = await collection.findOne();
        // console.log('data ', res.lastPage);

        let skipPage = res.lastPage;
        let limit = 1000;

        const conn = await connect();

        const [totalCount] = await conn.query(`SELECT count(*) from inventory`);

        // console.log('total count ', totalCount[0]['count(*)']);

        let allSQLData = totalCount[0]['count(*)'];

        if (skipPage < allSQLData) {
            const [results] = await conn.query(`SELECT * from inventory limit ${limit} offset ${skipPage}`);
            let tempObj = {
                results,
                lastPage: skipPage + limit,
                id: res._id
            };
            publish('test_queue', JSON.stringify(tempObj));
            // console.log('Query result:', results);
            // console.log('new page limit:', newLastPage);
            // await close();
        } else {
            console.log("All data processed.")
        }

    } catch (error) {
        console.log('Something wrong.')
    }
}

// executingSql();

module.exports = executingSql;