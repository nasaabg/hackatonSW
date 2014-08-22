player = function(){
	Q.Sprite.extend("Player", {
        init: function(p) {
            this._super(p, {
                asset: "player.png",
                x: playerStart.x,
                y: playerStart.y,
                jumpSpeed: -500,
                lives: 3,
                coins: 0,
                scale: 0.4,
                beer_mode: {
                    active: false,
                    max_scale: 0.8,
                    inc_scale_interval: false,
                    dec_scale_interval: false,
                    inc_scale: function(){
                        if (player.p.scale <= player.p.beer_mode.max_scale)
                            player.p.scale += 0.1;
                        else
                            player.p.beer_mode.inc_scale_interval = 0;
                    },
                    dec_scale: function(){
                        if (player.p.scale > 0.4)
                            player.p.scale -= 0.1;
                        else
                            player.p.beer_mode.dec_scale_interval = 0;
                    },
                    length: 8000
                },
            });
            this.add('2d, platformerControls');

            this.on("hit.sprite", function(collision) {
                if (collision.obj.isA("Coin")) {
                    collision.obj.destroy();
                    this.p.coins += 5;
                    var coinsLabel = Q("UI.Text", 1).items[1];
                    coinsLabel.p.label = 'Points: ' + this.p.coins;
                }
                if (collision.obj.isA("Beer")) {
                    collision.obj.destroy();
                    player.beer_mode_on();
                }
                this.on("hit.sprite", function(collision) {
                    if (collision.obj.isA("Tower")) {
                        if(level <= 2)
                            nextLevel(this.p.coins);
                        else{
                            level = 2; 
                            gameCompleated(this.p.coins);
                        }
                    }
                });
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
                 gameOver(this.p.coins);
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
        beer_mode_on: function() {
            this.p.beer_mode.active = true;
            this.p.jumpSpeed = -650;
            this.p.scale = 0.4;
            this.p.beer_mode.inc_scale_interval = Meteor.setInterval(inc_scale, 100);
            setTimeout(function(){
                player.p.beer_mode.dec_scale_interval = Meteor.setInterval(dec_scale, 100);
            }, this.p.beer_mode.length);
        },
        beer_mode_off: function() {
            this.p.beer_mode.active = false;
            this.p.jumpSpeed = -500;
            this.p.scale = 0.4;
        }
    });
}



function inc_scale() {
    if (player.p.scale <= player.p.beer_mode.max_scale)
        player.p.scale += 0.1;
    else
        clearTimeout(player.p.beer_mode.inc_scale_interval);
}

function dec_scale() {
    if (player.p.scale > 0.4)
        player.p.scale -= 0.1;
    else
    {
        clearTimeout(player.p.beer_mode.dec_scale_interval);
        player.beer_mode_off();
    }
}
