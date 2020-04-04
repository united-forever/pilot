const {MongoClient} = require('mongodb');

// Connect to Mongodb server
async function main(){

const uri = "mongodb+srv://yash_verma:*****@jspsych-eymdu.mongodb.net/test_db?retryWrites=true&w=majority";
const client = new MongoClient(uri);

try{
    await client.connect();

    await listDatabases(client);

}  catch (e) {
    console.error(e);
}
finally {
    await client.close();
}
}
main().catch(console.error);

