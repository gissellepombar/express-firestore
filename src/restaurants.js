import { FieldValue } from "firebase-admin/firestore"
import dbConnect from "./dbConnect.js";
const collectionName = "restaurants";

// Get All
export async function getAllRestaurants(req, res) {
    const db = dbConnect()
    //connect to collection
    const collection = await db.collection(collectionName)
    .orderBy('createdAt', 'desc').get()   
    const restaurants = collection.docs.map( (doc) => ({...doc.data(), restId: doc.id}))
    res.send(restaurants)
};

// Get Doc
export async function getRestaurantById(req, res) {
    //const restId= req.params.restId (can rewrite using destructuring, check phone for pic jan 24)
    const db = dbConnect()
    const { restId } = req.params
    const doc = db.collection(collectionName).doc(restId).get()
    const rest = doc.data();

    res.send('Got Restaurant: ' + rest)
};

// Create 
export async function createRestaurant(req, res) {
    const db = dbConnect()
    let newRestaurant = req.body
    // add a timestamp to the new restaurant 
    newRestaurant.createdAt = FieldValue.serverTimestamp()
    await db.collection(collectionName).add(newRestaurant)
    res.status(201).send('Added Restaurant')
};

// Update
export async function updateRestaurantById(req, res) {
    const { restId } = req.params
    const updateInfo = req.body

    const db = dbConnect()
    await db.collection(collectionName).doc(restId).update(updateInfo)
    res.status(202).send('Restaurant Updated')
}

// Delete
export async function deleteRestaurant(req, res) {
    const { restId } = req.params

    const db = dbConnect()
    await db.collection(collectionName).doc(restId).delete()
    res.send('Restaurant Deleted')
}

