const Feed = require('../models/feed');

module.exports = {
    getUserFeeds:function(userId, callback) {
        const qry = {
            userId: { $eq: userId }
        }
		Feed.find(qry)
			.exec()
			.then(docs => {
				callback(null, docs);
			})
			.catch(err => {
                callback(err, null);
            });
	}
};