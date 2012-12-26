
/*
 * Copyright (c) 2012-2020, iHakula Studio Software Inc.
 * Use, modification, and distribution subject to terms of license.
 * @version: 1.0
 * @date: 4/4/2012
 * @author: Wayde Sun
 * @email: hakula@ihakula.com
 * @website: www.ihakula.com
 */

ih.defineClass("ih.IndexViewController", null, null, function(INDEX, index){
  
  index.prototype.init = function(){
    this.dataModel = new ih.IndexDataModel();
  };
  
  index.prototype.viewDidLoad = function(){
    console.log("index view did load");
    window.location.href = "./honey.html";
               
//    var data = [{
//      "order": 1,
//      "text": "中国",
//      "href": "/#"
//  }, {
//      "order": 2,
//      "text": "这就是这样",
//      "link": "/#"
//  }, {
//      "order": 3,
//      "text": "好",
//      "url": "/#"
//  }];
//    
//    $('[rel*="data{menuitem}"]').setData({
//      menuitem : data
//    });
    
//    $('.content').load("./test.html", null, function(responseText, textStatus, request){
//      
//    });

//    var data = {id:"test", width:"200px", height:"200px", bgColor:"#000", title:"title", content:"content", bgLogo:"css/images/email.png", link:"#", shapeType:"square"};
//    var cate = new ih.Category(data);
//    var ele = cate.draw();
//    var sss = $(".motto").append(ele);
  
  return;
  };
  
});