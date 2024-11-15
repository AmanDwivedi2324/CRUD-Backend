const express = require('express');              //requiring express
const app = express();                          // invoking express
const path = require('path');                    //requiring path
const userModel = require('./models/user');              //requiring model from user.js

app.set("view engine","ejs");                   // view engine set up as ejs
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));


app.get('/', (req,res) => {                          //creating routes
    res.render('index');
})

app.get('/read', async(req,res) => {
    let allUsers = await userModel.find();              // reading the users
    res.render('read',{users:allUsers});
})

app.get('/delete/:id',async(req,res) => {
    let deletedUser = await userModel.findOneAndDelete({_id: req.params.id});                      //delete on the basis of id 
    res.redirect("/read");                         //after deleting the user, redirect to users page
})

app.get('/edit/:userid', async(req,res) => {
    let user = await userModel.findOne({_id: req.params.userid});
    res.render("edit",{user});
})

app.post('/update/:userid', async(req,res) => {
    let {name,email,image} = req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.userid},{name,email,image}, {new:true});
    res.redirect("/read");
})

app.post('/create', async(req,res) => {
    let {name,email,image}= req.body;                //destructuring 

    let createdUser = await userModel.create({                                   // user creation
        name : name,                                  // it is possible by destructuring otherwise we have to write req.body.name , req.body,email, etc.
        email : email,                                    // if both sides have same term like email:email then we can simply write email
        image: image
    })

    res.redirect("/read");                                 //directly redirect to read page

})

app.listen(3000);                              //port 

//  create public and views folder