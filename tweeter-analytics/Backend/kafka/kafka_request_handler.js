const userService = require('../service/user_service')

module.exports = {
    handleRequest: function(event) {
        switch(event.type) {
            case 'login':
                userService.loginUser(event.data);
                break;
            case 'signup':
                userService.saveUser(event.data);
                break;
            default:
                console.log('invalid event type');
        }
    }
};