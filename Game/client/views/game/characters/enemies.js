enemy = function(){
	Q.Sprite.extend("Enemy", {
        init: function(p) {
            this._super(p, {
                asset: "enemy.png",
                vx: 100,
                scale: 0.5
            });
            this.add('2d, aiBounce');

            this.on("bump.left,bump.right,bump.bottom", function(collision) {
                if (collision.obj.isA("Player")) {
                    collision.obj.damage();
                    var snd = new Audio("sounds/roar.mp3"); // buffers automatically when created
                    snd.loop = false;
                    snd.play();
                }
            });

            this.on("bump.top", function(collision) {
                if (collision.obj.isA("Player")) {         
                    this.destroy();
                    collision.obj.p.vy = -300;
                    collision.obj.p.coins += 1;
                    var coinsLabel = Q("UI.Text", 1).items[1];
                    coinsLabel.p.label = 'Points: ' + collision.obj.p.coins;
                }
            });
        },
        step: function(dt) {
            if (Q.inputs['left'] && this.p.direction == 'right') {
                this.p.flip = 'x';
            }
            if (Q.inputs['right'] && this.p.direction == 'left') {
                this.p.flip = false;
            }
            if(this.p.y > 3000){
                this.destroy();
            }           
        },
    });
}