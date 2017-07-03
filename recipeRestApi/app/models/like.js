const Sequelize = require('sequelize');

defineModelLike = function(sequelize){
	return(
		sequelize.define('like', {
			id_user: Sequelize.INTEGER,
		})
	)
}

module.exports = defineModelLike;



