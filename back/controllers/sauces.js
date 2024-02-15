const Sauce = require("../models/Sauce");

exports.getSauces = async(req, res, next) => {
    //retrieve all sauces from the database
    const sauces = await Sauce.find();

    if(!sauces) {
        return res.status(404).send(new Error("No sauces in database."));
    }

    //send the array of sauces as the response
    res.status(200).json({ sauces });
}

exports.getSauceById = async(req, res, next) => {
    //retrieve individual sauce by id from the database
    const sauce = Sauce.findById(req.params.id);

    if(!sauce) {
        return res.status(404).send(new Error("Sauce not found!"));
    }

    res.status(200).json({ sauce });
}

exports.addSauce = async(req, res, next) => {
    try {
        //get and parse sauce info from request body
        const { userId, name, manufacturer, description, mainPepper, heat } = JSON.parse(JSON.stringify(req.body.sauce));
    
        //get file information from multer
        const imageUrl = req.file.path;
    
        // Create a new sauce instance
        const newSauce = new Sauce({
          userId: userId,
          name: name,
          manufacturer: manufacturer,
          description: description,
          mainPepper: mainPepper,
          imageUrl: imageUrl,
          heat: heat,
          likes: 0,
          dislikes: 0,
          usersLiked: [],
          usersDisliked: [],          
        });
    
        //save the sauce to the database
        const savedSauce = await newSauce.save();
    
        res.status(201).json({ message: 'Sauce added successfully', sauce: savedSauce });
      } catch (error) {
        console.error('Error adding sauce:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
//exports.func = async (req, res, next) => {
    //     try {
    //       // Get user ID from decoded token
    //       const userId = req.user._id;
//};