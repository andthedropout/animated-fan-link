import React, { FC, useEffect } from "react";
import anime from 'animejs';
import $ from 'jquery';



/** @param mousemove: boolean, switch for mouse control
 */


class Background extends React.Component {
    constructor(props){
        super(props);
        console.log(props)
      }
    componentDidMount() {
        var canvasEl = document.getElementById("c");
        var ctx = canvasEl.getContext('2d');
        var numberOfParticules = 30;
        var pointerX = 0;
        var pointerY = 0;
        var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
        var colors = [this.props.color1, this.props.color2, this.props.color3];
      
        function setCanvasSize() {
          canvasEl.width = window.innerWidth * 4;
          canvasEl.height = window.innerHeight * 4;
          canvasEl.style.width = window.innerWidth*2 + 'px';
          canvasEl.style.height = window.innerHeight*2 + 'px';
          canvasEl.getContext('2d').scale(2, 2);
        }
    
        var c = document.getElementById("c");
          var ctx = c.getContext("2d");
          var cH;
          var cW;
          var bgColor = "#062C30";
          var animations = [];
          var circles = [];
      
        var colorPicker = (() => {
            var colors = ["#" + this.props.color1, "#" + this.props.color2, "#" + this.props.color3];
            var index = 1;
            function next() {
                console.log(colors[index])
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
              var rippleSize = Math.min(20, (cW * 2.1));
              var minCoverDuration = 15000;
              
              var pageFill = new Circle({
              x: e.pageX,
              y: e.pageY,
              r: 0,
              fill: nextColor
              });
              var fillAnimation = anime({
              targets: pageFill,
              r: targetR,
              duration:  Math.max(targetR / 1 , minCoverDuration ),
              easing: "easeInBounce",
              complete: function(){
                  bgColor = pageFill.fill;
                  removeAnimation(fillAnimation);
              }
              });
              
              var ripple = new Circle({
              x: e.pageX,
              y: e.pageY,
              r: 0,
              fill: currentColor,
              stroke: {
                  width: 2,
                  color: currentColor
              },
              opacity: 1
              });
              var rippleAnimation = anime({
              targets: ripple,
              r: rippleSize,
              opacity: .5,
              easing: "easeInBounce",
              duration: 100,
              complete: removeAnimation
              });
              
              var particles = [];
              for (var i=0; i<0; i++) {
              var particle = new Circle({
                  x: e.pageX,
                  y: e.pageY,
                  fill: currentColor,
                  r: anime.random(30, 30)
              })
              particles.push(particle);
              }
              var particlesAnimation = anime({
              targets: particles,
              x: function(particle){
                  return particle.x + anime.random(rippleSize, -rippleSize);
              },
              y: function(particle){
                  return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
              },
              r: 0,
              easing: "easeOutExpo",
              duration: anime.random(50,350),
              complete: removeAnimation
              });
              animations.push(fillAnimation, rippleAnimation, particlesAnimation);
          }
      
          function extend(a, b){
          for(var key in b) {
              if(b.hasOwnProperty(key)) {
              a[key] = b[key];
              }
          }
          return a;
          }
      
          var Circle = function(opts) {
          extend(this, opts);
          }
      
          Circle.prototype.draw = function() {
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
          update: function() {
              ctx.fillStyle = bgColor;
              ctx.fillRect(0, 0, cW, cH);
              animations.forEach(function(anim) {
              anim.animatables.forEach(function(animatable) {
                  animatable.target.draw();
              });
              });
          }
          });
      
          var resizeCanvas = function() {
          cW = window.innerWidth;
          cH = window.innerHeight;
          c.width = cW * devicePixelRatio;
          c.height = cH * devicePixelRatio;
          ctx.scale(devicePixelRatio, devicePixelRatio);
          };
      
          (function init() {
          resizeCanvas();
          if (window.CP) {
              // CodePen's loop detection was causin' problems
              // and I have no idea why, so...
              window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000; 
          }
          window.addEventListener("resize", resizeCanvas);
          addClickListeners();
          if (!!window.location.pathname.match(/fullcpgrid/)) {
              startFauxClicking();
          }
          handleInactiveUser();
          })();
      
          function handleInactiveUser() {
          var inactive = setTimeout(function(){
              fauxClick(cW/2, cH/2);
          }, 2000);
          
          function clearInactiveTimeout() {
              clearTimeout(inactive);
              document.removeEventListener("mousedown", clearInactiveTimeout);
              document.removeEventListener("touchstart", clearInactiveTimeout);
          }
          
          document.addEventListener("mousedown", clearInactiveTimeout);
          document.addEventListener("touchstart", clearInactiveTimeout);
          }
      
          function startFauxClicking(val) {
              if (val == true) {
                  setTimeout(function(){
                      fauxClick(anime.random( cW * 12, cW * 12), anime.random(cH * 12, cH * 12));
                      startFauxClicking();
                      fauxClick(anime.random( cW * 12, cW * 12), anime.random(cH * 12, cH * 12));
                      startFauxClicking();
                  }, anime.random(10, 10));
              }
              if (val == false) {
                  return
              }
          }
      
          function fauxClick(x, y) {
              
          }
        
      
        $(document).ready(function(){
          $("#video").on(
            "timeupdate", 
            function(event){
              onTrackedVideoFrame(this.currentTime, this.duration);
            });
        });
      
        function onTrackedVideoFrame(currentTime, duration){
            if (currentTime > 1 && currentTime < 1000) {
              startFauxClicking(true);
            }
            // if (currentTime > 100 && currentTime < 61.8) {
            //   startFauxClicking(false);
            // }
        }
        
       
        setInterval(function(){
            fauxClick(anime.random( cW/2, cW/2), anime.random(cH/2, cH/2));
            startFauxClicking();
            fauxClick(anime.random( cW/2, cW/2), anime.random(cH/2, cH/2));
            startFauxClicking();
        }, 800);
        
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize, false);
    }
    render() {
      return(
        <div id="instructions"><canvas class="fireworks" id="c">Canvas is not supported in your browser</canvas></div>
      )
    }
  }

  export default Background