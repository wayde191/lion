
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
        this.currentPageIndex = null;
        this.totalPageNum = null;
        this.selectedTaskArrayIndex = null;
        this.ganttTable = new ih.Gantt(document.all.GanttChart);
    };
    
    gantt.prototype.doLogin = function(){
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
            ih.userDefaultEngine.logConsole.push(new ih.HLog("GanttDataModel", "doLogin username or passwrd is empty"));
        }
    };
  
    gantt.prototype.reloadData = function() {
        this.currentPageIndex = 1;
        this.loadTasks();
    };
    
    gantt.prototype.loadAllTasks = function() {
        if(this.sysUser.isLogin()) {
            this.request.callService({}, ih.$F(function(response){
                if (1 == response.status) {
                    for(var i = 0; i < response.data.length; i++){
                        var task = response.data[i];
                        this.ganttTable.addTaskDetail(new this.ganttTable.task(task.beginDate, task.endDate, task.text, task.principal, task.schedule));
                    }
                    this.ganttTable.draw();
                } else {
                    this.delegate.showMsg({title:'温馨提示', text:'获取项目任务列表失败'});
                }
            }).bind(this), ih.rootUrl + "/gantt/getAllTasks", "POST");
        } else {
            ih.userDefaultEngine.logConsole.push(new ih.HLog("GanttDataModel", "User not logged in, but request data"));
        }
    };
    
    gantt.prototype.loadTasks = function() {
        if(this.sysUser.isLogin()) {
            this.request.callService({rowsPerPage:$("#numperpage")[0].value, pageIndex:this.currentPageIndex}, ih.$F(function(response){
                if (1 == response.status) {
                   this.tasks = ih.$A(response.data);
                   this.totalPageNum = response.totalPage;
                   $("#totalPageNumber").text(this.totalPageNum);
                    $('[rel*="data{menuitem}"]').setData({
                      menuitem : response.data
                    }, this.delegate.onTaskClicked.bind(this.delegate));
                } else {
                    this.delegate.showMsg({title:'温馨提示', text:'失败'});
                }
            }).bind(this), ih.rootUrl + "/gantt/gettasks", "POST");
        } else {
            ih.userDefaultEngine.logConsole.push(new ih.HLog("GanttDataModel", "User not logged in, but request data"));
        }
    };
    
    gantt.prototype.loadPrePageTasks = function() {
        if(this.currentPageIndex - 1 < 1){
            this.delegate.showMsg({title:'温馨提示', text:'已经是第一页了'});
            return;
        }
        if(this.sysUser.isLogin()) {
            this.request.callService({rowsPerPage:$("#numperpage")[0].value, pageIndex:this.currentPageIndex - 1}, ih.$F(function(response){
                if (1 == response.status) {
                   this.tasks = ih.$A(response.data);
                   this.totalPageNum = response.totalPage;
                   this.currentPageIndex--;
                   this.delegate.recoverContent();
                   $("#totalPageNumber").text(this.totalPageNum);
                   $("#currentPageIndex").text(this.currentPageIndex);
                    $('[rel*="data{menuitem}"]').setData({
                      menuitem : response.data
                    }, this.delegate.onTaskClicked.bind(this.delegate));
                } else {
                    this.delegate.showMsg({title:'温馨提示', text:'失败'});
                }
            }).bind(this), ih.rootUrl + "/gantt/gettasks", "POST");
        } else {
            ih.userDefaultEngine.logConsole.push(new ih.HLog("GanttDataModel", "User not logged in, but request data"));
        }
    };
    
    gantt.prototype.loadNextPageTasks = function() {
        if(this.currentPageIndex + 1 > this.totalPageNum){
            this.delegate.showMsg({title:'温馨提示', text:'已经是最后一页了'});
            return;
        }
        if(this.sysUser.isLogin()) {
            this.request.callService({rowsPerPage:$("#numperpage")[0].value, pageIndex:this.currentPageIndex + 1}, ih.$F(function(response){
                if (1 == response.status) {
                   this.tasks = ih.$A(response.data);
                   this.totalPageNum = response.totalPage;
                   this.currentPageIndex++;
                   this.delegate.recoverContent();
                   $("#totalPageNumber").text(this.totalPageNum);
                   $("#currentPageIndex").text(this.currentPageIndex);
                    $('[rel*="data{menuitem}"]').setData({
                      menuitem : response.data
                    }, this.delegate.onTaskClicked.bind(this.delegate));
                } else {
                    this.delegate.showMsg({title:'温馨提示', text:'失败'});
                }
            }).bind(this), ih.rootUrl + "/gantt/gettasks", "POST");
        } else {
            ih.userDefaultEngine.logConsole.push(new ih.HLog("GanttDataModel", "User not logged in, but request data"));
        }
    };
    
  gantt.prototype.insert = function() {
    var parametersObj = {name:$('input[name="task"]').val(), beginDate:$('input[name="begindate"]').val(), endDate:$('input[name="enddate"]').val(), principal:$('input[name="principle"]').val(), schedule:$('input[name="progress"]').val()};
    
    if(this.sysUser.isLogin()) {
        this.request.callService(parametersObj, ih.$F(function(response){
                if (1 == response.status) {
                   this.delegate.showMsg({title:'温馨提示', text:'新增成功'});
                   this.delegate.recoverContent();
                   this.reloadData();
                } else {
                    this.delegate.showMsg({title:'温馨提示', text:'新增失败'});
                }
            }).bind(this), ih.rootUrl + "/gantt/insert", "POST");
    } else {
        ih.userDefaultEngine.logConsole.push(new ih.HLog("GanttDataModel", "User not logged in, but request data"));
    }
  };
  
  gantt.prototype.update = function() {
    var task = this.tasks[this.selectedTaskArrayIndex];
    var parametersObj = {id:task.id,name:$('input[name="task"]').val(), beginDate:$('input[name="begindate"]').val(), endDate:$('input[name="enddate"]').val(), principal:$('input[name="principle"]').val(), schedule:$('input[name="progress"]').val()};
    
    if(this.sysUser.isLogin()) {
        this.request.callService(parametersObj, ih.$F(function(response){
                if (1 == response.status) {
                   this.delegate.showMsg({title:'温馨提示', text:'更新成功'});
                   this.delegate.recoverContent();
                   this.reloadData();
                } else {
                    this.delegate.showMsg({title:'温馨提示', text:'更新失败'});
                }
            }).bind(this), ih.rootUrl + "/gantt/update", "POST");
    } else {
        ih.userDefaultEngine.logConsole.push(new ih.HLog("GanttDataModel", "User not logged in, but request data"));
    }
  };
  
  gantt.prototype.delete = function() {
    var task = this.tasks[this.selectedTaskArrayIndex];
    var parametersObj = {id:task.id};
    
    if(this.sysUser.isLogin()) {
        this.request.callService(parametersObj, ih.$F(function(response){
                if (1 == response.status) {
                   this.delegate.showMsg({title:'温馨提示', text:'删除成功'});
                   this.delegate.recoverContent();
                   this.reloadData();
                } else {
                    this.delegate.showMsg({title:'温馨提示', text:'删除失败'});
                }
            }).bind(this), ih.rootUrl + "/gantt/delete", "POST");
    } else {
        ih.userDefaultEngine.logConsole.push(new ih.HLog("GanttDataModel", "User not logged in, but request data"));
    }
  };


});