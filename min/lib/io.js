/*
 * monitode v2.4.7
 * (c) hex7c0 https://hex7c0.github.io/monitode/
 * Licensed under GPLv3
 */
"use strict";try{var OS=require("os").platform(),spawn=require("child_process").spawn}catch(MODULE_NOT_FOUND){console.error(MODULE_NOT_FOUND),process.exit(1)}module.exports=function(){function a(){f=spawn("iostat",["-d","-w","2"],{stdio:["ignore","pipe"]}),f.stdout.on("data",function(a){for(var b=String(a).split(/\r?\n/),c=0,d=b.length;d>c;c++){var e=b[c].match(/^\s+(\d+(?:\.\d+))\s+(\d+)\s+(\d+(?:\.\d+))\s*/);e&&(h=[parseFloat(e[2])+h[0],parseFloat(e[3])+h[1]])}g++}),f.stderr.on("data",function(a){console.error(String(a)),f.kill("SIGKILL")})}function b(){f=spawn("iostat",["-d","2","-k","-p","sda"],{stdio:["ignore","pipe"]}),f.stdout.on("data",function(a){for(var b=String(a).split(/\r?\n/),c=0,d=b.length;d>c;c++){var e=b[c].match(/(\d+(?:\.\d+))\s+(\d+(?:\.\d+))\s+(\d+(?:\.\d+))\s*/);e&&(h=[parseFloat(e[1])+h[0],parseFloat(e[2])+parseFloat(e[3])+h[1]])}g++}),f.stderr.on("data",function(a){console.error(String(a)),f.kill("SIGKILL")})}function c(){GLOBAL.monitode.io={tps:h[0],mbs:h[1]},h=[0,0],g>=600&&(g=0,f.kill("SIGTERM"),f=null,e())}function d(){GLOBAL.monitode.io={tps:h[0],mbs:h[1]/1024},h=[0,0],g>=600&&(g=0,f.kill("SIGTERM"),f=null,e())}function e(){return"darwin"==OS.toLowerCase()?(a(),c):"linux"==OS.toLowerCase()?(b(),d):(GLOBAL.monitode.io=null,function(){})}var f,g=0,h=[0,0];return e()};
