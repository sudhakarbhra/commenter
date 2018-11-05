const express = require('express');
const cors = require('cors');
const app = express();
const monk = require('monk');
const mongo = require('mongodb');
const db = monk('localhost/newser');
const news = db.get('news');

app.use(cors());
app.use(express.json());



//  "/" this the first page message
app.get('/',(req,res)=>{
	res.json({
		message:"This is a meow message 😹 🐈"
	});
});

// "/news" subfolder message
app.get('/news',(req,res,next)=>{
	news
	.find()
	.then(news=>{
		res.json(news)
	}).catch(next);
});

app.post('/news', (req, res, next) => {
console.log(req.body);
const msg={
	name:req.body.name.toString(),
	content:req.body.content.toString(),
	created:new Date()
};
news
	.insert(msg)
	.then(createdMsg=>{
		res.json(createdMsg);
	})

});






// launcing the server
app.listen(5000,()=>{
console.log("Listening at 5000");
});





// To display error
app.use((error, req, res, next) => {
  res.status(500);
  res.json({
    message: error.message
  });
});