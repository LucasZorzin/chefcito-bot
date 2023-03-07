import * as PIXI from "https://cdn.skypack.dev/pixi.js@5.x";
import { KawaseBlurFilter } from "https://cdn.skypack.dev/@pixi/filter-kawase-blur@3.2.0";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@3.0.0";
import hsl from "https://cdn.skypack.dev/hsl-to-hex";
import debounce from "https://cdn.skypack.dev/debounce";
function random(t,s){return Math.random()*(s-t)+t}function map(t,s,e,h,r){return(t-s)/(e-s)*(r-h)+h}const simplex=new SimplexNoise;class ColorPalette{constructor(){this.setColors(),this.setCustomProperties()}setColors(){this.hue=189,this.complimentaryHue1=this.hue+15,this.complimentaryHue2=this.hue+10,this.saturation=95,this.lightness=50,this.baseColor=hsl(this.hue,this.saturation,this.lightness),this.complimentaryColor1=hsl(this.complimentaryHue1,this.saturation,this.lightness),this.complimentaryColor2=hsl(this.complimentaryHue2,this.saturation,this.lightness),this.colorChoices=[this.baseColor,this.complimentaryColor1,this.complimentaryColor2]}randomColor(){return this.colorChoices[~~random(0,this.colorChoices.length)].replace("#","0x")}setCustomProperties(){document.documentElement.style.setProperty("--hue",this.hue),document.documentElement.style.setProperty("--hue-complimentary1",this.complimentaryHue1),document.documentElement.style.setProperty("--hue-complimentary2",this.complimentaryHue2)}}class Orb{constructor(t=0){this.bounds=this.setBounds(),this.x=random(this.bounds.x.min,this.bounds.x.max),this.y=random(this.bounds.y.min,this.bounds.y.max),this.scale=1,this.fill=t,this.radius=random(window.innerHeight/6,window.innerHeight/3),this.xOff=random(0,1e3),this.yOff=random(0,1e3),this.inc=.002,this.graphics=new PIXI.Graphics,this.graphics.alpha=.825,window.addEventListener("resize",debounce(()=>{this.bounds=this.setBounds()},250))}setBounds(){let t=window.innerWidth<1e3?window.innerWidth/3:window.innerWidth/5,s=window.innerWidth/1.25,e=window.innerWidth<1e3?window.innerHeight:window.innerHeight/1.375;return{x:{min:s-t,max:s+t},y:{min:e-t,max:e+t}}}update(){let t=simplex.noise2D(this.xOff,this.xOff),s=simplex.noise2D(this.yOff,this.yOff),e=simplex.noise2D(this.xOff,this.yOff);this.x=map(t,-1,1,this.bounds.x.min,this.bounds.x.max),this.y=map(s,-1,1,this.bounds.y.min,this.bounds.y.max),this.scale=map(e,-1,1,.5,1),this.xOff+=this.inc,this.yOff+=this.inc}render(){this.graphics.x=this.x,this.graphics.y=this.y,this.graphics.scale.set(this.scale),this.graphics.clear(),this.graphics.beginFill(this.fill),this.graphics.drawCircle(0,0,this.radius),this.graphics.endFill()}}const app=new PIXI.Application({view:document.querySelector(".orb-canvas"),resizeTo:window,transparent:!0});app.stage.filters=[new KawaseBlurFilter(30,10,!0)];/*Copyright (c) 2023 by George Francis. Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/;const colorPalette=new ColorPalette,orbs=[];for(let i=0;i<10;i++){let t=new Orb(colorPalette.randomColor());app.stage.addChild(t.graphics),orbs.push(t)}window.matchMedia("(prefers-reduced-motion: reduce)").matches?orbs.forEach(t=>{t.update(),t.render()}):app.ticker.add(()=>{orbs.forEach(t=>{t.update(),t.render()})});