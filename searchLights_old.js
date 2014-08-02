alert(1);

/**
* Подсветка текста
* 
* @param mixed inpSearch (строка, которую ищем)
* @param mixed title (текст который будем подсвечивать)
*/
function searchLight(inpSearch,text){
var inpSearch_clear = inpSearch.replace(/\.|\#|\`|\~|\!|\@|\$|\%|\^|\&|\*|\'|\"|\,|\<|\>|\||\;|\?|\/|\\|\)|\(/g, ' ');
inpSearch_clear = inpSearch_clear.replace(/^\s+|\s+$/g, '');
inpSearch_clear = inpSearch_clear.replace(/\s+/g, ' ');
//получаем массив слов, разделенных пробелами
var inpSearch_arr = inpSearch_clear.split(' ');  
//сортируем массив
for (var v=0;v<inpSearch_arr.length;v++){
    var inpSearch_arr_current = inpSearch_arr[v];
    for (var h=0;h<inpSearch_arr.length;h++){
        var inpSearch_arr_reg = new RegExp(inpSearch_arr[h]);
        var inpSearch_arr_match =inpSearch_arr_current.match(inpSearch_arr_reg);
        if (inpSearch_arr_current !== inpSearch_arr[h] && inpSearch_arr_match !== null){
            var inp_temp = inpSearch_arr[h];
            inpSearch_arr[h] = inpSearch_arr_current;
            inpSearch_arr[v] = inp_temp;
        }
    }
}
//переделываем слово в регулярку
var inpSearch_arr_count = inpSearch_arr.length;
if (inpSearch_arr[0]){
    var reg_inpSearch_mass= Array;
    for (var j=0;j<inpSearch_arr_count;j++){
        var inpSearch_sp = inpSearch_arr[j];
        var reg_inpSearch = '';
        var inpSearch_sp_count = inpSearch_sp.length;
        var inpSearch_sp_ch =inpSearch_sp.match(/[0-9]/);
        if (inpSearch_sp.length <3 || inpSearch_sp_ch){
            reg_inpSearch = inpSearch_sp;
        }
        else{
            for(var p=0;p<inpSearch_sp_count;p++){
                reg_inpSearch += inpSearch_sp.charAt(p)+'( )*';
            }
        }
        var reg_find = new RegExp(reg_inpSearch,"ig");
        reg_inpSearch_mass[j] = reg_find;
        //очищаем title от тегов
        var title_clear = text.replace(/\<span style=\"color:\#FD990D\"\>|<\/span\>/g, '');

        //тащим строку совпавшую с регуляркой
        var inpSearch_find = title_clear.match(reg_inpSearch_mass[j]);
        if (inpSearch_find != null){
            //закрашиваем найденный текст
            var inpSearch_find_count = inpSearch_find.length;
            for (var t=0;t<inpSearch_find_count;t++){
                if (inpSearch_find[t] !== inpSearch_find[t-1]){
                    var inpSearch_light = '<!'+inpSearch_find[t]+'!>';
                    //заменяем в найденной
                    text = text.replace(reg_inpSearch_mass[j], inpSearch_light); 
                }
            }
        }
    }
}

//убираем повторные метки
text = text.replace(/(\<!)+/g, '<!');
text = text.replace(/(!\>)+/g, '!>');

//добавляем тэги
text = text.replace(/<!/g, '<span style="color:#FD990D">');
text = text.replace(/!>/g, '</span>'); 

return text;
}