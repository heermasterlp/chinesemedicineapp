// Begin


var text = '[{"illness":"感冒","medicines":["贯众","茵陈蒿","黄芪","野菊花","香薷","柴胡","食醋","生石膏"]},{"illness":"咳嗽","medicines":["车前草","酸橙","仙人掌","山楂根","木蝴蝶","紫菀露"]},{"illness":"慢性支气管炎","medicines":["黄荆子","青蒿油","蚤休","淫羊藿","辣椒棵","龙葵果"]},{"illness":"哮喘","medicines":["巴豆","补骨脂","椒目","醉鱼草","紫河车","灵芝","川芎嗪","慈竹沥","生姜","雷公藤"]},{"illness":"咯血","medicines":["地榆","蛇总管","人参","肺形草","阿胶"]}]';

var obj = JSON.parse(text);

var rotate = [0,90,180,270,20,30,60,10];

var objLength = obj.length;


for(var i = 0; i < objLength; i++){
    
    var content = '<p><h1>' + obj[i].illness + '</h1><br><br><span class="footnote">';
    for(var j = 0; j < obj[i].medicines.length; j++){
        if( j == obj[i].medicines.length - 1){
            content += obj[i].medicines[j] + '</span></p>';
        }else{
            content += obj[i].medicines[j] + ',';
        }
    }

    $("#impress").append("<div id='illnessdiv" + i + "'class='step slide' data-x='"+(-1000 + i * 1000)+"' data-y='0'></div>");
    
    genereateDiv(i);
    
}

/* Generate the div of illness and medicines  */
function genereateDiv(index){
    
    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $('#illnessdiv' + index),
        width: 900,
        height: 700,
        model: graph,
        gridSize: 1
    });

    var rect = new joint.shapes.basic.Rect({
        position: { x: 400, y: 335 },
        size: { width: 120, height: 60 },
        attrs: { rect: { fill: '#2C3E50', rx: 5, ry: 5, 'stroke-width': 2, stroke: '#2C3E50'}, text: { text: obj[index].illness, fill: '#FFFFFF',
        'font-size': 18, 'font-variant': 'small-caps', 'text-transform': 'capitalize' } }
    });
    
    var mediLength = obj[index].medicines.length;
    
    for (var i = 0; i < mediLength; i++){
       var mRect = new joint.shapes.basic.Rect({
            position: {x: 410 + 200 * Math.cos(i * 2 * 3.14 / mediLength), y: 335 + 200 * Math.sin(i * 2 * 3.14 / mediLength)},
            size: {width: 80, height:20},
            attrs: { rect: {  fill: '#d2eaef', rx: 5, ry: 5, 'stroke-width': 2, stroke: '#d2eaef' }, text: { text: obj[index].medicines[i], fill: '#000000',
        'font-size': 15, 'font-variant': 'small-caps', 'text-transform': 'capitalize' } }
        });
        
        var link1 = new joint.dia.Link({
            source: { id: rect.id},
            target: { id: mRect.id}
        });
        graph.addCells([rect, mRect, link1]);
    }
    
}


// At the last function!
impress().init();