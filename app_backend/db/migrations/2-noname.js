'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "password" to table "users"
 * addColumn "email" to table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2025-07-16T10:44:22.294Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "users",
            "password",
            {
                "type": Sequelize.STRING,
                "field": "password",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "email",
            {
                "type": Sequelize.STRING,
                "field": "email",
                "unique": true,
                "allowNull": false
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
