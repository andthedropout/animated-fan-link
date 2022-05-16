import React, { useEffect } from "react";
import anime from 'animejs';

export default function Background(props) {
    useEffect(() => {
        var canvasEl = document.getElementById("c");
        var ctx = canvasEl.getContext('2d');

        function setCanvasSize() {
            canvasEl.width = window.innerWidth * 4;
            canvasEl.height = window.innerHeight * 4;
            canvasEl.style.width = window.innerWidth * 2 + 'px';
            canvasEl.style.height = window.innerHeight * 2 + 'px';
            canvasEl.getContext('2d').scale(2, 2);
        }

        var c = document.getElementById("c");
        var ctx = c.getContext("2d");
        var cH;
        var cW;
        var bgColor = "#" + props.color2;
        var animations = [];

        var colorPicker = (() => {
            var colors = ["#" + props.color1, "#" + props.color2, "#" + props.color3];
            var index = 1;
            function next() {
                index = index++ < colors.length - 1 ? index : 0;
                return colors[index];
            }
            function current() {
                return colors[index]
            }
            return {
                next: next,
                current: current
            }
        })();

        function removeAnimation(animation) {
            var index = animations.indexOf(animation);
            if (index > -1) animations.splice(index, 1);
        }

        function calcPageFillRadius(x, y) {
            var l = Math.max(x - 0, cW - x);
            var h = Math.max(y - 0, cH - y);
            return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
        }

        function addClickListeners() {
            document.addEventListener("touchstart", handleEvent);
            document.addEventListener("mousedown", handleEvent);
        };

        function handleEvent(e) {
            if (e.touches) {
                e.preventDefault();
                e = e.touches[0];
            }
            var currentColor = colorPicker.current();
            var nextColor = colorPicker.next();
            var targetR = calcPageFillRadius(e.pageX, e.pageY);
            var minCoverDuration = 14000;

            var pageFill = new Circle({
                x: e.pageX,
                y: e.pageY,
                r: 0,
                fill: nextColor,
                stroke: {
                    width: 10,
                    color: "#333"
                }
            });
            var fillAnimation = anime({
                targets: pageFill,
                r: targetR,
                duration: Math.max(targetR / 1, minCoverDuration),
                easing: "easeInSine",
                complete: function () {
                    bgColor = pageFill.fill;
                    removeAnimation(fillAnimation);
                }
            });

            var ripple = new Circle({
                x: e.pageX,
                y: e.pageY,
                r: 1,
                fill: currentColor,
                stroke: {
                    width: 2,
                    color: "#333"
                },
                opacity: 1
            });


            animations.push(fillAnimation);
        }

        function extend(a, b) {
            for (var key in b) {
                if (b.hasOwnProperty(key)) {
                    a[key] = b[key];
                }
            }
            return a;
        }

        var Circle = function (opts) {
            extend(this, opts);
        }

        Circle.prototype.draw = function () {
            ctx.globalAlpha = this.opacity || 1;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 4 * Math.PI, false);
            if (this.stroke) {
                ctx.strokeStyle = this.stroke.color;
                ctx.lineWidth = this.stroke.width;
                ctx.stroke();
            }
            if (this.fill) {
                ctx.fillStyle = this.fill;
                ctx.fill();
            }
            ctx.closePath();
            ctx.globalAlpha = 1;
        }

        var animate = anime({
            duration: Infinity,
            update: function () {
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, cW, cH * 2);
                animations.forEach(function (anim) {
                    anim.animatables.forEach(function (animatable) {
                        animatable.target.draw();
                    });
                });
            }
        });

        function fauxClick(x, y) {
            var fakeclick = new Event("mousedown");
            fakeclick.pageX = x;
            fakeclick.pageY = y;
            document.dispatchEvent(fakeclick);
        }

            setTimeout(function () { fauxClick(anime.random(0, cW), anime.random(0, cH)) }, anime.random(0, 0));
            setInterval(function () {
                fauxClick(anime.random(0, cW), anime.random(0, cH));
            }, 10000);

        var resizeCanvas = function () {
            cW = window.innerWidth;
            cH = window.innerHeight;
            c.width = cW * devicePixelRatio;
            c.height = cH * devicePixelRatio;
            ctx.scale(devicePixelRatio, devicePixelRatio);
        };

        (function init() {
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas);
            addClickListeners();
        })();

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize, false);
    }, [props])

    return (
        <div><canvas id="c">Canvas is not supported in your browser</canvas></div>
    );
}
