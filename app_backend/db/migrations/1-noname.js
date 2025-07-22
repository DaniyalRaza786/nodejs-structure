'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2025-07-14T16:30:12.864Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "users",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "primaryKey": true,
                "autoIncrement": true
            },
            "first_name": {
                "type": Sequelize.STRING(25),
                "field": "first_name"
            },
            "last_name": {
                "type": Sequelize.STRING(25),
                "field": "last_name"
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}];

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
