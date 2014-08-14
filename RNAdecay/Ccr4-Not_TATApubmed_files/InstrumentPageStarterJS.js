
if(typeof ncbi=="undefined"){ncbi={};}ncbi.sg=function(){};ncbi.sg.getInstance=function(){if(!ncbi.sg._instance){ncbi.sg._instance=new ncbi.sg();}return ncbi.sg._instance;};ncbi.sg._instance=null;ncbi.sg._version='12';(function(){var logRandNum=Math.random();ncbi.sg.timeDelay=(logRandNum<.25)?10:(logRandNum<.50)?50:(logRandNum<.75)?100:200;var cookieEnabled=(navigator.cookieEnabled)?true:false;if(typeof navigator.cookieEnabled=="undefined"&&!cookieEnabled){document.cookie="testcookie";cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)?true:false;}ncbi.sg.isCookieEnabled=cookieEnabled;})();ncbi.sg.isSafari=(navigator&&navigator.vendor)?(navigator.vendor.indexOf("Apple")!==-1):false;ncbi.sg.appLogIgnore=["ncbi_sessionid","ncbi_clickdisabled"];ncbi.sg.prototype={init:function(){this.isDebugMode=((this.getCookie("debugger").length>0)&&console&&console.info);this.isProcessRunning=true;this._setUpOmnValues();this._setUpPathParts();this._setUpCustomProps();this._addOnScrollListeners();this.send("init");this._sendPrev();},_vals:{},_cachedVals:{},_hasInitRun:false,_pathParts:{"part1":"","part2":"","part3":"","part4":""},_setUpOmnValues:function(){var mTags=document.getElementsByTagName("meta");for(var i=0;i<mTags.length;i++){var mName=mTags[i].name;if(mName.indexOf("ncbi_")===0){var mContent=mTags[i].content;this.addEntry(mName,mContent);}}},_setUpSubsetOmnValues:function(subsetData){for(var i=0;i<subsetData.length;i++){var mData=this._cachedVals[subsetData[i]];if(mData){this.addEntry(subsetData[i],mData.value);}}},cachedNames:["ncbi_app","ncbi_db","ncbi_pcid","ncbi_pdid","ncbi_phid","ncbi_sessionid"],ignoreLengthRestrictions:["jserror","jserrortype"],addEntry:function(mName,mContent){if(mContent===undefined||mContent.length===0){return;}else if(mContent.length>100&&this.ignoreLengthRestrictions.indexOf(mName)===-1){mContent=mContent.substr(0,100);}this._cachedVals[mName]={sProp:mName,value:mContent};},removeAllEntries:function(){var tempCache={};var cnt=this.cachedNames.length;for(var i=0;i<cnt;i++){var name=this.cachedNames[i];var data=this._cachedVals[name];if(data){tempCache[name]=data;}}this._cachedVals=tempCache;for(var p in this._pathParts){this._pathParts[p]="";}},_setUpCustomProps:function(){var a=this._pathParts.part1;var b=(this._pathParts.part2.length>0)?":"+this._pathParts.part2:"";var c=(this._pathParts.part3.length>0)?":"+this._pathParts.part3:"";var d=(this._pathParts.part4.length>0)?":"+this._pathParts.part4:"";var custData={"pagename":a+b+c,"server":window.location.hostname,"sitesect2":a+b,"subsect3":a+b+c,"subsect4":a+b+c+d,"heir1":(a+b+c+d).replace(/:/g,"|")};for(var prop in custData){this.addEntry(prop,custData[prop]);}this._sessionIdCheck();this._staticPageCheck();this._prevHitCheck();this._configCheck();this._hashCheck();},_staticPageCheck:function(){if(!(this._cachedVals["ncbi_app"]&&this._cachedVals["ncbi_app"].value.length>0)){this.addEntry("ncbi_app","static");}if(!(this._cachedVals["ncbi_pdid"]&&this._cachedVals["ncbi_pdid"].value.length>0)){var title=(document.title||"unknown").replace(/\s+/g,"");this.addEntry("ncbi_pdid",title);}},_sessionIdCheck:function(){if(!(this._cachedVals["ncbi_sessionid"]&&this._cachedVals["ncbi_sessionid"].value.length>0)){var sessID="";if(sessID.length===0){var webEnv=this.getCookie("WebCubbyUser")||this.getCookie("WebEnv");if(webEnv.length>0){webEnv=unescape(webEnv).split("@");if(webEnv.length>1){sessID=webEnv[webEnv.length-1];}}}if(sessID.length===0){sessID="NOSESSIONID";}this.addEntry("ncbi_sessionid",sessID);}},getBrowserWidthHeight:function(){var bWidth=window.innerWidth?window.innerWidth:document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:document.body!==null?document.body.clientWidth:"NA";var bHeight=window.innerHeight?window.innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:document.body!==null?document.body.clientHeight:"NA";return{"width":bWidth,"height":bHeight}},_configCheck:function(){var bProps=this.getBrowserWidthHeight();this.addEntry("browserwidth",bProps.width);this.addEntry("browserheight",bProps.height);this.addEntry("screenwidth",screen.width);this.addEntry("screenheight",screen.height);this.addEntry("screenavailwidth",screen.availWidth);this.addEntry("screenavailheight",screen.availHeight);if(document&&document.body){var scrollW=document.body.scrollWidth;var scrollH=document.body.scrollHeight;var canScroll_x=scrollW>bProps.width?"true":"false";var canScroll_y=scrollH>bProps.height?"true":"false";this.addEntry("canscroll_x",canScroll_x);this.addEntry("canscroll_y",canScroll_y);this.addEntry("scrollheight",scrollW);this.addEntry("scrollwidth",scrollH);}if(screen.colorDepth){this.addEntry("colorDepth",screen.colorDepth);}else if(screen.pixelDepth){this.addEntry("colorDepth",screen.pixelDepth);}},_hashCheck:function(){var hash=window.location.hash;if(hash){hash=hash.replace("#","");this.addEntry("urlhash",hash);}},_createPHID:function(){var sess=this._cachedVals["ncbi_sessionid"];var sessVal=sess.value;var calcPHID=sessVal.substr(0,15)+"9"+new Date().getTime().toString();var left=32-calcPHID.length;var sessLen=sessVal.length;calcPHID+=sessVal.substr(sessLen-left,sessLen);var currPHID={value:calcPHID};this.addEntry("ncbi_phid",calcPHID);return currPHID;},currentPageHitId:null,_prevHitCheck:function(){var prevPHID=this.getCookie("ncbi_prevPHID");var currPHID=this._cachedVals["ncbi_phid"];if(prevPHID.length>0){this.addEntry("prev_phid",prevPHID);}if(!currPHID||!currPHID.value||currPHID.value.length===0){currPHID=this._createPHID();}this.currentPageHitId=currPHID.value;var that=this;if(ncbi.sg._hasFocus){that.setCookie("ncbi_prevPHID",currPHID.value);}var oFoc=window.onfocus;window.onfocus=function(e){if(that.getCookie("ncbi_prevPHID")!==currPHID.value){that.setCookie("ncbi_prevPHID",currPHID.value);}if(typeof oFoc==="function"){oFoc(e);}};},_setUpPathParts:function(){var ncbi_app=this._cachedVals["ncbi_app"];var ncbi_db=this._cachedVals["ncbi_db"];var ncbi_pdid=this._cachedVals["ncbi_pdid"];var ncbi_pcid=this._cachedVals["ncbi_pcid"];this._pathParts.part1=(ncbi_app!==undefined)?ncbi_app.value:"";this._pathParts.part2=(ncbi_db!==undefined)?ncbi_db.value:"";this._pathParts.part3=(ncbi_pdid!==undefined)?ncbi_pdid.value:"";this._pathParts.part4=(ncbi_pcid!==undefined)?ncbi_pcid.value:"";},send:function(method,callbackFnc){var al=[];if(method==="init"){al.push("jsevent=render");ncbi.sg.renderTime=new Date();if(typeof ncbi_startTime!=="undefined"){var dtRenderTime=ncbi.sg.renderTime-ncbi_startTime;al.push("jsrendertime="+dtRenderTime);if(ncbi.sg.loadTime){var dtLoadTime=ncbi.sg.loadTime-ncbi_startTime;al.push("jsloadtime="+dtLoadTime);}}var isCookieEnabled=ncbi.sg.isCookieEnabled?"true":"false";al.push("cookieenabled="+isCookieEnabled);if(!ncbi.sg.isSafari){al.push("timeDelay="+Math.round(ncbi.sg.timeDelay));}}for(var prop in this._cachedVals){if(ncbi.sg.appLogIgnore.indexOf(prop)!==-1){continue;}var val=this._cachedVals[prop].value;al.push(prop+"="+encodeURIComponent(val));}var appStr=al.join("&");if(this.isDebugMode){console.info("sg Data:\n\n"+al.join("\n"));}this.sendAl(appStr,callbackFnc,true);this._hasInitRun=true;var ref=this;setTimeout(function(){ref.isProcessRunning=false;ref.runSGProcess();},300);},_sendPrev:function(){var sg=ncbi.sg.getInstance();var val=sg.getCookie("prevevt");if(val){ncbi.sg.ping(val);sg.setCookie("prevevt","");}},sendAl:function(data,callbackFnc,isAsync){data+="&sgVersion="+ncbi.sg._version;if(this.isDebugMode){console.info("al Sent: \n"+data);}var ref=this;var port=(window.location.port.length>0)?":"+window.location.port:"";var reqURL=window.location.protocol+"//"+window.location.hostname+port+"/stat?"+data;this.makeAjaxCall(reqURL,function(){if(ref.isDebugMode){console.info("al: done");}if(typeof callbackFnc==="function"){callbackFnc();}},isAsync);},_processingQueue:[],isProcessRunning:false,addSGProcess:function(data){this._processingQueue.push(data);},getSGProcess:function(data){return this._processingQueue.shift(data);},runSGProcess:function(){if(this.isProcessRunning||this._processingQueue.length===0||!this._hasInitRun){return false;}this.isProcessRunning=true;this.removeAllEntries();var nextSet=this.getSGProcess();this._setUpSubsetOmnValues(nextSet.metadata);if(this.isDebugMode){console.info("Now sg "+nextSet.eventName+" to the server");}this.addEntry("jsevent",nextSet.eventName);for(var entry in nextSet.props){this.addEntry(entry,nextSet.props[entry]);}this.send(nextSet.eventName,nextSet.callbackFnc);var ref=this;setTimeout(function(){ref.isProcessRunning=false;ref.runSGProcess();},300);},noteEventData:function(jsEventName,custprops,metaData,callbackFnc){if(this.isDebugMode){console.info("Adding "+jsEventName+" to the queue");}this.addSGProcess({"eventName":jsEventName,"props":custprops,"metadata":metaData,"callback":callbackFnc});this.runSGProcess();},setCookie:function(c_name,value,expiredays){var exdate=new Date();if(expiredays!==null){exdate.setDate(exdate.getDate()+expiredays);}document.cookie=c_name+"="+escape(value)+((expiredays===null)?"":"; expires="+exdate.toGMTString())+"; domain="+escape(".nih.gov")+"; path=/";},getCookie:function(c_name){if(document.cookie.length>0){var c_start=document.cookie.indexOf(c_name+"=");if(c_start!=-1){c_start=c_start+c_name.length+1;var c_end=document.cookie.indexOf(";",c_start);if(c_end==-1){c_end=document.cookie.length;}return unescape(document.cookie.substring(c_start,c_end));}}return"";},getTransport:function(){var req=null;if(window.XMLHttpRequest){try{req=new XMLHttpRequest();this.getTransport=function(){return new XMLHttpRequest();};}catch(e0){req=null;}}if(window.ActiveXObject&&req===null){try{req=new ActiveXObject("Msxml2.XMLHTTP");this.getTransport=function(){return new ActiveXObject("Msxml2.XMLHTTP");};}catch(e1){try{req=new ActiveXObject("Microsoft.XMLHTTP");this.getTransport=function(){return new ActiveXObject("Microsoft.XMLHTTP");};}catch(e2){req=false;}}}if(req===null){this.getTransport=function(){return null;};}return this.getTransport();},makeAjaxCall:function(url,callback,isAsync){var xhr=this.getTransport();xhr.open("GET",url,isAsync);if(isAsync){xhr.onreadystatechange=function(){if(xhr.readyState===4){callback(xhr);}};}ncbi.sg.lastPing=xhr;xhr.send(null);},scrollDetails:{maxScroll_x:0,maxScroll_y:0,currScroll_x:0,currScroll_y:0,hasScrolled:false},_addOnScrollListeners:function(){var osc=window.onscroll;var that=this;window.onscroll=function(){that._setScrollDetails();that.scrollDetails.hasScrolled=true;if(typeof osc==="function"){return osc();}};},_setScrollDetails:function(){this.scrollDetails.currScroll_y=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;this.scrollDetails.currScroll_x=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;var bWidth=window.innerWidth?window.innerWidth:document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:document.body!==null?document.body.clientWidth:"NA";var bHeight=window.innerHeight?window.innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:document.body!==null?document.body.clientHeight:"NA";if(this.scrollDetails.maxScroll_y<this.scrollDetails.currScroll_y){this.scrollDetails.maxScroll_y=this.scrollDetails.currScroll_y;}if(this.scrollDetails.maxScroll_x<this.scrollDetails.currScroll_x){this.scrollDetails.maxScroll_x=this.scrollDetails.currScroll_x;}},getScrollDetails:function(obj){this._setScrollDetails();var sd=this.scrollDetails;if(!obj)obj={};for(var x in sd){obj[x]=sd[x];}return obj;}};ncbi.sg.lastPing=null;ncbi.sg.hasNotedErrorEvent=false;(function(){var oe=window.onerror;window.onerror=function(a,b,c){if(this.isDebugMode&&console.warn){console.warn("sg error to server to be investigated: \n"+a+"\n"+b+"\n"+c);}if(ncbi.sg.hasNotedErrorEvent){if(this.isDebugMode){console.info("Already found one error for this page, not sending another error report");}return;}ncbi.sg.getInstance().noteEventData("jserror",{"jserror":c+": "+a,"jserrortype":b},["ncbi_sessionid","ncbi_phid"]);ncbi.sg.hasNotedErrorEvent=true;if(typeof oe==="function"){return oe(a,b,c);}};var obul=window.onbeforeunload;window.onbeforeunload=function(e){pingHit();var ts=new Date().getTime()+ncbi.sg.timeDelay;var endTime=new Date(ts);if(ncbi.sg.lastPing&&ncbi.sg.lastPing.readyState<4){while(new Date()<endTime&&ncbi.sg.lastPing.readyState<4){}}if(typeof obul==="function"){return obul(e);}};var hits=[];var loggedHits=[];var processedHits=[];function addHit(hitObj){var queLen=hits.length;var histLen=processedHits.length;var lastHit=queLen>0?hits[queLen-1]:histLen>0?processedHits[histLen-1]:null;if(lastHit!==null){if(hitObj.elem==lastHit.elem){if((lastHit.floodTstamp&&hitObj.floodTstamp-lastHit.tstamp<=400)||(hitObj.tstamp-lastHit.tstamp<=400)){lastHit.floodTstamp=new Date().getTime();return false;}}lastHit.floodTstamp=new Date().getTime();}hits.push(hitObj);return true;}var hasUnloadHappened=false;function pingHit(){ncbi.sg.getInstance().setCookie("ncbi_prevPHID",ncbi.sg.getInstance().currentPageHitId);if(hits.length>0){while(hits.length>0){sendClick(hits.pop());}}var details={"jsevent":"unload","ncbi_pingaction":"unload"};ncbi.sg.getInstance().getScrollDetails(details);if(!hasUnloadHappened){ncbi.sg.ping(details);}hasUnloadHappened=true;}function reassignOnclick(elem){if(!elem){return;}if(elem.onclick){elem.onclick_=elem.onclick;}if(elem.oncontextmenu){elem.oncontextmenu_=elem.oncontextmenu;}}function noteClick(detail){for(var i=hits.length-1;i>=-1;i--){if(hits[i]==detail){hits.slice(i,1);break;}}sendClick(detail);}function sendClick(detail,additionalData){if(loggedHits.indexOf(detail.tstamp)!==-1){return;}loggedHits.push(detail.tstamp);processedHits.push(detail);sendElementEvent("click",detail,additionalData);}function sendElementEvent(jsEventName,detail,additionalData){var parmId=(jsEventName==="click")?"link":"elem";var linkObj=detail.link;var evt=detail.evt;var link_id=linkObj.id||"";var link_name=linkObj.name||"";var link_sid=linkObj.sid||"";var link_href=linkObj.href||"";var link_text=linkObj.innerText||linkObj.textContent||"";if(link_text.length>50){link_text=link_text.substr(0,50);}var link_ref=linkObj.getAttribute("ref")||linkObj.ref||"";var link_class=linkObj.className.replace(/^\s?/,"").replace(/\s?$/,"").split(/\s/g).join(",")||"";var ancestorId=[];var ancestorClassName=[];var parObj=linkObj.parentNode;if(parObj){for(var i=0;i<6&&parObj!==null;i++){parId=parObj.id;if(parId){ancestorId.push(parId);}parClassName=parObj.className;if(parClassName){ancestorClassName=ancestorClassName.concat(parClassName.split(/\s/));}parObj=parObj.parentNode;}}var statInstance=ncbi.sg.getInstance();var phid=statInstance.currentPageHitId||"";var data=[];if(link_id.length>0){data.push(parmId+"_id="+encodeURIComponent(link_id));}if(link_name.length>0){data.push(parmId+"_name="+encodeURIComponent(link_name));}if(link_sid.length>0){data.push(parmId+"_sid="+encodeURIComponent(link_sid));}if(link_href.length>0){data.push(parmId+"_href="+encodeURIComponent(link_href));}if(link_text.length>0){data.push(parmId+"_text="+encodeURIComponent(link_text));}if(link_class.length>0){data.push(parmId+"_class="+encodeURIComponent(link_class));}var browserProps=statInstance.getBrowserWidthHeight();if(browserProps.width!==null){data.push("browserwidth="+encodeURIComponent(browserProps.width));}if(browserProps.height!==null){data.push("browserheight="+encodeURIComponent(browserProps.height));}for(var itm in evt){var val=evt[itm];if(val!==undefined){data.push(itm.toLowerCase()+"="+val.toString());}}data.push("jsevent="+jsEventName);if(link_ref.length>0){data.push(link_ref);}if(typeof jQuery!=="undefined"){var linkSG=jQuery(linkObj).attr("sg");if(linkSG){var sgData=linkSG.split(/\}\s*,\s*\{/);for(var i=0;i<sgData.length;i++){var matchedData=sgData[i].match(/name\s*:\s*'(.+)',\s*selector\s*:\s*'(.+)'/);if(matchedData.length!==3){continue;}var propName="cust_"+matchedData[1];var propVal=jQuery(matchedData[2]).val();data.push(propName+"="+encodeURIComponent(propVal));}}}if(additionalData&&additionalData.length>0){while(additionalData.length>0){data.push(additionalData.shift());}}if(ancestorId.length>0){data.push("ancestorId="+ancestorId.join(","));}if(ancestorClassName.length>0){data.push("ancestorClassName="+ancestorClassName.join(","));}if(jsEventName==="click"){var strRec=data.join("&").replace("jsevent=click","jsevent=clicknext");var phid=ncbi.sg.getInstance().currentPageHitId||"";strRec+="&ncbi_phid="+phid;statInstance.setCookie("prevevt",strRec,null);}var isAsynchronous=!ncbi.sg.isSafari;ncbi.sg.ping(data,isAsynchronous);}ncbi.sg.sendElementEvent=sendElementEvent;function getCommonEventDetails(evt){var eventDetails={};ncbi.sg.getInstance().getScrollDetails(eventDetails);if(evt){if(evt.clientX||evt.clientY){eventDetails.evt_coor_x=evt.clientX+eventDetails.currScroll_x;eventDetails.evt_coor_y=evt.clientY+eventDetails.currScroll_y;}else if(evt.pageX||evt.pageY){eventDetails.evt_coor_x=evt.pageX;eventDetails.evt_coor_y=evt.pageY;}}return eventDetails;}ncbi.sg.clickTimers=[];function linkLoop(links,linkCurr,linkLen){function _clicky(evt,elem,args,method){ncbi.sg.getInstance().setCookie("ncbi_prevPHID",ncbi.sg.getInstance().currentPageHitId);var eventDetails=getCommonEventDetails(evt);eventDetails.iscontextmenu=(method==="contextmenu")?"true":"false";var clickDetails={"evt":eventDetails,"link":elem,tstamp:new Date().getTime(),floodTstamp:new Date().getTime()};noteClick(clickDetails);if(ncbi.sg.clickTimers){window.clearTimeout(ncbi.sg.clickTimers);}ncbi.sg.clickTimers=window.setTimeout(function(){ncbi.sg.clickTimers=null;},300);var returnData=null;function runDefault(meth){var fixEvent=function(e){if(typeof e.preventDefault==="undefined")e.preventDefault=function(){this.returnValue=false;};if(typeof e.stopPropagation==="undefined")e.stopPropagation=function(){this.cancelBubble=true;};return e;};var fixedEvt=fixEvent(evt);var argsAdj=[fixedEvt];for(var i=0;i<args.length;i++){argsAdj.push(args[i]);}returnData=elem[meth].apply(elem,argsAdj);}if(method==="click"&&typeof elem.onclick_==="function"){runDefault("onclick_");}else if(method==="contextmenu"&&typeof elem.oncontextmenu_==="function"){runDefault("oncontextmenu_");}if(returnData!==null||returnData!==undefined){return returnData;}}for(var i=0;i<10&&linkCurr<linkLen;i++){var elem=links[linkCurr];if(elem&&!elem._sg){elem._sg=true;reassignOnclick(elem);elem.onclick=function(e){var evt=e||window.event;var returnData=null;returnData=_clicky(evt,this,arguments,"click");if(returnData!==null||returnData!==undefined){return returnData;}};elem.oncontextmenu=function(e){var evt=e||window.event;var returnData=null;returnData=_clicky(evt,this,arguments,"contextmenu");if(returnData!==null||returnData!==undefined){return returnData;}};}linkCurr++;}if(linkCurr<linkLen){var nFnc=function(){linkLoop(links,linkCurr,linkLen);};var t=window.setTimeout(nFnc,0);}}if(typeof ncbi.sg.isClickEnabled==="undefined"){var metas=document.getElementsByTagName("meta");var i=metas.length-1;var isClickEnabled=true;while(i>=0){if(metas[i].name.toLowerCase()==="ncbi_clickdisabled"){isClickEnabled=metas[i].content.toLowerCase()==="false";break;}i--;}ncbi.sg.isClickEnabled=isClickEnabled;}function scanLinks(){if(ncbi.sg.isClickEnabled){var lnks=document.links;linkLoop(lnks,0,lnks.length);var btns=document.getElementsByTagName("button");linkLoop(btns,0,btns.length);var btns2=[];if(typeof jQuery!=="undefined"){btns2=jQuery("input[type=button], input[type=submit], input[type=reset]").get();}else{var fInputs=document.getElementsByTagName("input");btns2=[];var i=fInputs.length-1;while(i>=0){var inp=fInputs[i];var typ=inp.type;if(typ==="button"||typ==="submit"||typ==="reset"){btns2.push(inp);}i--;}}if(btns2.length>0){linkLoop(btns2,0,btns2.length);}}}scanLinks();ncbi.sg.scanLinks=function(linkObjs){if(linkObjs){if(typeof linkObjs==="object"&&!(linkObjs instanceof Array)){linkObjs=[linkObjs];}linkLoop(linkObjs,0,linkObjs.length);}else{scanLinks();}};function _pingWithElement(elemObj,eventObj,jsEvent,additionalData){var elem=elemObj;var evtProps={};var evtName=null;var addData=null;if(typeof eventObj==="string"){evtName=eventObj;addData=jsEvent;}else{evtProps=getCommonEventDetails(eventObj);evtName=jsEvent;addData=additionalData;}if(addData){var addDataType=typeof addData;if(addDataType==="string"){addData=[addData];}else if(addDataType==="object"&&!(addData instanceof Array)){var temp=[];for(prop in addData){temp.push(prop+"="+addData[prop]);}addData=temp;}}var detail={link:elem,evt:evtProps};ncbi.sg.sendElementEvent(evtName,detail,addData);}function _pingWithData(obj,isAsync){var data=[];if(typeof isAsync==="undefined"){isAsync=true;}if(typeof obj==="object"&&!(obj instanceof Array)){for(var prop in obj){data.push(prop+"="+encodeURIComponent(obj[prop]));}}else if(typeof obj==="string"){data.push(obj);}else{data=obj;}var phid=ncbi.sg.getInstance().currentPageHitId||"";if(data.join("&").indexOf("jsevent=clicknext")!==-1){if(phid.length>0){data.push("next_phid="+encodeURIComponent(phid));}}else{if(phid.length>0){data.push("ncbi_phid="+encodeURIComponent(phid));}if(typeof ncbi.sg.loadTime!=="undefined"){data.push("ncbi_timesinceload="+(new Date()-ncbi.sg.loadTime));}}ncbi.sg.getInstance().sendAl(data.join("&"),null,isAsync);}ncbi.sg.ping=function(obj,isAsyncOrEventObj,jsEvent,additionalData){if(typeof obj==="undefined"||obj===null){return;}if(typeof obj==="object"&&obj.nodeName!==undefined){_pingWithElement(obj,isAsyncOrEventObj,jsEvent,additionalData);}else{_pingWithData(obj,isAsyncOrEventObj);}};ncbi.sg.loadTime=new Date();})();if(!Array.prototype.indexOf){Array.prototype.indexOf=function(elt){var len=this.length>>>0;var from=Number(arguments[1])||0;from=(from<0)?Math.ceil(from):Math.floor(from);if(from<0){from+=len;}for(;from<len;from++){if(from in this&&this[from]===elt){return from;}}return-1;};}
// This code creates window.console if it doesn't exist.
// It also creates stub functions for those functions that are missing in window.console.
// (Safari implements some but not all of the firebug window.console methods--this implements the rest.)
(function() {
    var names = [ "log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group",
                  "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd" ];

    if (typeof(console) === 'undefined' || typeof console === "function" ) {
      //"typeof function" is needed see PP-769 
      console = {};
    }

    for (var i = 0; i < names.length; ++i) {
       if (typeof(console[names[i]]) === 'undefined') {
          console[names[i]] = function() { return false; };
       }
    }
    ncbi.sg.getInstance().init();                          
})();
