beer = function(){
	Q.Sprite.extend("Beer", {
        init: function(p) {
            this._super(p, {
                asset: "beer.png"
            });
        }
    });
}