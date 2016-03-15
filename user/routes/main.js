var multer=require('multer');
module.exports = function(app, passport) {
		//route for profile req
		app.get('/home', isLoggedIn ,function(req,res,next){
			res.render('home', {user: req.user});
		})

		// app.post('/signup',  passport.authenticate('local-signup', {
    //         successRedirect : '/profile',
    //         failureRedirect : '/',
    //         failureFlash : true
		// })
    // );

		//==========================signup route============
		app.post('/signup',  multer({ dest: './public/images/'}).single('img'), passport.authenticate('local-signup', {
            successRedirect : '/msg',
            failureRedirect : '/',
          failureFlash : true
				}));
//=============================mas route======================
		app.get('/msg',isLoggedIn,function(req,res,err){
			res.render('index', { title: 'Express' , msg: 'Sucessfully singuped login here' });
		});

						app.post('/signin', passport.authenticate('local-signin', {
            successRedirect : '/home',
            failureRedirect : '/',
            failureFlash : true
					}),
 	function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              						req.session.cookie.maxAge = 1000 * 60 * 3;
            }
					 else {
              						req.session.cookie.expires = false;
            }
        	res.redirect('/');
			}
       );

//=======================logout route============================
	app.get('/logout', function(req, res) {
			console.log("inlogout");
			req.logout();
			res.redirect('/');
		});


}//export

	function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}

//module.exports = router;
