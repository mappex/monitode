/*
 * monitode v2.4.16
 * (c) hex7c0 https://hex7c0.github.io/monitode/
 * Licensed under GPLv3
 */
"use strict";try{var CLIENT=require("nano")}catch(MODULE_NOT_FOUND){console.error(MODULE_NOT_FOUND),process.exit(1)}module.exports=function(){function a(a){var b=process.hrtime(a.ns);a.ns=1e9*b[0]+b[1],a.event=h.event,i.couch.insert(a,function(a){a?console.error(a):d=setTimeout(c,i.timeout)}),e(h.logger.log)}function b(a){var b=process.hrtime(a.ns);a.ns=1e9*b[0]+b[1],i.couch.insert(a,function(a){a?console.error(a):d=setTimeout(c,i.timeout)})}function c(){clearTimeout(d);var a=require(h.min+"lib/obj.js").dynamics();f?(a.net=h.net,a.io=h.io,j(a),g&&(f(),g())):j(a)}var d,e,f,g,h=GLOBAL.monitode,i=h.db,j=b;h.os&&(h.monitor.os?(h.monitor.os=!1,f=require(h.min+"lib/net.js")(),g=require(h.min+"lib/io.js")()):f=!0),h.logger.log&&(j=a,h.monitor.log?(h.monitor.log=!1,e=require(h.min+"lib/log.js")):e=function(){}),i.couch=CLIENT(i.couch),h.output&&console.log("starting monitor on CouchDb database"),c()};
