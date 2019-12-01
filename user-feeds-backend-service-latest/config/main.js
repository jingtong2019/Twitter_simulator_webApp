module.exports = {
    'database': process.env.database || 'mongodb+srv://saitwitter:saitwitter@saiprithipa-cluster-fz95b.mongodb.net/saitwitter?retryWrites=true&w=majority',
    'tweetDatabase': process.env.tweetDatabase || 'mongodb://user1:user1password@ec2-52-53-158-214.us-west-1.compute.amazonaws.com:27017/mydb',
    'topics': process.env.topics || 'twitter_feed_request_topic,feed_action_request_topic,follower_request_topic,profile_view_request_topic',
    'userServiceUrl': process.env.userServiceUrl || 'http://52.9.121.254:5000',
    'tweetServiceUrl': process.env.tweetServiceUrl || 'http://ec2-54-67-17-39.us-west-1.compute.amazonaws.com:3001',
    'useRedisCache': process.env.useRedisCache || false,
    'useConnectionPooling': process.env.useConnectionPooling || true
  };