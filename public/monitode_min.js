/*
 * monitode v2.4.7
 * (c) hex7c0 https://hex7c0.github.io/monitode/
 * Licensed under GPLv3
 */
"use strict";function dyna($http,$scope,$timeout){function loop(){$http({method:"POST",url:"/dyn/"}).success(function(data){store.x.push(new Date(data.date)),store.one.push(data.cpu.one),store.five.push(data.cpu.five),store.fifteen.push(data.cpu.fifteen),store.total.push(data.mem.total/1024),store.used.push(data.mem.used/1024);var mfree=data.mem.total-data.mem.used;store.v8rss.push(data.mem.v8.rss/1024),store.v8total.push(data.mem.v8.total/1024),store.v8used.push(data.mem.v8.used/1024);var X=store.x;if(avg.load({columns:[X,store.one,store.five,store.fifteen]}),meml.load({columns:[X,store.total,store.used,store.v8rss,store.v8total,store.v8used]}),memp.load({columns:[["used",data.mem.used],["free",mfree]]}),data.net&&(store.inet.push(data.net.inn.pacs),store.onet.push(data.net.out.pacs),store.tps.push(data.io.tps),store.mbs.push(data.io.mbs),os||loadOs(),os.load({columns:[X,store.inet,store.onet,store.tps,store.mbs]})),0==cpus.length)$scope.cpus=cpus=data.cpu.cpus,loadProc($scope.cpus);else for(var i=0,ii=data.cpu.cpus.length;ii>i;i++){var cpu=data.cpu.cpus[i];cpus[i].load({columns:[["user",cpu.times.user],["nice",cpu.times.nice],["sys",cpu.times.sys],["idle",cpu.times.idle],["irq",cpu.times.irq]]})}if($scope.dynamics=[{title:"Ajax lag",info:Date.now()-data.date+" milliseconds"},{title:"System lag",info:data.ns/1e6+" milliseconds"},{title:"System uptime",info:Math.floor(data.uptime.os/60)+" minutes"},{title:"System uptime Node",info:Math.floor(data.uptime.node/60)+" minutes"}],data.tickle){var temp={title:"Request counter"},temps=[];for(var property in data.tickle)temps.push({title:property,info:data.tickle[property]});temp.child=temps,$scope.dynamics.push(temp)}$scope.refresh=[];var temp={title:"Logger",child:[]},temps=[];for(var property in data.log)temps.push({title:property,info:data.log[property]});try{data.log.counter?temp.child=temps:temp.info="disabled",$scope.refresh[0]=temp}catch(TypeError){}if(data.event){var temp={title:"Logger story event",child:[]},temps=store.logger;for(var property0 in data.event){flag=!0;var arr0=data.event[property0];for(var property1 in arr0){var arr1=arr0[property1];for(var property2 in arr1){var arr2=arr1[property2];temps.push({title:property0,info:property1+" "+property2+" * "+arr2.counter})}}}flag&&(temp.child=temps,$scope.refresh[1]=temp)}return dyna($http,$scope,$timeout)}).error(function(){alert("server doesn't respond")})}$timeout.cancel(promise),$scope.clock>0?promise=$timeout(loop,1e3*$scope.clock):0==$scope.clock&&($scope.clock=5,loop())}function stat($http,$scope){$http({method:"POST",url:"/sta/"}).success(function(data){$scope.statics=[{title:"CPU architecture",info:data.os.arch},{title:"OS hostname",info:data.os.hostname},{title:"OS platform",info:data.os.platform},{title:"OS type",info:data.os.type},{title:"OS release",info:data.os.release},{title:"OS endianness",info:data.endianness},{title:"Process gid",info:data.process.gid},{title:"Process uid",info:data.process.uid},{title:"Process pid",info:data.process.pid}];var temp={title:"Process environment"},temps=[];for(var property in data.process.env)temps.push({title:property,info:data.process.env[property]});temp.child=temps,$scope.statics.push(temp);var temp={title:"Network interfaces"},temps=[];for(var property in data.network)for(var inside in data.network[property]){var obj=data.network[property][inside];obj.internal||temps.push({title:property+" ("+obj.family+")",info:obj.address})}temp.child=temps,$scope.statics.push(temp);var temp={title:"Node version"},temps=[];for(var property in data.version)temps.push({title:property,info:data.version[property]});if(temp.child=temps,$scope.statics.push(temp),data.route){var temp={title:"Sitemap"},temps=[];for(var property in data.route)temps.push({title:property,info:data.route[property]});temp.child=temps,$scope.statics.push(temp)}}).error(function(){})}function load(){avg=c3.generate({bindto:"#average",data:{type:"line",x:"x",columns:[store.x,store.one,store.five,store.fifteen],names:{one:"average in 1 min",five:"average in 5 min",fifteen:"average in 15 min"},colors:{one:"#107aff",five:"#00a855",fifteen:"#ff9900"}},size:{height:400},grid:{y:{lines:[{value:1,text:"overload"}]}},axis:{x:{type:"timeseries",label:"time",localtime:!1,tick:{count:5,format:"/%d %H:%M:%S"}},y:{label:"load average",tick:{format:d3.format(",")}}}}),meml=c3.generate({bindto:"#memory_lin",data:{type:"bar",types:{total:"area",used:"spline",v8total:"line"},groups:[["v8rss","v8used"]],x:"x",columns:[store.x,store.total,store.used,store.v8rss,store.v8total,store.v8used],names:{total:"total memory",used:"memory used"},colors:{used:"red",total:"gray"}},size:{height:400},axis:{x:{type:"timeseries",label:"time",localtime:!1,tick:{count:5,format:"/%d %H:%M:%S"}},y:{label:"kilobytes"}}}),memp=c3.generate({bindto:"#memory_pie",data:{type:"pie",columns:[["used",0],["free",100]],names:{used:"memory used",free:"memory free"},colors:{used:"red",free:"orange"}},size:{height:250}})}function loadProc(cpu){for(var buff=cpu,i=0;i<buff.length;i++)cpus[i]=c3.generate({bindto:"#cpu_"+i,data:{type:"donut",columns:[["user",buff[i].times.user],["nice",buff[i].times.nice],["sys",buff[i].times.sys],["idle",buff[i].times.idle],["irq",buff[i].times.irq]],colors:{user:"#107aff",idle:"#00a855",sys:"#ff9900"}},donut:{title:"CPU "+(i+1)},legend:{show:!1},size:{height:280,width:280},padding:{top:0,right:0,bottom:0,left:0}})}function loadOs(){os=c3.generate({bindto:"#os",data:{type:"spline",x:"x",columns:[store.x,store.inet,store.onet,store.tps,store.mbs],names:{inet:"input packets",onet:"output packets",tps:"transfers/s",mbs:"MB/s"},colors:{inet:"red",onet:"blue",tps:"green",mbs:"purple"}},axis:{x:{type:"timeseries",label:"time",localtime:!1,tick:{count:5,format:"/%d %H:%M:%S"}}}})}function controller($scope,$http,$timeout){$scope.clock=0,dyna($http,$scope,$timeout),stat($http,$scope),$scope.button=function(item){switch(item){case"dynamic":dyna($http,$scope,$timeout);break;case"static":stat($http,$scope);break;case"stop":$timeout.cancel(promise);break;case"csv":var content="data:text/csv;charset=utf-8,";content+="date,average 1 min,average 5 min,average 15 min,memory used\n";for(var i=1;i<store.x.length;i++)content+=store.x[i]+",",content+=store.one[i]+",",content+=store.five[i]+",",content+=store.fifteen[i]+",",content+=store.used[i]+"\n";window.open(encodeURI(content));break;case"clear":var len=store.x.length;for(var property in store)store[property].splice(1,len);store.logger=[]}}}var promise,flag=!1,avg,meml,memp,os,cpus=[],app=angular.module("monitode",[]),store={x:["x"],one:["one"],five:["five"],fifteen:["fifteen"],total:["total"],used:["used"],v8rss:["v8rss"],v8total:["v8total"],v8used:["v8used"],inet:["inet"],onet:["onet"],tps:["tps"],mbs:["mbs"],logger:[]};load(),app.controller("main",controller);
