/**
 * @license sanpol333
 * (c) Inc. https://github.com/sanpol333
 * License: MIT
 */
var searchLights = (function(window, document) {'use strict';
    var app = {};
    var defaulParamValues = {
        color: "#00CE08",
        selectType: "text"
    }
    // #######################
    // #### FUNCTION LIBS ####
    // #######################
     
    // TRIM LEFT AND RIGHT SPACES
    var trim = (function() {
      if (!String.prototype.trim) {
        return function(value) {
          return (typeof value === 'string') ? value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : value;
        };
      }
      return function(value) {
        return (typeof value === 'string') ? value.trim() : value;
      };
    })();

    // CLEAR INPUT TEXT
    var clearInputText = (function() {
      return function(text) {
        var text_clear = text.replace(/\.|\#|\`|\~|\!|\@|\$|\%|\^|\&|\*|\'|\"|\,|\<|\>|\||\;|\?|\/|\\|\)|\(/g, ' ');
        text_clear = text_clear.replace(/^\s+|\s+$/g, '');
        text_clear = text_clear.replace(/\s+/g, ' ');
        return text_clear;
      };
    })();


    // #######################
    // ###### VALIDATES ######
    // #######################
    
    // Validate interface
    function validateFuncList(){
        return {
            selectType: validateSelectType,
            color: validateColor
        }
    }

    // return type of select
    function validateSelectType(val){
        var isOk  = /(^color$)|(^background$)/i.test(trim(val));
        return isOk ? trim(val) : defaulParamValues.selectType;
    }
    // return color
    function validateColor(val){
        var isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(trim(val));
        return isOk ? trim(val) : defaulParamValues.color;
    }

    // validate params and return validated attributes array
    function validateParams(params , validateFuncList, callback){
        var paramsArr = [];
        if( Object.prototype.toString.call(params) !== '[object Object]' ){
            return true;
        }

        for (var name in params){
            if (params.hasOwnProperty(name) && validateFuncList[name]){
                paramsArr.push(name);
            }
        }
 
        callback(null,paramsArr);
    }

    // #######################
    // ######### APP #########
    // #######################

    // Constructor
    function App(args , whiteListNameParams){
        // write main params
        for (var argName in validateFuncList()){
            if (validateFuncList().hasOwnProperty(argName)){
                // for manual options
                if(whiteListNameParams.indexOf(argName) >= 0){
                    var argVal = args[argName];
                    this[argName] = validateFuncList()[argName](argVal);
                }
                // for auto options
                else{
                    this[argName] = validateFuncList()[argName]();
                }
            }
        }
        // methods
        this.useLight = function(search , text){
            if (search.length < 1) return text;
            // clear input data
            search = clearInputText(search);
            // search array split ' '
            var search = search.split(' '); 
            // sorting (long words first)
            var search_sorted = search.sort(
                function(a, b){
                    a = a.toString();
                    b = b.toString();
                    return b.length-a.length;
                }
            );
            // foreach words
            search_sorted.forEach(function(entry , counter, arr){
                // get regexp
                var reg_inpSearch = '';
                var inpSearch_sp_count = search_sorted[counter].length;
                var inpSearch_sp_ch = search_sorted[counter].match(/[0-9]/);
                if (search_sorted[counter].length <3 || inpSearch_sp_ch){
                    reg_inpSearch = search_sorted[counter];
                }
                else{
                    for(var p=0;p<inpSearch_sp_count;p++){
                        reg_inpSearch += search_sorted[counter].charAt(p)+'( )*';
                    }
                }
                var reg_find = new RegExp(reg_inpSearch,"ig");
                var title_clear = text.replace(/\<span style=\"'+this.selectType+':\'+this.color+'\"\>|<\/span\>/g, '');
                // get compared text
                var inpSearch_find = title_clear.match(reg_find);
                if (inpSearch_find != null){
                    // save no dublicate results
                    var noDuplicateArr = [];
                    inpSearch_find.forEach(function(entry){
                        noDuplicateArr.indexOf(entry) < 0 && noDuplicateArr.push(entry);
                    });
                    // highlight foreach matches
                    noDuplicateArr.forEach(function(entry){
                        var regE = new RegExp("(?![^<]*>)"+entry,"g");
                        var inpSearch_light = '<!'+entry+'!>';
                        text = text.replace(regE, inpSearch_light); 
                    });
                }
            });

            // add tags
            text = text.replace(/<!/g, '<span style="'+this.selectType+':'+this.color+'">');
            text = text.replace(/!>/g, '</span>'); 
        
            // script tag protection
            text = text.replace(/<script([a-z0-9\-\'\"\=\/\s]*)\>.*?\<\/script\>/g, '');

            return text;
        }

        return this;
    }

    return {
        // initialize with parameters 
        init : function(args) {
            // validate arg names
            var whiteListNameParams = [];
            validateParams(args , validateFuncList(), function(err , data){
                if (err) console.log(err);
                if (data) whiteListNameParams = data;
            });
            // intit obj
            if (whiteListNameParams.length > 0){
                app = new App(args , whiteListNameParams);
                return app;
            }
            else{
                return true;
            }
        }
    };

}(window, document));