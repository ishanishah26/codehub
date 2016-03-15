
var mysql = require('mysql');
var connection = require('./config');
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;

//coonetion

var connect = mysql.createConnection(connection.config)
	connect.connect(function(err){
	if(!err)
	console.log("done connection");
	else
	console.log("error in connection");
	});

module.exports = function(passport) {
	var salt = bcrypt.genSaltSync(10);

    passport.serializeUser(function(user, done) {
        done(null, user.session_id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connect.query("SELECT * FROM users WHERE session_id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });
//---==================================signup=======================
//=====================================authentication by passport=================

 passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, i will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
					var path=req.file.path;
					console.log(path);
					var imgpath=path.substring(6);
						console.log(imgpath);
 		console.log("in signup");
            connect.query("SELECT * FROM users WHERE email = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));

                } else {
                    var newUser = {
 												fname: req.body.fname,
												lname:req.body.lname,
                        email: username,
                        password: bcrypt.hashSync(password, salt),
												img:imgpath,

                    };
 				console.log(newUser);
                    var insertQuery = "INSERT INTO users ( fname,lname, email, password,image ) values (?,?,?,?,?)";

                    connect.query(insertQuery,[newUser.fname,newUser.lname, newUser.email, newUser.password,newUser.img],function(err, rows) {
											console.log(rows);
											console.log(rows.insertId);
                      newUser.session_id= rows.insertId;
												console.log(newUser.session_id);
                        return done(null, newUser);
                    });
                }
            });
        })
    );

//===========================signin======================
passport.use(
        'local-signin',
        new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
			},
        function(req, username, password, done) {
					console.log("in login");
					console.log(username);
            connect.query("SELECT * FROM users WHERE email = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                else
                {
						//console.log(bcrypt.compareSync(password, rows[0].password));
						console.log("passport return data");
						console.log(bcrypt.compareSync(password, rows[0].password));
					 if (!bcrypt.compareSync(password, rows[0].password))
					 	return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
						return done(null, rows[0]);
				}
            });
        })
    );

}
