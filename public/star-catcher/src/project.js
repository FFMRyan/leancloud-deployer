require=function t(e,i,n){function s(o,r){if(!i[o]){if(!e[o]){var a="function"==typeof require&&require;if(!r&&a)return a(o,!0);if(c)return c(o,!0);var h=new Error("Cannot find module '"+o+"'");throw h.code="MODULE_NOT_FOUND",h}var u=i[o]={exports:{}};e[o][0].call(u.exports,function(t){var i=e[o][1][t];return s(i?i:t)},u,u.exports,t,e,i,n)}return i[o].exports}for(var c="function"==typeof require&&require,o=0;o<n.length;o++)s(n[o]);return s}({Game:[function(t,e,i){cc._RFpush(e,"0486fOqHrJN+6c5PQg5FHh9","Game");{var n=t("Player");cc.Class({"extends":cc.Component,properties:{ground:{"default":null,type:cc.Node},player:{"default":null,type:n},starPrefab:{"default":null,type:cc.Prefab},btnNode:{"default":null,type:cc.Node},gameOverNode:{"default":null,type:cc.Node},controlHintLabel:{"default":null,type:cc.ELabel},keyboardHint:{"default":"",multiline:!0},touchHint:{"default":"",multiline:!0},maxStarDuration:0,minStarDuration:0},onLoad:function(){this.groundY=this.ground.y+this.ground.height/2,this.currentStar=null,this.currentStarX=0,this.timer=0,this.starDuration=0,this.isRunning=!1;var t=cc.sys.isMobile?this.touchHint:this.keyboardHint;this.controlHintLabel.string=t},onStartGame:function(){this.isRunning=!0,this.btnNode.setPositionX(3e3),this.gameOverNode.active=!1,this.player.startMove(cc.p(0,this.groundY)),this.spawnNewStar()},spawnNewStar:function(){var t=cc.instantiate(this.starPrefab);this.node.addChild(t),t.setPosition(this.getNewStarPosition()),t.getComponent("Star").init(this),this.startTimer(),this.currentStar=t},startTimer:function(){this.starDuration=this.minStarDuration+cc.random0To1()*(this.maxStarDuration-this.minStarDuration),this.timer=0},getNewStarPosition:function(){this.currentStar||(this.currentStarX=cc.randomMinus1To1()*this.node.width/2);var t=0,e=this.groundY+cc.random0To1()*this.player.jumpHeight+50,i=this.node.width/2;return t=this.currentStarX>=0?-cc.random0To1()*i:cc.random0To1()*i,this.currentStarX=t,cc.p(t,e)},update:function(t){return this.isRunning?this.timer>this.starDuration?void this.gameOver():void(this.timer+=t):void 0},gameOver:function(){this.gameOverNode.active=!0,this.player.enabled=!1,this.player.stopMove(),this.currentStar.destroy(),this.isRunning=!1,this.btnNode.setPositionX(0)}})}cc._RFpop()},{Player:"Player"}],Player:[function(t,e,i){cc._RFpush(e,"c10bbPdGYhDWaLoKLV38bHf","Player"),cc.Class({"extends":cc.Component,properties:{jumpHeight:0,jumpDuration:0,maxMoveSpeed:0,accel:0,scoreDisplay:{"default":null,type:cc.ELabel}},onLoad:function(){this.xSpeed=0,this.accLeft=!1,this.accRight=!1,this.minPosX=-this.node.parent.width/2,this.maxPosX=this.node.parent.width/2,this.score=0,this.jumpAction=this.setJumpAction(),this.setInputControl()},setInputControl:function(){var t=this;cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,onKeyPressed:function(e,i){switch(e){case cc.KEY.a:case cc.KEY.left:t.accLeft=!0,t.accRight=!1;break;case cc.KEY.d:case cc.KEY.right:t.accLeft=!1,t.accRight=!0}},onKeyReleased:function(e,i){switch(e){case cc.KEY.a:case cc.KEY.left:t.accLeft=!1;break;case cc.KEY.d:case cc.KEY.right:t.accRight=!1}}},t),cc.eventManager.addListener({event:cc.EventListener.TOUCH_ONE_BY_ONE,onTouchBegan:function(e,i){var n=e.getLocation();return n.x>=cc.winSize.width/2?(t.accLeft=!1,t.accRight=!0):(t.accLeft=!0,t.accRight=!1),!0},onTouchEnded:function(e,i){t.accLeft=!1,t.accRight=!1}},t)},setJumpAction:function(){var t=cc.moveBy(this.jumpDuration,cc.p(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),e=cc.moveBy(this.jumpDuration,cc.p(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());return cc.repeatForever(cc.sequence(t,e))},getCenterPos:function(){var t=cc.p(this.node._sgNode.x,this.node._sgNode.y+this.node.height/2);return t},gainScore:function(){this.score+=1,this.scoreDisplay.string="Score: "+this.score.toString()},resetScore:function(){this.score=0,this.scoreDisplay.string="Score: "+this.score.toString()},startMove:function(t){this.enabled=!0,this.resetScore(),this.xSpeed=0,this.node.setPosition(t),this.node._sgNode.runAction(this.jumpAction)},stopMove:function(){this.node._sgNode.stopAllActions()},update:function(t){this.accLeft?this.xSpeed-=this.accel*t:this.accRight&&(this.xSpeed+=this.accel*t),Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x+=this.xSpeed*t,this.node.x>this.maxPosX?(this.node.x=this.maxPosX,this.xSpeed=0):this.node.x<this.minPosX&&(this.node.x=this.minPosX,this.xSpeed=0)}}),cc._RFpop()},{}],Star:[function(t,e,i){cc._RFpush(e,"21890Xr4RBJlqTJhmXJ/f5s","Star"),cc.Class({"extends":cc.Component,properties:{pickRadius:0},onLoad:function(){this.enabled=!1},init:function(t){this.game=t,this.enabled=!0,this.node.opacity=255},getPlayerDistance:function(){var t=this.game.player.getCenterPos(),e=this.node.position.subSelf(t),i=e.mag();return i},onPicked:function(){this.game.player.gainScore(),this.game.spawnNewStar(),this.node.destroy()},update:function(t){if(this.getPlayerDistance()<this.pickRadius)return void this.onPicked();var e=1-this.game.timer/this.game.starDuration,i=50;this.node.opacity=i+Math.floor(e*(255-i))}}),cc._RFpop()},{}]},{},["Game","Star","Player"]);
//# sourceMappingURL=project.js.map