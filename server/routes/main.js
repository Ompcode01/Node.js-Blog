const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//----------Routes---------

/* GET Home Page */
router.get('', async (req, res) => {
    //async krdiya kyuki hume await use krna hai niche in try catch
    try{
        const locals = {
            title: "NodeJs Blog",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        let perPage = 6; // Number of posts to display per page
        let page = req.query.page || 1; // Get the current page number from query parameters, default to 1

        const data = await Post.aggregate([ { $sort: { createdAt: -1 } }]) // Sort posts by creation date in descending order]);
        .skip((perPage * page) - perPage) // Skip the posts for previous pages
        .limit(perPage) // Limit the number of posts to display per page
        .exec(); // Execute the query

        const count = await Post.countDocuments(); // Get the total number of posts
        const nextPage = parseInt(page) + 1; //Parse - Number into Integer
        const hasNextPage = nextPage <= Math.ceil(count / perPage); // Check if there is a next page

        res.render('index', {
            locals, 
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null, // Pass the next page number if it exists, otherwise pass null
        });
    } catch(error){
        console.log(error);
    }
    
});

/*
router.get('', async (req, res) => {
    const locals = {
        title: "NodeJs Blog",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
    }
    //async krdiya kyuki hume await use krna hai niche in try catch
    try{
        const data = await Post.find(); //It will fetch all the data from Post collection
        res.render('index', {locals, data});
    } catch(error){
        console.log(error);
    }
    
});
*/



router.get('/about', (req, res) => {
    res.render('about');
});

/*
function insertPostData() {
    Post.insertMany([
        {
            title: "Building a Blog",
            body: "This is the body texxt"
        },
        {
            title: "Building a Blog",
            body: "This is the body texxt"
        },
        {
            title: "Building a Blog",
            body: "This is the body texxt"
        },
        {
            title: "Building a Blog",
            body: "This is the body texxt"
        },
        {
            title: "Building a Blog",
            body: "This is the body texxt"
        }
    ])
}
insertPostData();
*/

module.exports = router;