
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

    gantt.prototype.viewDidLoad = function(){
        this.bindBtnsEvent();
    };
    
    gantt.prototype.onControllerBtnClicked = ih.$F(function(selectedBtn){
        var jqEle = $(selectedBtn.currentTarget);
        var id = jqEle.attr('id');
        console.log(id);
        switch (id) {
            case 'awards':
                break;
            default:
                break;
        }
    });

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