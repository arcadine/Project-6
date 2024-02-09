const mongoose = require("mongoose");

async function main() {
	/**
	 * Connection URI
	 */
	const uri = "mongodb+srv://diegojorge:PN98aHCVeJzuZ66c@cluster0.zbiv8ez.mongodb.net/?retryWrites=true&w=majority";

	mongoose.connect(uri)
		.then(function () {
			console.log("Successfully connected");
		})
		.catch(function () {
			console.error("Could not connect to database");
		});
}

main().catch(console.error);
