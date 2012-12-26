
/*
 * Copyright (c) 2012-2020, iHakula Studio Software Inc.
 * Use, modification, and distribution subject to terms of license.
 * @version: 1.0
 * @date: 4/4/2012
 * @author: Wayde Sun
 * @email: hakula@ihakula.com
 * @website: www.ihakula.com
 */
 
 /*
  * errorCode: 
  * -1: not login
  * -2: user name or password wrong
  */

(function(ih){
  
  ih.getBrowserInfo = function(){
    var ua = navigator.userAgent.toLowerCase();
    var regExpStr;
    
    var check = function(regex){
      return regex.test(ua);
    };
    
    var regExpStr = "[\\/|\\s]*([\\d+?]+)";
    var regExp;
    
    //IE
    if(check(/msie/) && !check(/opera/)){
        type = 'IE';
        regExp = new RegExp("msie" + regExpStr);
    }
    //firefox
    else if((!check(/webkit/) && check(/gecko/) && check(/firefox/)) && !check(/opera/)){
        type = 'Firefox';
        regExp = new RegExp("firefox" + regExpStr);
    }
    //chrome
    else if(check(/\bchrome\b/)){
        type = 'Chrome';
        regExp = new RegExp("chrome" + regExpStr);
    }
    else if(/*!check(/\bchrome\b/) && */check(/applewebkit/) && check(/safari/)){
        type = 'Safari';
        regExp = new RegExp("version" + regExpStr);
    }else if(check(/opera/)){
        type = 'Opera';
        regExp = new RegExp("version" + regExpStr);
    }
    v = regExp.exec(ua);
    
    return {
      type: type,
      versionNum: parseInt((v[1] ? v[1] : v))
    };
    
  };
  
  ih.checAvaliable = function(){
    var avaliableBrowsers = new ih.$O({
      IE: 9,
      Firefox: 12,
      Chrome: 18,
      Safari: 5,
      Opera: 11
    });
    
    var currBrowser = ih.getBrowserInfo();
    if(avaliableBrowsers[currBrowser['type']] && currBrowser['versionNum'] >= avaliableBrowsers[currBrowser['type']]){
      console.log("support well");
    } else {
      window.location.href = "./test.html";
    }
    
  };
  
  ih.checAvaliable();
  
  var path = window.location.href.match(/\/([a-zA-Z0-9]*)\.html/);
  var dispatchPath = path ? path[1] : "index";
  var engine = new ih.Engine();
  engine.installMessageConsoles();
  
  ih.viewDidLoad = function(){
    var controllerName = dispatchPath[0].toLocaleUpperCase() + dispatchPath.substr(1, dispatchPath.length) + "ViewController";
    var controller = eval("new ih." + controllerName + "()");
    controller.viewDidLoad();
  };
  
  engine.pubsub.subscribe("packageDidLoad", ih, ih.viewDidLoad);
  
  ih.loadPage = function(){
    engine.loadPackageWithXML("./js/" + dispatchPath + "/conf.xml");
  };
  
  ih.userDefaultEngine = engine;
  ih.rootUrl = "http://www.ihakula.com/api/index.php";
  
  ih.loadPage();
})(window.ih = window.ih || {});