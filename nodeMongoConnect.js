const {MongoClient} = require('mongodb');

// Connect to Mongodb server
async function main(){

const uri = "mongodb+srv://yash_verma:161195@jspsych-eymdu.mongodb.net/test?retryWrites=true&w=majority";
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

