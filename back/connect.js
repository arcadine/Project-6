const mongoose = require('mongoose');

async function main(){
    /**
     * Connection URI
     */
    const uri = "mongodb+srv://diegojorge:PN98aHCVeJzuZ66c@cluster0.zbiv8ez.mongodb.net/?retryWrites=true&w=majority";
 

    mongoose.connect(uri)
    .then(
        function(){console.log('Successfully connected')
    })
        .catch(
            function(){console.error('Could not connect to database')
        });
 
    // try {
    //     // Connect to the MongoDB cluster
    //     await client.connect();
 
    //     // Make the appropriate DB calls
    //     await  listDatabases(client);
 
    // } catch (e) {
    //     console.error(e);
    // } finally {
    //     await client.close();
    // }
}

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

main().catch(console.error);