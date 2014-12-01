"use strict";try{var HTTPS=require("https"),FS=require("fs"),EXPRESS=require("express"),status=require("http").STATUS_CODES}catch(MODULE_NOT_FOUND){console.error(MODULE_NOT_FOUND),process.exit(1)}module.exports=function(){function a(a,b){var d=process.hrtime(b.ns);b.log=f.log,b.event=f.event,b.ns=1e9*d[0]+d[1],a.json(b),c(f.logger.log)}function b(a,b){var c=process.hrtime(b.ns);b.ns=1e9*c[0]+c[1],a.json(b)}var c,d,e,f=global.monitode,g=f.https,h=EXPRESS(),i=b;f.os&&(f.monitor.os?(f.monitor.os=!1,d=require(f.min+"lib/net.js")(),e=require(f.min+"lib/io.js")()):d=!0),f.logger.log&&(i=a,f.monitor.log?(f.monitor.log=!1,c=require(f.min+"lib/log.js")):c=function(){}),h.disable("x-powered-by"),h.disable("etag"),h.disable("view cache"),h.enable("case sensitive routing"),h.enable("strict routing"),h.use(require("server-signature")()),h.use(require("timeout-request")({milliseconds:4e3,header:!0,clear:!1})),h.use(require("basic-authentication")({user:g.user,password:g.password,agent:g.agent,realm:g.realm,file:g.file,hash:g.hash,suppress:!0}));var j=g.dir,k=j+"monitode.html";h.use(EXPRESS.static(j)),FS.existsSync(g.key)&&FS.existsSync(g.cert)&&(f.output&&console.log("starting monitor on port "+g.port),HTTPS.createServer({key:FS.readFileSync(g.key),cert:FS.readFileSync(g.cert)},h).listen(g.port)),global.monitode.https=!0,h.get("/",function(a,b){return b.sendFile(k)}),h.post("/dyn/",function(a,b){var c=require(f.min+"lib/obj.js").dynamics();d?(c.net=f.net,c.io=f.io,i(b,c),e&&(d(),e())):i(b,c)}),h.post("/sta/",function(a,b){b.json(require(f.min+"lib/obj.js").statics(f.app))}),h.use(function(a,b,c,d){var e=500,f="";switch(a.message.toLowerCase()){case"not found":return d();default:f=a.message.toLowerCase()}c.status(e).json({error:f||status[e].toLowerCase()})}),h.use(function(a,b){var c=404;b.status(c).json({error:status[c].toLowerCase()})})};
