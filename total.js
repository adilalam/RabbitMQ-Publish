const { connectDB, db } = require('./mongoCon');

async function calculate() {
    try {
        await connectDB();
        let collection1 = await db.collection("dumpCollection");
        let res1 = await collection1.find({}).toArray();
        console.log('total ', res1.length);

        let collection2 = await db.collection("keepTrack");
        let res2 = await collection2.find({}).toArray();
        console.log('length data ', res2);
    } catch (error) {
        console.log("error ", error);
    }
}

calculate();