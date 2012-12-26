
/*
 * Copyright (c) 2012-2020, iHakula Studio Software Inc.
 * Use, modification, and distribution subject to terms of license.
 * @version: 1.0
 * @date: 17/7/2012
 * @author: Wayde Sun
 * @email: hakula@ihakula.com
 * @website: www.ihakula.com
 */

ih.defineClass("ih.HoneyDataModel", null, null, function(HONEY, honey){
  
  honey.prototype.init = function(){
    this.request = new ih.Service();
    this.sysUser = new ih.User();
    this.delegate = null;
    this.awards = null;
  };
  
  honey.prototype.doLogin = function(){
    var username = $("#user_login")[0].value;
    var password = $("#user_pass")[0].value;
    if(username && password) {
        this.request.callService({username:username, password:password}, ih.$F(function(response){
                console.log(response);
                if (1 == response.status) {
                    this.sysUser.setUserInfo(response);
                    this.delegate.loginSuccess();
                } else {
                    
                }
            }).bind(this), ih.rootUrl + "/user/login", "POST");
    } else {
        ih.userDefaultEngine.logConsole.push(new ih.HLog("HoneyDataModel", "doLogin username or passwrd is empty"));
    }
  };
  
  honey.prototype.loadAwards = function() {
    if(this.sysUser.isLogin()) {
        this.request.callService({uid:this.sysUser.id, sex:this.sysUser.sex}, ih.$F(function(response){
                if (1 == response.status) {
                   this.awards = response.data;
                    $('[rel*="data{menuitem}"]').setData({
                      menuitem : response.data
                    });
                } else {
                    
                }
            }).bind(this), ih.rootUrl + "/suggestions/awards", "POST");
    } else {
        ih.userDefaultEngine.logConsole.push(new ih.HLog("HoneyDataModel", "User not logged in, but request data"));
    }
  };
  
  honey.prototype.loadSuggestions = function() {
    if(this.sysUser.isLogin()) {
        this.request.callService({uid:this.sysUser.id, sex:this.sysUser.sex}, ih.$F(function(response){
                if (1 == response.status) {
                   this.awards = response.data;
                   if (response.data.length > 0) {
                    $('[rel*="data{menuitem}"]').setData({
                      menuitem : response.data
                    }, this.delegate.onSuggestionClicked.bind(this.delegate));
                   }
                } else {
                    
                }
            }).bind(this), ih.rootUrl + "/suggestions/suggestion", "POST");
    } else {
        ih.userDefaultEngine.logConsole.push(new ih.HLog("HoneyDataModel", "User not logged in, but request data"));
    }
  };
  
  honey.prototype.loadAdvices = function(){
    if(this.sysUser.isLogin()) {
        this.request.callService({uid:this.sysUser.id, sex:this.sysUser.sex}, ih.$F(function(response){
                if (1 == response.status) {
                   if (response.data.length > 0) {
                    $('[rel*="data{menuitem}"]').setData({
                      menuitem : response.data
                    }, this.delegate.onAdviceClicked.bind(this.delegate));
                   }
                } else {
                    
                }
            }).bind(this), ih.rootUrl + "/suggestions/advice", "POST");
    } else {
        ih.userDefaultEngine.logConsole.push(new ih.HLog("HoneyDataModel", "User not logged in, but request data"));
    }
  };
  
  honey.prototype.loadGoodjob = function(){
    if(this.sysUser.isLogin()) {
        this.request.callService({uid:this.sysUser.id, sex:this.sysUser.sex}, ih.$F(function(response){
                if (1 == response.status) {
                   if (response.data.length > 0) {
                    $('[rel*="data{menuitem}"]').setData({
                      menuitem : response.data
                    });
                   }
                } else {
                    
                }
            }).bind(this), ih.rootUrl + "/suggestions/goodjob", "POST");
    } else {
        ih.userDefaultEngine.logConsole.push(new ih.HLog("HoneyDataModel", "User not logged in, but request data"));
    }
  };
  
  honey.prototype.newSuggestion = function(paraObj) {
    var parametersObj = paraObj;
    parametersObj.uid = this.sysUser.id;
    parametersObj.sex = this.sysUser.sex;
    
    if(this.sysUser.isLogin()) {
        this.request.callService(parametersObj, ih.$F(function(response){
                if (1 == response.status) {
                   this.showMsg({title:'温馨提示', text:'提交成功'});
                } else {
                    this.showMsg({title:'温馨提示', text:'提交失败'});
                }
            }).bind(this), ih.rootUrl + "/suggestions/newsuggestion", "POST");
    } else {
        ih.userDefaultEngine.logConsole.push(new ih.HLog("HoneyDataModel", "User not logged in, but request data"));
    }
  };
  
  honey.prototype.doImprove = function(paraObj) {
    var parametersObj = paraObj;
    parametersObj.uid = this.sysUser.id;
    parametersObj.sex = this.sysUser.sex;
    
    if(this.sysUser.isLogin()) {
        this.request.callService(parametersObj, ih.$F(function(response){
                if (1 == response.status) {
                   this.delegate.recoverContent();
                   this.loadSuggestions();
                } else {
                    this.showMsg({title:'温馨提示', text:'提交失败'});
                }
            }).bind(this), ih.rootUrl + "/suggestions/ihavedone", "POST");
    } else {
        ih.userDefaultEngine.logConsole.push(new ih.HLog("HoneyDataModel", "User not logged in, but request data"));
    }
  };
  
  honey.prototype.sureImprove = function(paraObj) {
    var parametersObj = paraObj;
    parametersObj.uid = this.sysUser.id;
    parametersObj.sex = this.sysUser.sex;
    
    if(this.sysUser.isLogin()) {
        this.request.callService(parametersObj, ih.$F(function(response){
                if (1 == response.status) {
                   this.delegate.recoverContent();
                   this.loadAdvices();
                } else {
                    this.showMsg({title:'温馨提示', text:'提交失败'});
                }
            }).bind(this), ih.rootUrl + "/suggestions/suredone", "POST");
    } else {
        ih.userDefaultEngine.logConsole.push(new ih.HLog("HoneyDataModel", "User not logged in, but request data"));
    }
  };
  
  honey.prototype.showMsg = function(dialogMsg){
      // Dialog
        $('#dialog').dialog({
            autoOpen: false,
            width: 600,
            title: dialogMsg.title,
            buttons: {
                "确定": function() {
                    $(this).dialog("close");
                }
            }
        });

        // Dialog Link
        $('#dialog').html(dialogMsg.text).dialog('open');
    };
  
  honey.prototype.reloadData = function() {
    this.loadAwards();
  };
  
  
});