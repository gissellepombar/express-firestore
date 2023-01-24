import dbConnect from "./dbConnect.js"

export function getAllRestaurants(req, res) {
    const db = dbConnect();
    res.send('All Restaurants')
};

export function getRestaurantById(req, res) {
    //const restId= req.params.restId (can rewrite using destructuring, check phone for pic jan 24)
    const db = dbConnect();
    const { restId } = req.params
    res.send('Got Restaurant: ' + restId)
};

export function createRestaurant(req, res) {
    const db = dbConnect();
    const newRestaurant = req.body
    res.status(201).send('Added Restaurant')
}

