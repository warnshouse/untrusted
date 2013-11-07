#BEGIN_PROPERTIES#
{
    "commandsIntroduced": ["map.getAdjacentEmptyCells"]
}
#END_PROPERTIES#
/*
 * robot.js
 *
 * Dr. Eval had nowhere to go. The door was locked.
 * Fortunately, his trusty robot companion showed up
 * just in the nick of time with the key that he needed.
 */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startLevel(map) {
    map.placePlayer(map.getWidth()-2, map.getHeight()-2);

    map.defineObject('robot', {
        'type': 'dynamic',
        'symbol': 'R',
        'color': 'gray',
        'inventory': ['key'],
        'onCollision': function (player, me) {
            me.giveItemTo(player, 'key');
        },
        'behavior': function (me) {
#BEGIN_EDITABLE#
            // move randomly
            var moves = map.getAdjacentEmptyCells(me.getX(), me.getY());
            // getAdjacentEmptyCells gives array of ((x, y), direction) pairs
            me.move(moves[getRandomInt(0, moves.length - 1)][1]);













































#END_EDITABLE#
        }
    });

    map.defineObject('barrier', {
        'symbol': '░',
        'color': 'purple',
        'impassable': true,
        'passableFor': ['robot']
    });

    map.defineObject('lock', {
        'symbol': String.fromCharCode(0x13cc),
        'color': 'gray',
        'impassable': function (player) {
            return !player.hasItem('key');
        }
    });

    map.placeObject(0, map.getHeight() - 1, 'exit');
    map.placeObject(0, map.getHeight() - 2, 'lock');
    map.placeObject(1, map.getHeight() - 1, 'lock');
    map.placeObject(1, 1, 'robot');
    map.placeObject(map.getWidth() - 2, 9, 'barrier');

    var autoGeneratedMaze = new ROT.Map.DividedMaze(map.getWidth(), 10);
    autoGeneratedMaze.create( function (x, y, mapValue) {
        // don't write maze over robot or barrier
        if ((x == 1 && y == 1) || (x == map.getWidth() - 2 && y == 9)) {
            return 0;
        } else if (mapValue === 1) { //0 is empty space 1 is wall
            map.placeObject(x,y, 'block');
        } else {
            map.placeObject(x,y,'empty');
        }
    });
}

function validateLevel(map) {
    validateExactlyXManyObjects(map, 1, 'exit');
}