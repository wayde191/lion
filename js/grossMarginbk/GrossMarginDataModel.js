
/*
 * Copyright (c) 2012-2020, iHakula Studio Software Inc.
 * Use, modification, and distribution subject to terms of license.
 * @version: 1.0
 * @date: 12/27/2012
 * @author: Wayde Sun
 * @email: hakula@ihakula.com
 * @website: www.ihakula.com
 */

ih.defineClass("ih.GrossMarginDataModel", null, null, function(GM, gm){
               
    gm.prototype.init = function(){
        this.sources = null;
        this.salaries = null;
        this.workingHours = null;
        this.costs = null;
        this.monthWrokingDay = null;
        this.costed = [];
        this.costedPerHour = [];
    };
    
    gm.prototype.caculate = function(){
        this.costed = [];
        this.costedPerHour = [];
        var i = 0;
        for(i; i < this.sources.length; i++) {
            var cPerHour = this.salaries[i] * this.costs / (this.monthWrokingDay * 8);
            var value = cPerHour * this.workingHours[i];
            this.costed.push(value);
            this.costedPerHour.push(cPerHour);
        }
    };

});