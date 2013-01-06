
/*
 * Copyright (c) 2012-2020, iHakula Studio Software Inc.
 * Use, modification, and distribution subject to terms of license.
 * @version: 1.0
 * @date: 12/27/2012
 * @author: Wayde Sun
 * @email: hakula@ihakula.com
 * @website: www.ihakula.com
 */

ih.defineClass("ih.GanttDataModel", null, null, function(GANTT, gantt){
               
    gantt.prototype.init = function(){
        this.request = new ih.Service();
        this.sysUser = new ih.User();
        this.delegate = null;
        this.tasks = null;
    };
    
    gantt.prototype.doLogin = function(){
        var username = $("#user_login")[0].value;
        var password = $("#user_pass")[0].value;
        username = "hh";
        password = "hh";
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
            ih.userDefaultEngine.logConsole.push(new ih.HLog("GanttDataModel", "doLogin username or passwrd is empty"));
        }
    };
  
    gantt.prototype.reloadData = function() {
        this.loadTasks();
    };
    
    gantt.prototype.loadTasks = function() {
    if(this.sysUser.isLogin()) {
        this.request.callService({}, ih.$F(function(response){
                if (1 == response.status) {
                   this.tasks = response.data;
                    $('[rel*="data{menuitem}"]').setData({
                      menuitem : response.data
                    });
                } else {
                    
                }
            }).bind(this), ih.rootUrl + "/gantt/gettasks", "POST");
    } else {
        ih.userDefaultEngine.logConsole.push(new ih.HLog("HoneyDataModel", "User not logged in, but request data"));
    }
  };


});