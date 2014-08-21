level = 1;
Template.game.rendered = function() {
    w = $("#game").attr("width");
    h = $("#game").attr("height");
    isAlive = true;
    levelLoaded = false;
    playerStart = {
        x: 100,
        y: 100
    };
    bestRes = Results.find({},{sort:{points:-1}}).fetch()[1];
        if(bestRes){
            bestRes = bestRes.points;
        }else{
            bestRes = 0;
        }
    gameOver = function(points) {
        Q.stageScene("endGame", 1, {
            label: "Game Over!\nYour score: " + points
        });
        if (isAlive) {
            Results.insert({
                name: Meteor.user().username,
                points: points,
                date: new Date()
            });
            isAlive = false;
            level = 1;
        }
    }
    nextLevel = function(points) {
        if(!levelLoaded){
        level += 1;
        Q.stageScene('level' + level);
        Q.stageScene("gameStats", 1);
        levelLoaded = true;
        }
    }
    Q = Quintus({ audioSupported: [ 'wav','mp3' ] })
        .include("Sprites, Scenes, Input, 2D, Touch, UI, Audio").enableSound()
        .setup("game", {
            width: w,
            height: h
        }).controls().touch();

    //load assets
    Q.load("tiles_map.png, player.png, enemy.png, cup.png, coin.png, beer.png, level1.tmx, level2.tmx", function() {
        Q.sheet("tiles", "tiles_map.png", {
            tilew: 70,
            tileh: 70
        });
        Q.stageScene("level1");
        Q.stageScene("gameStats", 1);
    });
    var snd = new Audio("sounds/mario.mp3"); // buffers automatically when created
    snd.play();
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
            x: -100,
            y: 0
        }), statsContainer);

        var coins = stage.insert(new Q.UI.Text({
            label: "Points: " + player.p.coins,
            color: "white",
            x: 100,
            y: 0
        }), statsContainer);

        var name = stage.insert(new Q.UI.Text({
            label: Meteor.user().username,
            color: "white",
            x: -300,
            y: 0
        }), statsContainer);
        var bestScore = stage.insert(new Q.UI.Text({
            label: "Best Result: " + bestRes,
            color: "white",
            x: 300,
            y: 0
        }), statsContainer);

    });

    player();

    tower();
    
    enemy();

    coins();

    beer();
};