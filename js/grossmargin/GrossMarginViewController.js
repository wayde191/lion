
/*
 * Copyright (c) 2012-2020, iHakula Studio Software Inc.
 * Use, modification, and distribution subject to terms of license.
 * @version: 1.0
 * @date: 12/27/2012
 * @author: Wayde Sun
 * @email: hakula@ihakula.com
 * @website: www.ihakula.com
 */

ih.defineClass("ih.GrossMarginViewController", null, null, function(GM, gm){

    gm.prototype.init = function(){
        this.datamodel = new ih.GrossMarginDataModel();
        this.datamodel.delegate = this;
    };
    
    gm.prototype.viewDidLoad = function(){
        var self = this;
        $("#analytics").click(ih.$F(self.onControllerBtnClicked).bind(self));
    };
    
    gm.prototype.onControllerBtnClicked = ih.$F(function(selectedBtn){
        this.datamodel.sources = $('input[name="name"]').val().split(',');
        this.datamodel.salaries = $('input[name="salary"]').val().split(',');
        this.datamodel.workingHours = $('input[name="working_hours"]').val().split(',');
        this.datamodel.costs = $('input[name="invisiable_cost_rate"]').val();
        this.datamodel.monthWrokingDay = $('input[name="month_day"]').val();
        
        this.datamodel.caculate();
        this.draw();
        
    });
    
    gm.prototype.draw = function(){
        var html = "<table border=2 style='border-collapse:collapse;width:800px;'>";
        var i = 0;
        for(i; i < this.datamodel.sources.length; i++){
            var htmlRow = '<tr>';
            htmlRow += '<td>' + this.datamodel.sources[i] + '</td>';
            htmlRow += '<td>' + this.datamodel.costedPerHour[i] + '</td>';
            htmlRow += '<td>' + this.datamodel.workingHours[i] + '</td>';
            htmlRow += '<td>' + this.datamodel.costed[i] + '</td>';
            htmlRow += '</tr>';
            html += htmlRow;
        }
        html += "</table>";
        $('#chart').html(html);
    };


    gm.prototype.showMsg = function(dialogMsg){
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