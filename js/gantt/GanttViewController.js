
/*
 * Copyright (c) 2012-2020, iHakula Studio Software Inc.
 * Use, modification, and distribution subject to terms of license.
 * @version: 1.0
 * @date: 12/27/2012
 * @author: Wayde Sun
 * @email: hakula@ihakula.com
 * @website: www.ihakula.com
 */

ih.defineClass("ih.GanttViewController", null, null, function(GANTT, gantt){

    gantt.prototype.init = function(){
        this.datamodel = new ih.GanttDataModel();
        this.datamodel.delegate = this;
    };
    
    gantt.prototype.initData = function(){
        this.bindBtnsEvent();
//        this.datamodel.reloadData();
    };

    gantt.prototype.viewDidLoad = function(){
        if(!this.datamodel.sysUser.isLogin()){
            this.loadLoginFormHtml();
            return;
        }
        this.initData();
    };
    
    honey.prototype.loginSuccess = function(){
        this.loadGanttHtml();
    };
    
    gantt.prototype.loadLoginFormHtml = function(){
        var self = this;
        $('.content').load("./html/loginform.html", null, ih.$F(function(responseText, textStatus, request){
            var self = this;
            if(textStatus == "success") {
                $("#login-submit").click(ih.$F(self.datamodel.doLogin).bind(self.datamodel));
            } else {
                ih.userDefaultEngine.exceptionConsole.push(new ih.HException("HoneyViewController", "loadLoginFormHtml failed"));
            }
        }).bind(self));
    };
    
    gantt.prototype.loadGanttHtml = function(){
        var self = this;
        $('.content').load("./html/ganttcontent.html", null, ih.$F(function(responseText, textStatus, request){
            var self = this;
            if(textStatus == "success") {
                self.initData();
            } else {
                ih.userDefaultEngine.exceptionConsole.push(new ih.HException("GanttViewController", "loadGanttHtml failed"));
            }
        }).bind(self));
    };
    
    gantt.prototype.onControllerBtnClicked = ih.$F(function(selectedBtn){
        var jqEle = $(selectedBtn.currentTarget);
        var id = jqEle.attr('id');
        console.log(id);
        switch (id) {
            case 'prepage':
                this.onPrePageBtnClicked();
                break;
            case 'nextpage':
                this.onNextPageBtnClicked();
                break;
            case 'draw':
                this.onDrawBtnClicked();
                break;
            case 'new':
                this.onNewBtnClicked();
                break;
            case 'modify':
                this.onModifyBtnClicked();
                break;
            case 'delete':
                this.onDeleteBtnClicked();
                break;
            default:
                break;
        }
    });
    
    gantt.prototype.onPrePageBtnClicked = function(){};
    
    gantt.prototype.onNextPageBtnClicked = function(){};
    
    gantt.prototype.onDrawBtnClicked = function(){};
    
    gantt.prototype.onNewBtnClicked = function(){};
    
    gantt.prototype.onModifyBtnClicked = function(){};
    
    gantt.prototype.onDeleteBtnClicked = function(){};

    gantt.prototype.bindBtnsEvent = function(){
        var self = this;
        $("#prepage").click(ih.$F(self.onControllerBtnClicked).bind(self));
        $("#nextpage").click(ih.$F(self.onControllerBtnClicked).bind(self));
        $("#draw").click(ih.$F(self.onControllerBtnClicked).bind(self));
        $("#new").click(ih.$F(self.onControllerBtnClicked).bind(self));
        $("#modify").click(ih.$F(self.onControllerBtnClicked).bind(self));
        $("#delete").click(ih.$F(self.onControllerBtnClicked).bind(self));
    };

    gantt.prototype.showMsg = function(dialogMsg){
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

});