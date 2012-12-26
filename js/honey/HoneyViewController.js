
/*
 * Copyright (c) 2012-2020, iHakula Studio Software Inc.
 * Use, modification, and distribution subject to terms of license.
 * @version: 1.0
 * @date: 4/4/2012
 * @author: Wayde Sun
 * @email: hakula@ihakula.com
 * @website: www.ihakula.com
 */

ih.defineClass("ih.HoneyViewController", null, null, function(HONEY, honey){
               
    honey.prototype.init = function(){
        this.datamodel = new ih.HoneyDataModel();
        this.datamodel.delegate = this;      
    };
    
    honey.prototype.initData = function(){
      this.bindBtnsEvent();
      this.datamodel.reloadData();
    };
               
    honey.prototype.viewDidLoad = function(){
        if(!this.datamodel.sysUser.isLogin()){
            this.loadLoginFormHtml();
            return;
        }
        
        this.initData();
    };
    
    honey.prototype.loadLoginFormHtml = function(){
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
    
    honey.prototype.onSuggestionClicked = ih.$F(function(selectedEle){
        var self = this;
        var jqEle = $(selectedEle.currentTarget);
        var id = jqEle.attr('id');
        var status = jqEle.attr('class');
        
        if('suggestted' == status) {
          // Dialog
          $('#dialog').dialog({
              autoOpen: false,
              width: 600,
              title: "越来越好",
              buttons: {
                  "确定": function() {
                      self.datamodel.doImprove({suggestionId:id});
                      $(this).dialog("close");
                  },
                  "取消": function() {
                      $(this).dialog("close");
                  }
              }
          });
  
          // Dialog Link
          $('#dialog').html('我不是：' + jqEle.text()).dialog('open');
        }
    });
    
    honey.prototype.onAdviceClicked = ih.$F(function(selectedEle){
        var self = this;
        var jqEle = $(selectedEle.currentTarget);
        var id = jqEle.attr('id');
        var status = jqEle.attr('class');
        
        if('improving' == status) {
          // Dialog
          $('#dialog').dialog({
              autoOpen: false,
              width: 600,
              title: "越来越好",
              buttons: {
                  "确定": function() {
                      self.datamodel.sureImprove({suggestionId:id});
                      $(this).dialog("close");
                  },
                  "取消": function() {
                      $(this).dialog("close");
                  }
              }
          });
  
          // Dialog Link
          $('#dialog').html('Honey不是：' + jqEle.text()).dialog('open');
        }
    });
    
    honey.prototype.recoverContent = function() {
       $('.honey').html('<li rel="data{menuitem}"><a rel="data{menuitem.text;menuitem.link@href;menuitem.id@id;menuitem.class@class}" class="" href="javascript:void(0)"></a></li>');
    };
    
    honey.prototype.fillSuggestionHtml = function() {
      $('.honey').html('<div>' +
          'Awards:<input id="c-awards" type="checkbox" checked="Yes" /> ' +
          'Suggestion:<input id="c-suggestion" type="checkbox" />'+
          '<div>'+
            '<textarea id="ta-content" row="60" cols="70" style="height:300px;"></textarea>'+
            '<div><a id="b-submit" class="button-fillet2" tabindex="10">越来越好</a></div> '+
          '</div> '+
        '</div>');
        
        var self = this;
        $("#c-awards").click(ih.$F(self.onControllerBtnClicked).bind(self));
        $("#c-suggestion").click(ih.$F(self.onControllerBtnClicked).bind(self));
        $("#b-submit").click(ih.$F(self.onControllerBtnClicked).bind(self));
        
    };
    
    honey.prototype.checkOnlyOne = function(selecedObjId) {
      if(selecedObjId == 'c-suggestion') {
        var cSugg = $('#c-suggestion');
        if(cSugg.attr('checked') == "checked") {
          $('#c-awards').removeAttr('checked');
        } else {
          $('#c-awards').attr('checked', 'true');
        }
      } else {
        var cAward = $('#c-awards');
        if(cAward.attr('checked') == "checked") {
          $('#c-suggestion').removeAttr('checked');
        } else {
          $('#c-suggestion').attr('checked', 'true');
        }
      }
    };
    
    honey.prototype.onSubmitBtnClicked = function(){
      var newSuggestionObj = {};
      var cSugg = $('#c-suggestion');
        if(cSugg.attr('checked') == "checked") {
          newSuggestionObj.suggestionType = 2;
        } else {
          newSuggestionObj.suggestionType = 1;
        }
        
        newSuggestionObj.text = $('#ta-content').attr('value');
        if(newSuggestionObj.text == ''){
          this.showMsg({title:'温馨提示', text:'请输入宝贵意见'});
        }
        this.datamodel.newSuggestion(newSuggestionObj);
        
    };
    
    honey.prototype.onControllerBtnClicked = ih.$F(function(selectedBtn){
        var jqEle = $(selectedBtn.currentTarget);
        var id = jqEle.attr('id');
        switch (id) {
            case 'awards':
                this.recoverContent();
                this.datamodel.loadAwards();
                break;
            case 'suggestion':
                this.recoverContent();
                this.datamodel.loadSuggestions();
                break;
            case 'improve':
               this.fillSuggestionHtml();
                break;
            case 'advice':
                this.recoverContent();
                this.datamodel.loadAdvices();
                break;
            case 'goodjob':
                this.recoverContent();
                this.datamodel.loadGoodjob();
                break;
            case 'c-awards':
               this.checkOnlyOne('c-awards');
                break;
            case 'c-suggestion':
               this.checkOnlyOne('c-suggestion');
                break;
            case 'b-submit':
               this.onSubmitBtnClicked();
                break;
            default:
                break;
                
        }
    });
    
    honey.prototype.bindBtnsEvent = function(){
        var self = this;
        $("#awards").click(ih.$F(self.onControllerBtnClicked).bind(self));
        $("#suggestion").click(ih.$F(self.onControllerBtnClicked).bind(self));
        $("#improve").click(ih.$F(self.onControllerBtnClicked).bind(self));
        $("#advice").click(ih.$F(self.onControllerBtnClicked).bind(self));
        $("#goodjob").click(ih.$F(self.onControllerBtnClicked).bind(self));
    };
    
    honey.prototype.loadHoneyWordsHtml = function(){
        var self = this;
        $('.content').load("./html/honeywords.html", null, ih.$F(function(responseText, textStatus, request){
            var self = this;
            if(textStatus == "success") {
                self.initData();
            } else {
                ih.userDefaultEngine.exceptionConsole.push(new ih.HException("HoneyViewController", "loadLoginFormHtml failed"));
            }
        }).bind(self));
    };
    
    honey.prototype.loginSuccess = function(){
        this.loadHoneyWordsHtml();
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
    
    
    
});