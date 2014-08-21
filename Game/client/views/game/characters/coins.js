coins = function(){
	Q.Sprite.extend("Coin", {
        init: function(p) {
            this._super(p, {
                asset: "coin.png"
            });
        }
    });
}