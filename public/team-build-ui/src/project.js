require=function t(e,i,s){function o(a,c){if(!i[a]){if(!e[a]){var r="function"==typeof require&&require;if(!c&&r)return r(a,!0);if(n)return n(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var h=i[a]={exports:{}};e[a][0].call(h.exports,function(t){var i=e[a][1][t];return o(i?i:t)},h,h.exports,t,e,i,s)}return i[a].exports}for(var n="function"==typeof require&&require,a=0;a<s.length;a++)o(s[a]);return o}({DataMng:[function(t,e,i){"use strict";function s(t,e){cc.loader.loadRes(t,cc.SpriteFrame,e)}cc._RFpush(e,"51b36ib1fRMxaJV26AiJEq7","DataMng");var o={},n={},a={};e.exports={loadHeroes:function(t){cc.loader.loadRes("data/heroes",function(e,i){e?cc.error(e):!function(){for(var e=i,n=e.length,a=function(i){var a=e[i];o[a.id]=a;var c=a.iconPos.split("|"),r=a.portraitAnchor.split("|");a.iconPos=cc.p(parseFloat(c[0]),parseFloat(c[1])),a.portraitScale=parseFloat(a.portraitScale),a.portraitAnchor=cc.p(parseFloat(r[0]),parseFloat(r[1]));var l="heroes/"+a.id;s(l,function(i,s){return i?void cc.error(i):(a.sf=s,n-=1,n<=0?t(e):void 0)})},c=0;c<e.length;++c)a(c)}()})},loadActiveSkills:function(t){cc.loader.loadRes("data/activeskills",function(e,i){e?cc.log(e):!function(){for(var e=i,o=e.length,a=function(i){var a=e[i];s("skills/"+a.icon,function(i,s){return i?void cc.error(i):(a.sf=s,n[a.id]=a,o-=1,o<=0?t(e):void 0)})},c=0;c<e.length;++c)a(c)}()})},loadPassiveSkills:function(t){cc.loader.loadRes("data/passiveskills",function(e,i){e?cc.log(e):!function(){for(var e=i,o=e.length,n=function(i){var n=e[i];s("skills/"+n.icon,function(i,s){return i?void cc.error(i):(n.sf=s,a[n.id]=n,o-=1,o<=0?t(e):void 0)})},c=0;c<e.length;++c)n(c)}()})},getHero:function(t){return o[t]},getActiveSkill:function(t){return t?n[t]:null},getPassiveSkill:function(t){return t?a[t]:null},heroes:o,activeSkills:n,passiveSkills:a},cc._RFpop()},{}],HeroIcon:[function(t,e,i){"use strict";cc._RFpush(e,"e3a54OE0KJBkL8EM4+ER8by","HeroIcon");var s=t("Types").HeroClass;cc.Class({"extends":cc.Component,properties:{iconHero:cc.Sprite,iconClass:cc.Sprite,ring:cc.Sprite},init:function(t,e,i){this.teamPanel=t,this.idx=e,this.anim=this.getComponent(cc.Animation),i?(this.iconHero.enabled=!0,this.iconClass.enabled=!0,this.iconHero.spriteFrame=i.sf,this.iconClass.spriteFrame=this.teamPanel.sfClasses[s[i["class"]]],this.iconHero.node.position=i.iconPos):(this.iconHero.enabled=!1,this.iconClass.enabled=!1),this.ring.enabled=!1},showReplace:function(){this.anim.play("hero_shaking"),this.node.on("touchstart",this.onReplace.bind(this),this.node)},hideReplace:function(){this.anim.stop(),this.ring.enabled=!1,this.node.rotation=0,this.node.targetOff(this.node)},onReplace:function(){var t=this.teamPanel.heroInfos[this.teamPanel.curSelectedIdx];this.init(this.teamPanel,this.idx,t),this.teamPanel.replaceTeamHero(this.idx)}}),cc._RFpop()},{Types:"Types"}],HeroPortrait:[function(t,e,i){"use strict";cc._RFpush(e,"401ecEKPHdM4Yl9fz1uggOa","HeroPortrait"),cc.Class({"extends":cc.Component,properties:{anim:cc.Animation,sprite:cc.Sprite},init:function(t){this.id=t.id,this.sprite.spriteFrame=t.sf,this.sprite.node.setScale(t.portraitScale,t.portraitScale),this.sprite.node.setAnchorPoint(t.portraitAnchor),this.node.positionY=-220,this.onFocusOff()},onFocusOn:function(){this.anim.play("list_idle")},onFocusOff:function(){this.anim.play("list_off")},onSelect:function(){this.anim.play("list_select")}}),cc._RFpop()},{}],SkillIcon:[function(t,e,i){"use strict";cc._RFpush(e,"304afSV3S9F04Q1BNb9sslY","SkillIcon"),cc.Class({"extends":cc.Component,properties:{icon:cc.Sprite,labelCost:cc.Label,bgCost:cc.Node,labelLevel:cc.Label},init:function(t){void 0===t.cost?this.bgCost.active=!1:(this.bgCost.active=!0,this.labelCost.string=t.cost),this.icon.spriteFrame=t.sf}}),cc._RFpop()},{}],SkillList:[function(t,e,i){"use strict";cc._RFpush(e,"44677JMgJ9PGI72eukXFUbP","SkillList");var s=t("DataMng");cc.Class({"extends":cc.Component,properties:{skillPrefab:cc.Prefab,container:cc.Node},onLoad:function(){this.skillIcons=[];for(var t=0;t<3;++t){var e=cc.instantiate(this.skillPrefab).getComponent("SkillIcon");this.container.addChild(e.node),this.skillIcons.push(e)}},init:function(t){var e=s.getActiveSkill(t.activeSkill),i=s.getPassiveSkill(t.passiveSkill1),o=s.getPassiveSkill(t.passiveSkill2);e?(this.skillIcons[0].node.active=!0,this.skillIcons[0].init(e)):this.skillIcons[0].node.active=!1,i?(this.skillIcons[1].node.active=!0,this.skillIcons[1].init(i)):this.skillIcons[1].node.active=!1,o?(this.skillIcons[2].node.active=!0,this.skillIcons[2].init(o)):this.skillIcons[2].node.active=!1}}),cc._RFpop()},{DataMng:"DataMng"}],StatDisplay:[function(t,e,i){"use strict";cc._RFpush(e,"53eb165aBZJ5J5G6U9HaD1X","StatDisplay"),cc.Class({"extends":cc.Component,properties:{statName:cc.Label,statBar:cc.ProgressBar,statNum:cc.Label},init:function(t){this.statName.string=t},setStat:function(t,e){this.statBar.progress=t,this.statNum.string=e.toString()}}),cc._RFpop()},{}],TeamBuild:[function(t,e,i){"use strict";cc._RFpush(e,"df131TX/QFISJJI6cRIa2qm","TeamBuild");var s=t("DataMng"),o=t("Types").HeroClass,n=t("Types").HeroStats,a=t("SkillList"),c=1500,r=200,l=200;cc.Class({"extends":cc.Component,properties:{pageView:cc.PageView,listLayout:cc.Layout,teamLayout:cc.Layout,statLayout:cc.Layout,skillList:a,iconClass:cc.Sprite,labelClass:cc.Label,labelName:cc.Label,sfClasses:[cc.SpriteFrame],strClasses:{"default":[],type:"String"},strStatNames:{"default":[],type:"String"},heroPortraitPrefab:cc.Prefab,heroIconPrefab:cc.Prefab,statPrefab:cc.Prefab,snapTime:0},onLoad:function(){this.heroInfos=[],this.lastContentPosX=0,this.heroesInList=[],this.heroesInTeam=[],this.curSelectedIdx=-1,this.teamHeroes=[null,null,null],this.finishedLayout=!1,this.anim=this.getComponent(cc.Animation),s.loadHeroes(function(t){this.heroInfos=t,s.loadActiveSkills(function(){s.loadPassiveSkills(function(){this.onHeroLoaded()}.bind(this))}.bind(this))}.bind(this)),this.stats=[];for(var t=0;t<this.strStatNames.length;++t){var e=cc.instantiate(this.statPrefab).getComponent("StatDisplay");e.init(this.strStatNames[t]),this.stats.push(e),this.statLayout.node.addChild(e.node)}},onPageEvent:function(t,e){if(e===cc.PageView.EventType.PAGE_TURNING){var i=t.getCurrentPageIndex();this.curSelectedIdx!==i&&(this.curSelectedIdx>-1&&this.heroesInList[this.curSelectedIdx].getComponent("HeroPortrait").onFocusOff(),this.curSelectedIdx=i,this.heroesInList[this.curSelectedIdx].getComponent("HeroPortrait").onFocusOn(),this.anim.play("team_cur_off"))}},scrollToHeroIdx:function(t){this.pageView.scrollToPage(t,this.snapTime)},onHeroLoaded:function(){for(var t=0;t<this.heroInfos.length;++t){var e=cc.instantiate(this.heroPortraitPrefab).getComponent("HeroPortrait");this.pageView.addPage(e.node),e.init(this.heroInfos[t]),this.heroesInList.push(e.node)}for(var t=0;t<this.teamHeroes.length;++t){var i=this.teamHeroes[t],s=cc.instantiate(this.heroIconPrefab).getComponent("HeroIcon");this.teamLayout.node.addChild(s.node),s.init(this,t,i),this.heroesInTeam.push(s)}},chooseHero:function(){this.heroesInList[this.curSelectedIdx].getComponent("HeroPortrait").onSelect();for(var t=0;t<this.heroesInTeam.length;++t)this.heroesInTeam[t].showReplace();this.anim.play("team_show_replace")},replaceTeamHero:function(t){var e=this.heroInfos[this.curSelectedIdx];this.heroesInTeam[t].init(this,t,e);for(var i=0;i<this.heroesInTeam.length;++i)this.heroesInTeam[i].hideReplace();this.heroesInList[this.curSelectedIdx].getComponent("HeroPortrait").onFocusOn(),this.anim.play("team_hide_replace")},onStatsHide:function(){this.updateHeroStats(this.heroInfos[this.curSelectedIdx]),this.anim.play("team_cur_on")},updateHeroStats:function(t){this.iconClass.spriteFrame=this.sfClasses[o[t["class"]]],this.labelClass.string=this.strClasses[o[t["class"]]],this.labelName.string=t.name,this.stats[n.HP].setStat(t.hp/c,t.hp),this.stats[n.ATK].setStat(t.atk/r,t.atk),this.stats[n.AP].setStat(t.ap/l,t.ap),this.skillList.init(t)},lateUpdate:function(t){this.finishedLayout||this.listLayout._layoutDirty===!1&&(this.scrollToHeroIdx(1),this.finishedLayout=!0)}}),cc._RFpop()},{DataMng:"DataMng",SkillList:"SkillList",Types:"Types"}],Types:[function(t,e,i){"use strict";cc._RFpush(e,"07e7chwfRhP+btk4SdF/7zF","Types");var s=cc.Enum({Tank:-1,Assasin:-1,Shooter:-1,Wizard:-1}),o=cc.Enum({HP:-1,ATK:-1,AP:-1}),n=cc.Enum({None:-1,HealOne:-1,HealAll:-1,Blizzard:-1,DeathTouch:-1,Beam:-1,Slashes:-1,StunHammer:-1}),a=cc.Enum({None:-1,AtkUpSelf:-1,AtkUpAll:-1,ApUpSelf:-1,ApUpAll:-1,MoveUpAll:-1,LeechAll:-1,HasteAll:-1,RegenAll:-1});e.exports={ActiveSkill:n,PassiveSkill:a,HeroClass:s,HeroStats:o},cc._RFpop()},{}]},{},["Types","SkillIcon","SkillList","HeroPortrait","StatDisplay","DataMng","TeamBuild","HeroIcon"]);