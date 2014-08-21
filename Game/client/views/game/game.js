Template.game.rendered = function() {
    var w = $("#game").attr("width");
    var h = $("#game").attr("height");
    var isAlive = true;
    var playerStart = {
        x: 100,
        y: 100
    };

    var gameOver = function(points) {
        Q.stageScene("endGame", 1, {
            label: "Game Over!\nYour score: " + points
        });
        if (isAlive) {
            Results.insert({
                name: Meteor.user().profile.name,
                points: points,
                date: new Date()
            });
            isAlive = false;
        }
    }
    var Q = Quintus()
        .include("Sprites, Scenes, Input, 2D, Touch, UI")
        .setup("game", {
            width: w,
            height: h
        }).controls().touch();

    //load assets
    Q.load("tiles_map.png, player.png, enemy.png, cup.png, coin.png, level1.tmx, level2.tmx", function() {
        Q.sheet("tiles", "tiles_map.png", {
            tilew: 70,
            tileh: 70
        });
        Q.stageScene("level1");
        Q.stageScene("gameStats", 1);
    });

    Q.scene("level1", function(stage) {
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

    Q.scene('endGame', function(stage) {
        var box = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2,
            fill: "rgba(0,0,0,0.5)"
        }));

        var btnScores = box.insert(new Q.UI.Button({
            x: 0,
            y: 0,
            fill: "#CCCCCC",
            label: "Score Table"
        }))
        var btnGame = box.insert(new Q.UI.Button({
            x: 0,
            y: 10 + btnScores.p.h,
            fill: "#CCCCCC",
            label: "Restart Game"
        }))
        var label = box.insert(new Q.UI.Text({
            x: 10,
            y: -10 - btnScores.p.h,
            label: stage.options.label
        }));
        btnScores.on("click", function() {
            Router.go("results");
        });
        btnGame.on("click", function() {
            Q.clearStages();
            Q.stageScene('level1');
            Q.stageScene("gameStats", 1);
        });
        box.fit(20);
    });

    Q.scene("gameStats", function(stage) {
        var statsContainer = stage.insert(new Q.UI.Container({
            fill: "rgba(0,0,0,0.3)",
            x: 960 / 2,
            y: 40,
            border: 1,
            shadow: 3,
            shadowColor: "rgba(0,0,0,0.5)",
            w: 960,
            h: 40
        }));

        var lives = stage.insert(new Q.UI.Text({
            label: "Lives: 3",
            color: "white",
            x: -300,
            y: 0
        }), statsContainer);

        var coins = stage.insert(new Q.UI.Text({
            label: "Points: 0",
            color: "white",
            x: 300,
            y: 0
        }), statsContainer);

        var name = stage.insert(new Q.UI.Text({
            label: Meteor.user().profile.name, //User name
            color: "white",
            x: 0,
            y: 0
        }), statsContainer);

    });

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
                        this.destroy();
                        gameOver(this.p.coins);
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
            if (this.p.y > h) {
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

        }
    });
    Q.Sprite.extend("Tower", {
        init: function(p) {
            this._super(p, {
                asset: "cup.png"
            });
        }
    });
    Q.Sprite.extend("Enemy", {
        init: function(p) {
            this._super(p, {
                asset: "enemy.png",
                vx: 100
            });
            this.add('2d, aiBounce');

            this.on("bump.left,bump.right,bump.bottom", function(collision) {
                if (collision.obj.isA("Player")) {
                    collision.obj.damage();
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
        }
    });

    Q.Sprite.extend("Coin", {
        init: function(p) {
            this._super(p, {
                asset: "coin.png"
            });
        }
    });
};