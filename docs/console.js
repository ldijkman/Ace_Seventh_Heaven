// https://github.com/ldijkman/Ace_Seventh_Heaven/blob/main/docs/console.js

/*
add next to a HTML webpage to get an Console
  <script src="https://ldijkman.github.io/Ace_Seventh_Heaven/console.js"></script>
  <input type="button" value="Show Console" onclick="showconsole();" title="Show Console again if hidden">
  <input type="button" value="Hide Console" onclick="hideconsole();" title="Hide Console">
  <input type="button" value="Toggle Console" onclick="toggleconsole();"title="Toggle Show or Hide Console"><br>
*/

// copyright dirk luberth dijkman
// https://github.com/ldijkman/Ace_Seventh_Heaven/discussions/5
// https://ldijkman.github.io/Ace_Seventh_Heaven/Hell.html
// https://ldijkman.github.io/Ace_Seventh_Heaven/Seventh_Heaven.html

// load style sheet css for console,    should be better
//  var date = new Date().getTime();
// document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="//ldijkman.github.io/Ace_Seventh_Heaven/console.css?='+date+'">';
// document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="console.css?='+date+'">';

  // https://www.geeksforgeeks.org/how-to-load-css-files-using-javascript/
  // next adds a stylesheet link to the page 
  // but i find it strange will it be always loaded
  // <head> 
  //       <title>Add Console to HTML WebPage, OneLiner </title>
  //       <link rel="stylesheet" type="text/css" href="//ldijkman.github.io/Ace_Seventh_Heaven/console.css">
  // </head>
        // Create new link Element
        let link = document.createElement('link');
         
        // set the attributes for link element
        link.rel = 'stylesheet';    
        link.type = 'text/css';
        link.href = '//ldijkman.github.io/Ace_Seventh_Heaven/console.css';
         
        // Get HTML head element to append
        // link element to it
 ////////////////////////////////////////////////////////////////////////
// turned off for codepen use codpen css
   document.getElementsByTagName('HEAD')[0].appendChild(link);
/////////////////////////////////////////////////////////////////////////
// https://www.geeksforgeeks.org/how-to-load-css-files-using-javascript/

/*Creates a console like next

<div id="console-log-div" style="color: rgba(0, 0, 0, 0.61);">
  <div id="legend">Console, Drag here. <a href="https://ldijkman.github.io/Ace_Seventh_Heaven/Seventh_Heaven.html" target="_blank">7th-Heaven.</a><input type="button" onclick="document.getElementById(&quot;console-log-text&quot;).innerHTML=&quot;Cleared Console&quot;;" value="Clear" title="Empty Console!"> <input type="button" value="hide" onclick="hideconsole()" title="Hide Console!"></div>
  <div id="console-log-text">

     <!--new messages will be inserted at top here-->
  
                            <div class="log-row" style="color: gray; background: rgb(225, 225, 225);">      text          </div>
    <div class="linenr">2 </div>
                            <div class="log-row" style="color: gray;">        text          </div>
    <div class="linenr" style="background: rgb(225, 225, 225);">1 </div>
                             <div class="log-row" style="color: gray; background: rgb(225, 225, 225);">      text          </div>
    <div class="linenr">0 </div><div class="log-row" style="color: gray;">     text        </div>
  </div>
</div>
*/

// wait for the page loaded, and make console draggable 
document.addEventListener("DOMContentLoaded",
function (event) {
    console.info("console.js, Running, Making it Draggable.");
    dragElement(document.getElementById("console-log-div")); // https://www.w3schools.com/howto/howto_js_draggable.asp
    console.info("Ok, You can Drag Me now!.");
    console.info("Resize, bottom right corner!.");
     console.debug('This Bug is RosyBrown');
});

function hideconsole() {
  document.getElementById("console-log-div").style.display = "none";
}

function showconsole() {
  document.getElementById("console-log-div").style.display = "block";
}

function toggleconsole() {
  if(document.getElementById("console-log-div").style.display == "none"){
    document.getElementById("console-log-div").style.display = "block";
  }else{
    document.getElementById("console-log-div").style.display = "none";
  } 
}

// start drag https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//  if (document.getElementById(elmnt.id + "header"))
//  if present, the header is where you move the DIV from:
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//   otherwise, move the DIV from anywhere inside the DIV:
    document.getElementById("legend").onmousedown = dragMouseDown;
 

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
// end drag https://www.w3schools.com/howto/howto_js_draggable.asp

  function keyp(event){
    if (event.keyCode == 13) {
        // Enter was pressed
        eval(document.getElementById("textt").value);
    }
  }






function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = ["console","console.log","console.info(\"\",)","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"),countries);














      // https://codepen.io/louisr/pen/xZwJLx
      // https://github.com/bahmutov/console-log-div 
      //      changes Luberth https://plnkr.co/edit/AufqNkQe4InMuU8v
      //      test for https://ldijkman.github.io/Ace_Seventh_Heaven/Hell.html 
      //    more? https://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number
      // https://github.com/ldijkman/Ace_Seventh_Heaven/discussions/5


var messageNR = 0;
var errorNR = 0;
var maxerror = 2500;  // erase console if 2500 messages

      var etype = "log";

      (function initConsoleLogDiv() {
        'use strict';


        if (console.log.toDiv) {
          return;
        }

        function toString(x) {
          return typeof x === 'string' ? x : JSON.stringify(x);
        }

        var log = console.log.bind(console);
        var error = console.error.bind(console);
        var debug = console.debug.bind(console);
        var warn = console.warn.bind(console);
        var info = console.info.bind(console);
        var clear = console.clear.bind(console);
        var table = console.table ? console.table.bind(console) : null;
        var consoleId = 'console-log-div';

        // Create the Console Div container.
        function createOuterElement(id) {
          var outer = document.getElementById(id);
          if (!outer) {
            //outer = document.createElement('fieldset');
            outer = document.createElement('div');
            outer.id = id;
            document.body.appendChild(outer);
          }
          var style = outer.style;
          return outer;
        }
        // Create the logging div and adornments.
        var logTo = (function createLogDiv() {

          var outer = createOuterElement(consoleId);
          var caption = document.createTextNode('Console Output');
          var legend = document.createElement('div');
          legend.id = "legend";
          legend.appendChild(caption);
          outer.appendChild(legend);

document.getElementById("legend").innerHTML = 
`Console.<label id="nr" title="messagecounter"> >nr</label>
<div id="test">
  <input type="text" size="60" value='console.info("Hello World",messageNR,"----------",new Date());' id="textt" onmouseover="this.focus()" onkeypress="keyp(event);">
   
<input type="button" value="run" onclick="eval(textt.value);">
</div>

<div style="float:right;">
<a href="https://ldijkman.github.io/Ace_Seventh_Heaven/Seventh_Heaven.html" 
target="_blank" style="color:gray;">
<small>7th-Heaven. </small></a> 
<input type="button" 
onclick=\'document.getElementById("console-log-text").innerHTML="";
messageNR=0;
errorNR=0;
console.info("Cleared Console ",new Date())\' 
value="Clear" 
title="Empty Console!"> 
<input type="button" 
value="hide" 
onclick="hideconsole()" 
title="Hide Console!"> 
<input type="button" 
value="?" 
onmouseover="this.focus()" onclick=\'window.open("https://github.com/ldijkman/Ace_Seventh_Heaven/discussions/5","_blank")\'>
</div>`;
          
   

          var div = document.createElement('div');
          div.id = 'console-log-text';

          outer.appendChild(div);
          return div;
        }());
        

        
        function printToDiv() {
          
          //var ele = document.createElement('div');
          //ele.classList.add('linenr');
          //ele.textContent = messageNR;
          //ele.textContent += " ";
          //document.getElementById("console-log-text").appendChild(ele);
          
          var msg = Array.prototype.slice.call(arguments, 0)
            .map(toString)
            .join(' ');
          var item = document.createElement('div');
          item.classList.add('log-row');
          // item.textContent = '<font style="color:gray;">'+messageNR+'</font>';
          // item.textContent = messageNR;
          // item.textContent += " ";
          item.textContent += msg;

          //logTo.appendChild(item);               // new logs on bottom
          logTo.prepend(item);                     // i want new logs on top


          var ele = document.createElement('div'); // dont know i wat it before
          ele.classList.add('linenr');
          ele.textContent = messageNR;
          ele.textContent += " ";
          document.getElementById("console-log-text").prepend(ele);

          
          
          const nodeList = document.querySelectorAll(".log-row");
          if (etype == "log") {                        // change text color
            nodeList[0].style.color = "gray";
          }
          if (etype == "warn") {
            nodeList[0].style.color = "orange";
          }
          if (etype == "errorr") {
            nodeList[0].style.color = "red";
          }
          if (etype == "exception") {
            nodeList[0].style.color = "red";
          }
          if (etype == "info") {
            nodeList[0].style.color = "blue";
          }
          if (etype == "clear") {
            nodeList[0].style.color = "purple";
          }
          if (etype == "debug") {
            nodeList[0].style.color = "rosybrown";
          }

          if (messageNR % 2){
            nodeList[0].style.background= "rgb(225,225,225)"; // make bg color stick to messageline
          }
          const nodList = document.querySelectorAll(".linenr");
          if (messageNR % 2){
            nodList[0].style.background= "rgb(225,225,225)"; // make bg color stick to linenr
          }
           
          
          document.getElementById('nr').innerHTML="  "+messageNR+'<font style="color:red;">  '+errorNR+'<\/font>';
          messageNR++;
          
          if(messageNR >= maxerror){      // erase console if 2500 messages
              document.getElementById("console-log-text").innerHTML="";
              messageNR=0;
              errorNR=0;
          }
        }

        function logWithCopy() {
          var ele = document.getElementById('console-log-div');
          setDarkLight(ele);
          log.apply(null, arguments);
          etype = "log";
          printToDiv.apply(null, arguments);
        }

        console.log = logWithCopy;
        console.log.toDiv = true;

        console.clear = function consoleclear() {
          clear.apply(null, arguments);
          var args = Array.prototype.slice.call(arguments, 0);
          args.unshift('CLEAR:');
          etype="clear";
          messageNR=0;
          errorNR=0;
          document.getElementById("console-log-text").innerHTML="";                       printToDiv.apply(null, args);
          console.info("code console.clear(); ",new Date())
        };

        console.error = function errorWithCopy() {
          error.apply(null, arguments);
          var args = Array.prototype.slice.call(arguments, 0);
          args.unshift('ERROR:');
          etype = "errorr";
          errorNR++;
          printToDiv.apply(null, args);
        };

        console.debug = function debugWarning() {
          debug.apply(null, arguments);
          var args = Array.prototype.slice.call(arguments, 0);
          args.unshift('DEBUG:');
          etype = "debug";
          printToDiv.apply(null, args);
        };

        console.warn = function logWarning() {
          warn.apply(null, arguments);
          var args = Array.prototype.slice.call(arguments, 0);
          args.unshift('WARNING:');
          etype = "warn";
          printToDiv.apply(null, args);
        };

        console.info = function loginfo() {
          info.apply(null, arguments);
          var args = Array.prototype.slice.call(arguments, 0);
          args.unshift('INFO:');
          etype = "info";
          printToDiv.apply(null, args);
        };

        function printTable(objArr, keys) {

          var numCols = keys.length;
          var len = objArr.length;
          var $table = document.createElement('table');
          $table.style.width = '100%';
          $table.setAttribute('border', '1');
          var $head = document.createElement('thead');
          var $tdata = document.createElement('td');
          $tdata.innerHTML = 'Index';
          $head.appendChild($tdata);

          for (var k = 0; k < numCols; k++) {
            $tdata = document.createElement('td');
            $tdata.innerHTML = keys[k];
            $head.appendChild($tdata);
          }
          $table.appendChild($head);

          for (var i = 0; i < len; i++) {
            var $line = document.createElement('tr');
            $tdata = document.createElement('td');
            $tdata.innerHTML = i;
            $line.appendChild($tdata);

            for (var j = 0; j < numCols; j++) {
              $tdata = document.createElement('td');
              $tdata.innerHTML = objArr[i][keys[j]];
              $line.appendChild($tdata);
            }
            $table.appendChild($line);
          }
          var div = document.getElementById('console-log-text');
          div.appendChild($table);

        }

        console.table = function logTable() {
          if (typeof table === 'function') {
            table.apply(null, arguments);
          }

          var objArr = arguments[0];
          var keys;

          if (typeof objArr[0] !== 'undefined') {
            keys = Object.keys(objArr[0]);
          }
          printTable(objArr, keys);
        };

        window.addEventListener('error', function (err) {
          etype="exception";
          errorNR++;
          // printToDiv('EXCEPTION:', err.message + '\r\n' + err.filename +'\r\n line '+ err.lineno + ':col: ' + err.colno);
          printToDiv('EXCEPTION:', err.message );
          var text='<br><a href="' + err.filename + '" target="errorlink" style="color:darkred;">' + err.filename + '</a><br> line '+ err.lineno + ' column: ' + err.colno;
          document.querySelector(".log-row").innerHTML+=text;
        });

        //   Detect dark or light colors.

        function setDarkLight(element) {
          var color = window.getComputedStyle(element, null).backgroundColor;
          if (isDark(color)) {
            element.style.color = "rgba(255,255,255,1)";
          } else {
            element.style.color = "rgba(0,0,0,.61)";
          }
        }

        function isDark(color) {
          var match = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(color);
          return parseFloat(match[1]) +
            parseFloat(match[2]) +
            parseFloat(match[3]) <
            3 * 256 / 2; // r+g+b should be less than half of max (3 * 256)
        }
      }());


      // https://codepen.io/louisr/pen/xZwJLx
      // https://github.com/bahmutov/console-log-div 
      //      changes Luberth https://plnkr.co/edit/AufqNkQe4InMuU8v
      //      test for https://ldijkman.github.io/Ace_Seventh_Heaven/Hell.html 
      //    more? https://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number
      // https://github.com/ldijkman/Ace_Seventh_Heaven/discussions/5
      // copyright dirk luberth dijkman



  
