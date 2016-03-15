//================================display article list category wise==================
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

app.get('/getc_art/:cid',function(req,res,next){
  var c_id = req.params.cid;
  console.log(c_id);
  connect.query('select * from post where c_id="'+c_id+'" ',function(err,rows,fields){
    if(!err)
		{
			//res.send(rows);
			res.render('viewart_cat',{title : "category_wise_art", data: rows});
		}
		else
		{
			res.send("error");
		}
	});

});
}
