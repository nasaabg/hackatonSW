$(document).ready(function(){
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
        player = new Q.Player()
        stage.insert(player);
        stage.loadAssets(levelAssets);
        stage.add("viewport").follow(player, {
            x: true,
            y: true
        }, {
            minX: 0,
            maxX: background.p.w,
            minY: 0,
            maxY: background.p.h
        });
    });
}
});