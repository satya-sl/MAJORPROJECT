const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

//now setting views for ejs
const path = require("path")

main().then(()=> console.log("Database is connnected")).catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
//view setup completed
app.use(express.urlencoded({extended:true})); // use full to get req.params

//basic first api
app.get("/",(req,res)=>{
   res.send("Hi, im root")
})

app.listen(8080,()=>{
    console.log(" server is listining to the port : 8080")
})

//index route
app.get("/listings",async (req,res)=>{
    const allListings =  await  Listing.find({});
    res.render("./listings/index.ejs",{allListings});
});


app.get("/listings/:id ", async (req,res)=>{
    let {id} = req.params;   //extracting id

    console.log(id)
    const listing = await Listing.findById(id);
    console.log(listing)
   /// res.send("hi")
    res.render("listings/show.ejs",{listing});
})




//show route , shows specific listing data(view)  , for this we already changed in index.js to get "id"

/*
app.get("/testListing", async (req,res)=>{
    let sampleListing = new Listing({
        title: "My new villa",
        description:"by the beach",
        price:1200,
        location: " Calangute, goa",
        country: "India",
    });
    await sampleListing.save();
    console.log(sampleListing);
    res.send("Testing succesful")
})*/