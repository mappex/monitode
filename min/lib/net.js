/*
 * monitode v2.4.6
 * (c) hex7c0 https://hex7c0.github.io/monitode/
 * Licensed under GPLv3
 */
"use strict";try{var OS=require("os").platform(),spawn=require("child_process").spawn}catch(MODULE_NOT_FOUND){console.error(MODULE_NOT_FOUND),process.exit(1)}module.exports=function(){function a(){f=spawn("netstat",["-w 2"],{stdio:["ignore","pipe"]}),f.stdout.on("data",function(a){for(var b=String(a).split(/\r?\n/),c=0,d=b.length;d>c;c++){var e=b[c].match(/^\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*/);e&&(h=[parseInt(e[1])+h[0],parseInt(e[2])+h[1],parseInt(e[4])+h[2],parseInt(e[5])+h[3]])}g++}),f.stderr.on("data",function(a){console.error(String(a)),f.kill("SIGKILL")})}function b(){f=spawn("netstat",["-i","-c","2"],{stdio:["ignore","pipe"]}),f.stdout.on("data",function(a){for(var b=String(a).split(/\r?\n/),c=0,d=b.length;d>c;c++){var e=b[c].match(/^([a-zA-z]+[0-9]+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)*/);e&&(0==i&&(i=[parseInt(e[4]),parseInt(e[5]),parseInt(e[8]),parseInt(e[9])]),h=[parseInt(e[4])+h[0]-i[0],parseInt(e[5])+h[1]-i[1],parseInt(e[8])+h[2]-i[2],parseInt(e[9])+h[3]-i[3]])}g++}),f.stderr.on("data",function(a){console.error(String(a)),f.kill("SIGKILL")})}function c(){GLOBAL.monitode.net={inn:{pacs:h[0],errs:h[1]},out:{pacs:h[2],errs:h[3]}},h=[0,0,0,0],g>=600&&(g=0,f.kill("SIGTERM"),f=null,e())}function d(){GLOBAL.monitode.net={inn:{pacs:h[0],errs:h[1]},out:{pacs:h[2],errs:h[3]}},h=[0,0,0,0],g>=600&&(g=0,f.kill("SIGTERM"),f=null,e())}function e(){return"darwin"==OS.toLowerCase()?(a(),c):"linux"==OS.toLowerCase()?(b(),d):(GLOBAL.monitode.net=null,function(){})}var f,g=0,h=[0,0,0,0],i=0;return e()};
