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
        var isOk  = /(^text$)|(^background$)|(^underline$)/i.test(trim(val));
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
        // методы
        

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