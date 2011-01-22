var util = require('util.js');

/* Talk mode.
 * This is the main mode.
 */

/* Given a string, look for a user name at the start. Return this as
 * target and the rest of the message after space as rest. Return null*/
function parseTarget(s) {
    var caps;
    caps = /^(\S+)\s*(\S.*)/.exec(s);
    if (!caps) {
        return null;
    }

    return {target: caps[1],
            rest:   caps[2]};
}

/* Message to all users */
function say (user, msg) {
    var out = user.name + ': ' + msg;
    util.wall(out);
}

function tell (user, target, msg) {
    var out;
    if (user === target) {
        out = msg + ", you tell yourself";
    } else {
        user.name + " tells you: " + msg;
    }

    target.println(out);
}

function emote (user, msg) {
    var out = "*" + user.name + " " + msg;
    util.wall(out);
}

function load () {}

function parse (user, input) {
    input = util.chomp(input);

    var cmd, args, caps;
    caps = /^(\S+)\s*(.*)/.exec(input);
    if (!caps) {
        return 0;
    }
    cmd = caps[1];
    args = caps[2];

    var p;
    switch (cmd) {
    case "say":
        say(user, args);
        return 1;
    case "tell":
        p = parseTarget(args);
        if (p) {
            var target = users.forName(p.target);
            if (!target) {
                user.err("no such user");
                return 1;
            }
            tell(user, target, p.rest);
        } else {
            user.err("tell user message");
        }
        return 1;
    case "emote":
        emote(user, args);
        return 1;
    }
    return 0;
}

exports.load = load;
exports.parse = parse;
