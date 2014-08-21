level = 1;
Template.game.rendered = function() {
    w = $("#game").attr("width");
    h = $("#game").attr("height");
    isAlive = true;
    playerStart = {
        x: 100,
        y: 100
    };

    gameOver = function(points) {
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
    nextLevel = function(points) {
        level += 1;
        Q.stageScene('level' + level);
        Q.stageScene("gameStats", 1);
    }
    Q = Quintus()
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

    level1();
    level2();

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

    player();

    tower();
    
    enemy();

    coins();
};

