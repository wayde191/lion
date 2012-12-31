
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
    this.awards = null;
};


});