// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Sequelize  = require('sequelize');
var defineModelRecipe = require('./app/models/recipe');
var defineModelLike = require('./app/models/like');
var bodyParser = require('body-parser');
var Recipe;
var Like;
var sequelize

const TOKEN = "token123"
const userID = 1;



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:500000}));

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });  
    //res.sendfile('public/index.html');   
});

router.route('/recipes/:recipe_id')
	.post(function(req, res) {
		Recipe.findById(req.params.recipe_id).then(recipe =>{
			recipe.update({
				caption: req.body.caption,
				resources: req.body.resources,
				procedure: req.body.procedure,
				img: req.body.img
			});
			res.json({ message: 'Done'})   
		}, (err)=>{
			res.json({message: err})
		});
    })
	.delete(function(req, res) {
        Recipe.destroy({ where: {id : req.params.recipe_id}}).then(()=>{
			res.json({ message: 'Done'});  
		},(err)=> {
			res.json({ message: err});  
		});
    });

router.route('/recipes/:recipe_id/like')
	.post(function(req, res) {
		//if(req.body.token === TOKEN){
			Like.findOrCreate({where: {recipe_id : req.params.recipe_id, id_user : userID}}).then(()=>{
				res.json({ message: 'Done'});  
			},(err)=> {
				res.json({ message: err});  
			});
		//}
    })
	
	.delete(function(req, res) {
        Like.destroy({ where: {recipe_id : req.params.recipe_id, id_user : userID}}).then(()=>{
			res.json({ message: 'Done'});  
		},(err)=> {
			res.json({ message: err});  
		});
    });
	

// more routes for our API will happen here
router.route('/recipes')
	.get(function(req, res){
	sequelize.query("SELECT `recipe`.`id`, `recipe`.`caption`, `recipe`.`resources`, `recipe`.`procedure`, `recipe`.`img`, `recipe`.`createdAt`, `recipe`.`updatedAt`, COUNT(likes.recipe_id) AS `likesCount`, COUNT(l2.recipe_id) AS `liked` FROM `recipes` AS `recipe` LEFT OUTER JOIN `likes` AS `likes` ON `recipe`.`id` = `likes`.`recipe_id` LEFT OUTER JOIN `likes` AS `l2` ON `l2`.`recipe_id` = `recipe`.`id` AND `l2`.`id_user` = 1 GROUP BY `recipe`.`id`")
		.spread((recipes,metadata) => {
			res.json(recipes);
		});
	})

    // create a recipe (accessed at POST http://localhost:8080/api/recipes)
    .post(function(req, res) {
        Recipe.create({
			caption: req.body.caption,
			resources: req.body.resources,
			procedure: req.body.procedure,
			img: req.body.img
		}).then(()=>{
			res.json({ message: 'Done'});  
		},(err)=> {
			res.json({ message: err});  
		});
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

getReadDb();

function getReadDb(){
	sequelize = new Sequelize('database', 'username', 'password', {
		host: 'localhost',
		  dialect: 'sqlite',
		  pool: {
			max: 5,
			min: 0,
			idle: 10000
		  },
		// SQLite only
		storage: './app/models/recipes.db'
	});
	
	Recipe = defineModelRecipe(sequelize);
	Like = defineModelLike(sequelize);
	
	
	
	Like.belongsTo(Recipe, {foreignKey: 'recipe_id'});
	Recipe.hasMany(Like,{ foreignKey: 'recipe_id'});
	
	Recipe.sync({force: false})
	Like.sync({force: false})
}






