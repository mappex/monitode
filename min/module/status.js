/*
 * monitode v2.4.0
 * (c) hex7c0 https://hex7c0.github.io/monitode/
 * Licensed under GPLv3
 */
"use strict";try{var HTTP=require("http"),HTTPS=require("https"),URL=require("url"),LOGGER=require("logger-request")}catch(MODULE_NOT_FOUND){console.error(MODULE_NOT_FOUND),process.exit(1)}module.exports=function(){function a(a){var b=Math.floor(a.statusCode/100);b>=4&&console.log((new Date).toUTCString()+" "+a.connection._host+" "+a.statusCode),e.file("moniStatus",{host:a.connection._host,status:a.statusCode,message:a.statusMessage,headers:a.headers})}function b(){clearTimeout(c);for(var d=0,f=e.site.length;f>d;d++){var g=URL.parse(e.site[d]),h=HTTP;try{"https"==g.protocol.substr(0,5)&&(h=HTTPS)}catch(i){}var j;j=g.hostname?h.request({port:e.port[d],hostname:g.hostname,headers:{"User-Agent":e.agent},method:e.method,agent:!1},a):h.request({port:e.port[d],host:e.site[d],headers:{"User-Agent":e.agent},method:e.method,agent:!1},a),j.on("error",function(a){console.error(a)}),j.end()}c=setTimeout(b,e.timeout)}var c,d=GLOBAL.monitode,e=d.status;return e.file=LOGGER({standalone:!0,filename:e.file,winston:{logger:"moniStatus",level:"debug",maxsize:null,json:!1}}),d.output&&console.log("starting monitor with status"),b()};