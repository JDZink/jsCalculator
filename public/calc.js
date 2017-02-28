var operIndex = 0;
var oper = ""
var num1 = 0


var main = function(){
  var calcTable = buildCalc();
  $('body').hide()
  $('body').append(calcTable);
  loadFunctions();
  beautify();
  $('body').show()




}

var assignListenersByClass = function(evnt, func, cls){
  var element = document.getElementsByClassName(cls);
  for (var i = 0; i < element.length; i++) {
    element[i].addEventListener(evnt, func);
  }
}

var assignListenersById = function(evnt, func, cls){
  var element = document.getElementById(cls);
      element.addEventListener(evnt, func);

}


var loadFunctions = function(){
  // var x = $('td[name="8"]');
  // x.click(function(){this.text("Banana")});
  var addToDisplay = function(){
    eq = $('#equation')
    if (!eq.text()){
      eq.text($(this).text());
    } else {
      eq.text(eq.text() + $(this).text())
    }
  }

  assignListenersByClass('click', addToDisplay, "number");
  assignListenersById('click', addToDisplay, "decimal");
  assignListenersById('click', function(){$('#equation').text("")}, "clear");
    assignListenersByClass('click', function(){
      eq = $('#equation')
      if (!eq.text()){
        oper = $(this).text();
        operIndex = 1;
        num1 = 0;
        eq.text(num1 + oper);
      } else if (isNaN(eq.text())){
        oper = $(this).text();
        eq.text(num1 + oper);
        operIndex = eq.text().indexOf(oper)
      } else {
        oper = $(this).text();
        num1 = Number(eq.text());
        eq.text(num1 + oper);
        operIndex = eq.text().indexOf(oper)
      }
    }, "operator");

    assignListenersById('click', function(){
      eq = $('#equation')
      var n2 = Number(eq.text().substring(operIndex+1));
      if (!eq.text()){
        eq.text("0");
      } else if (!isNaN(num1+n2)){
        eq.text(doMath(num1, oper, n2))
      }
    }, "sum");


}

var doMath = function(n1, o, n2){
  switch (o) {
    case "+":
      return Number(n1+n2);
      break;
    case "-":
      return Number(n1-n2);
      break;
    case "*":
      return Number(n1*n2);
      break;
    case "/":
      return Number(n1/n2);
      break;
    default:
  }
}

var buildCalc = function(){
  var table = $('<table>');
  table.attr({name:"calculator", id: "calc"})
  var header = $('<tr>')
  header.attr({name: "header", id:"header"})
  var equation = $('<td>');
  equation.attr({id:"equation",colspan:4, name:"equation"})
  equation.text("");
  header.append(equation);
  table.append(header)
  // var tbody = $('<tbody>')
  var num = 9;
  while(num> 0){
    var row = $('<tr>')
    for (var i = 0; i < 4; i++) {
      if (i<3){
        var numButt = $('<td>');
        numButt.attr({ name:num, class:"number", value:num })
        numButt.text(num)
        row.prepend(numButt);
        num--;
      }else {
        var numButt = $('<td>');
        switch(num){
          case 6:
            numButt.attr({ name:'+', class:"operator", value:'+' })
              numButt.text('+')
            break;
          case 3:
            numButt.attr({ name:'-', class:"operator", value:'-' })
              numButt.text('-')
            break;
          case 0:
            numButt.attr({ name:'*', class:"operator", value:'*' })
              numButt.text('*')
            break;
        }
        row.append(numButt)
      }
      table.append(row)
    }
  }
  var row = $('<tr>')
      var numButt = $('<td>');
      numButt.attr({ name:num, class:"number", value:num })
      numButt.text(num)
      row.prepend(numButt);
      var numButt = $('<td>');
      numButt.attr({ name:'.',  id:"decimal", value:'.'})
      numButt.text(".")
      row.append(numButt);
      var numButt = $('<td>');
      numButt.attr({ name:'=',  id:"sum", value:'='})
      numButt.text("=")
      row.append(numButt);
      var numButt = $('<td>');
      numButt.attr({ name:'/', class:"operator", value:'/'})
      numButt.text("/")
      row.append(numButt);
      table.append(row);
    var row = $('<tr>')
      var numButt = $('<td>');
      numButt.attr({ name:'clear',  id:"clear", value:'clear', colspan:4})
      numButt.text("Clear")
      row.append(numButt);
      var numButt = $('<td>');
      numButt.attr({ name:'display', class:"invisible", id:"display", value:'display'})
      row.append(numButt);
      table.append(row);

  // $('#calcDiv').append(table);
  return table;
}

var beautify = function(){
  $('td').css("border", "2px solid black").height(40).width(40);
  $('.invisible').hide();
  $('.number').css("font-size", "2em");
  $('.operator').css("font-size", "2em").css("color", "red");
  $('#decimal').css("font-size", "2em");
  $('#sum').css("font-size", "2em");
  $('#clear').css("font-size", "1.5em");
}
