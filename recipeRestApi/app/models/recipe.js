const Sequelize = require('sequelize');

defineModelRecipe = function(sequelize){
	return(
		sequelize.define('recipe', {
			caption: Sequelize.STRING,
			resources: Sequelize.STRING,
			procedure: Sequelize.STRING,
			img: Sequelize.STRING
		})
	)
}

module.exports = defineModelRecipe;

