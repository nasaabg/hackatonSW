$(document).ready(function(){
    level2start = {
        x: 100,
        y: 500,
    }
    level2 = function(){
    Q.scene("level2", function(stage) {
        st = stage;
        var background = new Q.TileLayer({
            dataAsset: 'level2.tmx',
            layerIndex: 0,
            sheet: 'tiles',
            tileW: 70,
            tileH: 70,
            type: Q.SPRITE_NONE
        });
        stage.insert(background);
        stage.collisionLayer(new Q.TileLayer({
            dataAsset: 'level2.tmx',
            layerIndex: 1,
            sheet: 'tiles',
            tileW: 70,
            tileH: 70
        }));
        player.p.x = level2start.x;
        player.p.y = level2start.y;

        stage.insert(player);
        stage.loadAssets(level2Assets);
        stage.add("viewport").follow(player, {
            x: true,
            y: true
        }, {
            minX: 0,
            maxX: background.p.w,
            minY: 0,
            maxY: background.p.h
        });
        Meteor.setTimeout(function(){levelLoaded = false;},2000);
    });
}
});