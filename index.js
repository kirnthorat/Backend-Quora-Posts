const express =require("express");
const app =express();
const port =8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');// this uuid package that give a uniqe id 
const  methodOverride = require('method-override')
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(methodOverride('_method'))
app.set("view engin","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"kiran",
        content:" I got my first internship in TCS",
    },
    {
        id:uuidv4(),
        username:"Prashant",
        content:"I got my first internship in infosys",
    },
    {
        id:uuidv4(),
        username:"Rameshwar",
        content:"I got my frist internship in google"
    }
];
//this is for access the file 
app.get("/posts", (req, res)=>{
    res.render("index.ejs",{posts});
});
//this is for access the file 
app.get("/posts/any",(req, res)=>{
    res.render("new.ejs");
});

//this is for the post the data 
app.post("/posts",(req,res)=>{
    // console.log(req.body);
    let {username,content}=req.body;
    let id= uuidv4();
    posts.push({id, username, content});
    // console.log(id);
    res.redirect("/posts");
});

// this is for the get the data using the id 
app.get("/posts/:id",(req,res)=>{ 
    let {id}= req.params;
    let post= posts.find((p)=>id === p.id);
    // console.log(post);
    res.render("show.ejs",{post});
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}= req.params;
    let post= posts.find((p)=>id === p.id);
    res.render("edit.ejs",{post})
});
app.patch("/posts/:id",(req,res)=>{
    let {id}= req.params;
    let newContent= req.body.content;// this is for update the content
    let post= posts.find((p)=>id === p.id);
    post.content= newContent;
    console.log(post);
    res.redirect("/posts");
    
});
// delete the post 
app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
     posts= posts.filter((p)=>id !== p.id);
     res.redirect("/posts");})

app.listen(port,(req,res)=>{
    console.log(`listening to port ${port}`);
    
});