const express=require("express");
const app=express();
const path=require("path");
const ejsMate=require("ejs-mate");
const mongoose=require("mongoose");
const Fort=require("./modules/fort");
const MethodOverride =require("method-override");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

mongoose.connect('mongodb://localhost:27017/Trekking', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection opened");
});

app.engine("ejs",ejsMate);
app.use(express.urlencoded({extended:true}));
app.use(MethodOverride("_method"));

app.get('/forts',async (req,res)=>{
    const fort=await Fort.find({});
    res.render("fortinfo/index",{fort});
})

app.get('/forts/new',(req,res)=>{
    res.render("fortinfo/new");
})

app.post('/forts',async (req,res)=>{
    const fort=new Fort(req.body.fort);
    await fort.save();
    //console.log(fort);
    res.redirect(`/forts/${fort._id}`);
    //res.send(req.body);
})

app.get('/forts/:id' ,async (req,res)=>{
    const fort=await Fort.findById(req.params.id);
    res.render("fortinfo/show",{fort});
})

app.get('/forts/:id/edit' ,async (req,res)=>{
    const fort=await Fort.findById(req.params.id);
    res.render("fortinfo/edit",{fort});
})

app.put('/forts/:id',async (req,res)=>{
    const {id}=req.params;
    const fort=await Fort.findByIdAndUpdate(id,{...req.body.fort});
    res.redirect(`/forts/${fort._id}`);
})

app.delete('/forts/:id',async (req,res)=>{
    const {id}=req.params;
    await Fort.findByIdAndDelete(id);
    res.redirect('/forts');
})

app.listen(3000,()=>{
    console.log("hello");
})