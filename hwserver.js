var express=require("express");
var path = require("path");
var bodyParser= require("body-parser");
var app= express();
var stuff = require("./htmlRoutes.js"); 

var port=process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

var friendData=[{
    name:"John",
    img:"https://imgartists.com/wp-content/uploads/2016/05/John_Tessier_pc_Rozarii_Lynch_b_72dpi.jpg",
    scores:[1,2,3,4,5,1,2,4,0,5]
},{
    name:"Tyler",
    img:"https://d3tdunqjn7n0wj.cloudfront.net/360x360/34038968-3b64-11e5-948f-3e51dce78b20-11252252b453ea7bef9e07da24f50bde.jpg",
    scores:[ 5,1,4,4,5,1,2,0,4,1]
},
{
    name:"Jacob",
    img:"https://pbs.twimg.com/profile_images/827039211668639744/nOYZDqZj.jpg",
    scores:[0,2,1,0,5,5,0,5,3,4]
}]


app.get('/',function(req, res){
    res.sendFile(path.join(__dirname,'home.html'))
});

app.get('/survey',(req, res) =>{
    res.sendFile(path.join(__dirname,"survey.html"))
});

app.get('/api/friends',(req, res) =>{
    res.send(friendData);
});


app.post('/api/friends/data', (req,res) =>{
var newResult=req.body;
var userData=newResult.scores;
var totalAmount;
var diffrencesArray=[];
var index;
var finalIndex;
totalAmount = userData.reduce(function(a,b){
return parseInt(a)+parseInt(b);
});

for(var i=0; i<friendData.length; i++){
var arrays = friendData[i].scores;
diffrencesArray.push(arrays.reduce(function(a,b){
    return Math.abs((parseInt(a) + parseInt(b))-totalAmount);
}));

}

finalIndex = diffrencesArray.reduce(function(prev,cur,index,array){
    return prev < cur ? prev : cur;

});

index=diffrencesArray.indexOf(finalIndex);

console.log(newResult.scores);
console.log(totalAmount);
console.log(finalIndex);
console.log(diffrencesArray);
console.log(index);
res.json(friendData[index]);
friendData.push(newResult);

});



app.listen(port, function(){
    console.log("I am Listening to 3000");
});