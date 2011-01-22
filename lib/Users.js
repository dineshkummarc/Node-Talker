var util = require('./util.js');

/* Maintains the colletion of users signed on */

Users.prototype.all = function () {
    return this.list;
};

Users.prototype.forConn = function (conn) {
    for (i = 0; i < this.list.length; ++i) {
        if (this.list[i].conn === conn) {
            return this.list[i];
        }
    }
    return null;
};

Users.prototype.forName = function (name) {
    for (i = 0; i < this.list.length; ++i) {
        if (this.list[i].name === name) {
            return this.list[i];
        }
    }
    return null;
};

Users.prototype.add = function (user) {
    this.list.push(user);
};

Users.prototype.remove = function (conn) {
    var i;
    for (i = 0; i < this.list.length; ++i) {
        if (this.list[i].conn === conn) {
            var name = this.list[i].name;
            this.list.splice(i, 1);
            util.wall(name + " disconnected");
            return;
        }
    }
    console.log("Disconnected stream not associated with any user");
};

function Users () {
    this.list = [];
}

exports.Users = Users;