var $ = require('../vendor/jquery');

var canvas, W, H, ctx, request,
    textWidth = 0,
    circleCount = 0,
    circles = [],
    degrees = 0,
    distance = 20,
    pi2 = Math.PI * 2;

module.exports = {
    init: function() {
        this.createCanvas();
        this.bindings();
    },

    bindings: function() {
        $(window).resize(function() {
            this.setCanvasSize();
            this.calculateNumbers();
            this.generateCircles();
        }.bind(this))
    },

    createCanvas: function() {
        canvas = document.getElementsByClassName('vortex__canvas')[0];
        this.setCanvasSize();
        this.calculateNumbers();
        ctx = canvas.getContext('2d');

        this.generateCircles();
        this.draw();
    },

    setCanvasSize: function() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    },

    calculateNumbers: function() {
        var centerToCorner =  Math.sqrt( ((W/2 - 0) * (W/2 - 0)) + ((H/2 - 0) * (H/2 - 0)) );
        textWidth = W > 700 ? 700 : W - 160;
        circleCount = (centerToCorner - (textWidth / 2)) / distance;
    },

    generateCircles: function() {
        circles = [];
        cancelAnimationFrame(request);
        request = undefined;

        for (var i = 0; i < circleCount; i++) {
            var x = W / 2 + Math.floor(Math.random()*40) -20;
            var y = H / 2 + Math.floor(Math.random()*40) -20;

            circles[i] = {
                offset: Math.sqrt( ((W/2 - x) * (W/2 - x)) + ((H/2 - y) * (H/2 - y)) ),
                angle: Math.floor(Math.random()*360) + 1,
                speed: Math.floor(Math.random()*8),
                radius: (textWidth / 2) + (i * distance),
                rgb: Math.floor(34 + (i * (221 / circleCount))),
                cx: 0,
                cy: 0
            }
        }

        this.updateCircles();
    },

    updateCircles: function() {
        for (var i = 0; i < circleCount; i++) {
            var circle = circles[i];

            circle.angle += circle.speed;
            circle.angle = circle.angle > 360 ? 0 : circle.angle;
            circle.cx = (W / 2) + circle.offset * Math.cos(circle.angle  * (Math.PI / 180));
            circle.cy = (H / 2) + circle.offset * Math.sin(circle.angle  * (Math.PI / 180));

            circles[i] = circle;
        }

        this.draw();
        request = requestAnimationFrame(this.updateCircles.bind(this));
    },

    draw: function() {
        ctx.clearRect(0, 0, W, H);
        ctx.lineWidth = 6;

        for (var i = 0; i < circleCount; i++) {
            var circle = circles[i];
            ctx.beginPath();
            ctx.ellipse(circle.cx, circle.cy, circle.radius, circle.radius, 0, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgb(' + circle.rgb + ',' + circle.rgb + ',' + circle.rgb + ')';
            ctx.closePath();
            ctx.stroke();
        }
    }
}