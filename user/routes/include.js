exports.displaycat=function(callback){
  connect.query("SELECT * FROM category",function(err,rows,fields){
		if(!err)
		{
			res.render('footer',{ data: rows});
		}
		else
		{
			res.send("error");
		}
	});
  //res.render('addArticle', {user: req.user});
});
