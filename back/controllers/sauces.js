const Sauce = require("../models/Sauce");

exports.getSauces = async(req, res, next) => {
    let sauces;
    try {
        //retrieve all sauces from the database
        sauces = await Sauce.find()
    } catch(error){
        console.error('Error finding sauces:', error);
        throw res.status(500).json({ error: 'Internal Server Error' });
    }

    //makes sure sauces are defined or are not an empty array
    if(!sauces || !sauces.length) {
        return res.status(404).send(new Error("No sauces in database."));
    }

    //send the array of sauces as the response
    const updatedSauces = sauces.map((sauce, i) => {
        return {...sauce._doc, imageUrl: '//localhost:3000/images/' + sauce.imageUrl,}
    }) 
    res.status(200).json(updatedSauces);
}

exports.getSauceById = async(req, res, next) => {
    let sauce;
    try {
        //retrieve individual sauce by id from the database
        sauce = await Sauce.findById(req.params.id);
    } catch(error){
        console.error('Server error finding sauces:', error);
        throw res.status(500).json({ error: 'Internal Server Error' });
    }

    if(!sauce) {
        return res.status(404).send(new Error("Sauce not found!"));
    }
    console.log(sauce);

    //send individual sauce as the response
    res.status(200).json({...sauce._doc, imageUrl: '//localhost:3000/images/' + sauce.imageUrl,});
}

exports.addSauce = async(req, res, next) => {
    try {
        const userId = req.user;
        
        //get and parse sauce info from request body
        const { name, manufacturer, description, mainPepper, heat } = JSON.parse(req.body.sauce);
    
        //get file information from multer
        const imageUrl = req.file.filename;
    
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

exports.updateSauce = async(req, res, next) => {
    //get user and sauce IDs
    const userId = req.user._id;
    const sauceId = req.params.id;

    let sauce;
    try {
        //retrieve individual sauce by id from the database
        sauce = await Sauce.findById(sauceId);
    } catch(error){
        console.error('Error finding sauce:', error);
        throw res.status(500).json({ error: 'Internal Server Error' });
    }
    if(!sauce) {
        return res.status(404).send(new Error("Sauce not found!"));
    }

    if(userId != sauce.userId) {
        console.error('User not authorized to update sauce');
        return res.status(403).json({ error: 'Unauthorized request' });
    }
    
    try {
        //get updated sauce data from request body
        let updatedSauceData;
        
        if (req.file) {
            //if a file is provided, update image URL
            const imageUrl = req.file.filename;
            updatedSauceData = {
                ...JSON.parse(req.body.sauce),
                imageUrl: imageUrl,
            };
        } 
        else {
            //if no file is provided, directly update sauce details from request body
            updatedSauceData = req.body;
        }

        //update the sauce in the database
        const updatedSauce = await Sauce.findByIdAndUpdate(sauceId, updatedSauceData, { new: true });

        res.status(201).json({ message: 'Sauce updated successfully', sauce: updatedSauce });
    } catch (error) {
        console.error('Error updating sauce:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.deleteSauce = async(req, res, next) => {
    //get user and sauce IDs
    const userId = req.user._id;
    const sauceId = req.params.id;

    let sauce;
    try {
        //retrieve individual sauce by id from the database
        sauce = await Sauce.findById(sauceId);
    } catch(error){
        console.error('Error finding sauce:', error);
        throw res.status(500).json({ error: 'Internal Server Error' });
    }
    if(!sauce) {
        return res.status(404).send(new Error("Sauce not found!"));
    }

    if(userId != sauce.userId) {
        console.error('User not authorized to update sauce:', error);
        res.status(403).json({ error: 'Unauthorized request' });
    }

    try {
        //find sauce in database and delete
        const deletedSauce = await Sauce.findByIdAndDelete(sauceId);

        res.status(201).json({ message: 'Sauce deleted successfully', sauce: deletedSauce });
    } catch (error) {
        console.error('Error deleting sauce:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.likeSauce = async(req, res, next) => {
    let sauce;
    try {
        //retrieve individual sauce by id from the database
        sauce = await Sauce.findById(req.params.id);
    } catch(error){
        console.error('Server error finding sauces:', error);
        throw res.status(500).json({ error: 'Internal Server Error' });
    }

    if(!sauce) {
        return res.status(404).send(new Error("Sauce not found!"));
    }

    try {
        //extract userId and like status from request body
        const { like } = req.body;
        const userId = req.user._id;

        //check if the user has already liked or disliked the sauce
        const userLikedIndex = sauce.usersLiked.indexOf(userId);
        const userDislikedIndex = sauce.usersDisliked.indexOf(userId);

        //update sauce likes and dislikes based on user action
        if (like === 1) {
            //if user likes the sauce and is not found in usersLiked array
            if (userLikedIndex === -1) {
                //increment amount of likes and add userId to usersLiked array
                sauce.likes+=1;
                sauce.usersLiked.push(userId);
            }
            //if user likes the sauce and is found in usersDisliked array
            if (userDislikedIndex !== -1) {
                //decrement amount of dislikes and remove userId from usersDisliked array
                sauce.dislikes-=1;
                sauce.usersDisliked.splice(userDislikedIndex, 1);
            }
        } 
        else if (like === -1) {
            //if user dislikes the sauce and is not found in usersDisliked array
            if (userDislikedIndex === -1) {
                //increment amount of dislikes and add userId to usersDisliked array
                sauce.dislikes+=1;
                sauce.usersDisliked.push(userId);
            }
            //if user dislikes the sauce and is found in usersLiked array
            if (userLikedIndex !== -1) {
                //decrement amount of likes and remove userId from usersLiked array
                sauce.likes-=1;
                sauce.usersLiked.splice(userLikedIndex, 1);
            }
        } 
        else if (like === 0) {        
            //if user cancels like/dislike and is found in usersLiked array
            if (userLikedIndex !== -1) {
                //decrement amount of likes and remove userId from usersLiked array
                sauce.likes-=1;
                sauce.usersLiked.splice(userLikedIndex, 1);
            }
            //if user cancels like/dislike and is found in usersDisliked array
            if (userDislikedIndex !== -1) {
                //decrement amount of dislikes and remove userId from usersDisliked array
                sauce.dislikes-=1;
                sauce.usersDisliked.splice(userDislikedIndex, 1);
            }
        } 
        else {
            return res.status(400).json({ error: 'Invalid like value' });
        }

        //save the updated sauce to the database
        await sauce.save();

        res.status(201).json({ message: 'Like status updated successfully', sauce });
    } catch (error) {
        console.error('Error updating like status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
}