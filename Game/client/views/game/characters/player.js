player = function(){
	Q.Sprite.extend("Player", {
        init: function(p) {
            this._super(p, {
                asset: "player.png",
                x: playerStart.x,
                y: playerStart.y,
                jumpSpeed: -500,
                lives: 3,
                coins: 0
            });
            this.add('2d, platformerControls');

            this.on("hit.sprite", function(collision) {
                if (collision.obj.isA("Coin")) {
                    collision.obj.destroy();
                    this.p.coins += 5;
                    var coinsLabel = Q("UI.Text", 1).items[1];
                    coinsLabel.p.label = 'Points: ' + this.p.coins;
                }
                this.on("hit.sprite", function(collision) {
                    if (collision.obj.isA("Tower")) {
                        nextLevel(this.p.coins);
                    }
                });
            });

            this.beer_mode();
        },
        step: function(dt) {
            if (Q.inputs['left'] && this.p.direction == 'right') {
                this.p.flip = 'x';
            }
            if (Q.inputs['right'] && this.p.direction == 'left') {
                this.p.flip = false;
            }
            
        },
        damage: function() {
            //only damage if not in "invincible" mode, otherwise beign next to an enemy takes all the lives inmediatly
            this.p.lives--;

            //will be invincible for 1 second
            this.p.timeInvincible = 1;

            if (this.p.lives === 0) {
                this.destroy();
                gameOver(this.p.coins);
            } else {
                var livesLabel = Q("UI.Text", 1).first();
                livesLabel.p.label = "Lives: " + this.p.lives;
                this.p.x = playerStart.x;
                this.p.y = playerStart.y;
            }
        }, 
        beer_mode: function() {
            this.p.scale = 2;
            this.p.jumpSpeed = -600;
            this.p.vx = -100;

        }
    });
}