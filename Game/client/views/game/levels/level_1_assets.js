tSize = 70;
tY = 6;
tX = 100;

yPosition = function(level) {
    return tSize * level + tSize / 2;
};

xPosition = function(level) {
    return tSize * level + tSize / 2;
};

level1Assets = [
    ["Tower", {
        x: xPosition(50),
        y: yPosition(4)
    }],
    ["Enemy", {
        x: xPosition(6),
        y: yPosition(4)
    }],
    ["Enemy", {
        x: xPosition(9),
        y: yPosition(3)
    }],
    ["Enemy", {
        x: xPosition(12),
        y: yPosition(3)
    }],
    ["Coin", {
        x: xPosition(4),
        y: yPosition(2)
    }],
    ["Coin", {
        x: xPosition(5),
        y: yPosition(2)
    }],
    ["Coin", {
        x: xPosition(6),
        y: yPosition(2)
    }],
    ["Coin", {
        x: xPosition(11),
        y: yPosition(2)
    }],
    ["Coin", {
        x: xPosition(18),
        y: yPosition(0)
    }],
    ["Coin", {
        x: xPosition(19),
        y: yPosition(0)
    }],
    ["Coin", {
        x: xPosition(20),
        y: yPosition(0)
    }],
    ["Coin", {
        x: xPosition(33),
        y: yPosition(3)
    }],
    ["Coin", {
        x: xPosition(36),
        y: yPosition(2)
    }],
    ["Coin", {
        x: xPosition(39),
        y: yPosition(1)
    }],
    ["Coin", {
        x: xPosition(40),
        y: yPosition(3)
    }],
    ["Coin", {
        x: xPosition(40),
        y: yPosition(4)
    }],
    ["Coin", {
        x: xPosition(42),
        y: yPosition(4)
    }],
    ["Coin", {
        x: xPosition(45),
        y: yPosition(4)
    }],
    ["Coin", {
        x: xPosition(36),
        y: yPosition(3)
    }],
    ["Coin", {
        x: xPosition(53),
        y: yPosition(3)
    }]
];