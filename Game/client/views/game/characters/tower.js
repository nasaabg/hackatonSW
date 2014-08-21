tower = function(){
	Q.Sprite.extend("Tower", {
        init: function(p) {
            this._super(p, {
                asset: "cup.png"
            });
        }
    });
}