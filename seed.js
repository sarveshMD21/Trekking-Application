const mongoose=require("mongoose");
const Fort=require("./modules/fort");

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

const v1=["takeshi","death","orion","yaiba","enron","valera"];
const v2=["castle","star","belt","delta","core","sptilz"];
const v3=["boring","banger","bullshit","best","haha","trollololo"];

const seedb=async ()=>{
  
for(let p1 of v1){
  for(let p2 of v2){
    for( let p3 of v3){
      var na=p1+p2;
      var di=p3;
      var num=Math.floor(Math.random()*10000);
      num=num.toString();
      const fort =new Fort({
         title:na,
         price:num,
         description:di,
         location:"Maharashtra"})
      await fort.save();
      //console.log(fort);
    }
  }
}
}
//seedb();
/*Fort.insertMany([
{title:"Singhad Fort",price:"100",description:"best",location:"Maharashtra"},
{title:"Raigad Fort",price:"200",description:"best",location:"Maharashtra"},
{title:"Rajmachi Fort",price:"100",description:"best",location:"Maharashtra"},
{title:"Purandar Fort",price:"150",description:"best",location:"Maharashtra"},
{title:"Malhargad Fort",price:"300",description:"best",location:"Maharashtra"},
{title:"Panhala Fort",price:"1000",description:"best",location:"Maharashtra"},
{title:"Pratapgad Fort",price:"500",description:"best",location:"Maharashtra"},
{title:"Korigad Fort",price:"180",description:"best",location:"Maharashtra"}
]).then(data=>{
    console.log(data);
})*/