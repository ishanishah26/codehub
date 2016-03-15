
module.exports = function(app) {
  var mysql = require('mysql');
  var connection = require('./config');



  //coonetion
  var connect = mysql.createConnection(connection.config)
  	connect.connect(function(err){
  	if(!err)
  	console.log("connect in addArticle");
  	else
  	console.log("error in connection");
  	});



//============================display article category sidebar===================
app.get('/insertart',function(req,res,next){
  connect.query("SELECT * FROM category",function(err,rows,fields){
		if(!err)
		{
			res.render('addArticle',{title : "addArticle", data: rows});
		}
		else
		{
			res.send("error");
		}
	});
  //res.render('addArticle', {user: req.user});
});


//=======================add article call =====================
app.get('/insertart', function(req, res) {
    console.log("inlogout");
    res.redirect('/home/insertart');
  });

//=====================insert article ============================
app.post('/addart', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
      var input = {
      c_id: input.c_name,
      subject:input.subject,
      post_dis:input.dis,
      tag:input.tag,
      contains:input.cod,
      }


	console.log(input);
	connect.query("INSERT INTO post set ? ",input,function(err){
		if(!err)
		{
			res.send("inserted");
		}
		else
		{
			res.send("error");
		}

	});
});

}
//export
// //==========include============
// app.get('/include',function(req,res,next){
//
//
//   res.render('include',{title : "test"});
// });
