// copyright dirk luberth dijkman
// https://github.com/ldijkman/Ace_Seventh_Heaven/discussions/5
// https://ldijkman.github.io/Ace_Seventh_Heaven/Hell.html
// https://ldijkman.github.io/Ace_Seventh_Heaven/Seventh_Heaven.html

// load style sheet css for console,    should be better
var date = new Date().getTime();
document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="//ldijkman.github.io/Ace_Seventh_Heaven/console.css?='+date+'">';
//document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="console.css?='+date+'">';

/*Creates a console like next

<div id="console-log-div" style="color: rgba(0, 0, 0, 0.61);">
  <div id="legend">Console, Drag here. <a href="https://ldijkman.github.io/Ace_Seventh_Heaven/Seventh_Heaven.html" target="_blank">7th-Heaven.</a><input type="button" onclick="document.getElementById(&quot;console-log-text&quot;).innerHTML=&quot;Cleared Console&quot;;" value="Clear" title="Empty Console!"> <input type="button" value="hide" onclick="hideconsole()" title="Hide Console!"></div>
  <div id="console-log-text">
    <div class="log-row" style="color: red;">log message</div>
    <div class="log-row" style="color: gray;">log message</div>
    
  </div>
</div>
*/

// wait for the page loaded, and make console draggable 
document.addEventListener("DOMContentLoaded",
function (event) {
    dragElement(document.getElementById("console-log-div")); //https://www.w3schools.com/howto/howto_js_draggable.asp
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

// https://www.w3schools.com/howto/howto_js_draggable.asp
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
//https://www.w3schools.com/howto/howto_js_draggable.asp



      // https://codepen.io/louisr/pen/xZwJLx
      // https://github.com/bahmutov/console-log-div 
      //      changes Luberth https://plnkr.co/edit/AufqNkQe4InMuU8v
      //      test for https://ldijkman.github.io/Ace_Seventh_Heaven/Hell.html 
      //    more? https://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number
      // https://github.com/ldijkman/Ace_Seventh_Heaven/discussions/5

        //const stylesheet = '#console-log-div{min-height:55px;max-height:200px;width:600px;top:200px;left:100px;margin:1px;padding:1px 0 0;font-family:"Input Mono",monospace;font-weight:400;font-size:.8em;line-height:1em;color:rgba(0,0,0,.61);box-shadow:inset 0 0 2px rgba(0,0,0,.1);background-color:#ebebeb;overflow:auto;overscroll-behavior-y:auto;transform:scale(100%);z-index:50000}#console-log-div #legend,#console-log-div .log-row,#console-log-div td{padding:1px 0 8px;text-indent:1px;z-index:50000}#console-log-div #legend{padding-bottom:12px;font-size:1.2em;cursor:move;z-index:50000}#console-log-div .log-row:nth-child(odd){background:rgba(0,0,0,.1);z-index:50000}#console-log-div thead{background:rgba(0,0,0,.2)}';
        //document.adoptedStyleSheets = [stylesheet];

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
        var warn = console.warn.bind(console);
        var info = console.info.bind(console);
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

          document.getElementById("legend").innerHTML = 'Console Drag Here. <div style="float:right;"><a href="https://ldijkman.github.io/Ace_Seventh_Heaven/Seventh_Heaven.html" target="_blank" style="color:gray;"><small>7th-Heaven. </small></a> <input type="button" onclick=\'document.getElementById("console-log-text").innerHTML="";console.info("Cleared Console ",new Date())\' value="Clear" title="Empty Console!"> <input type="button" value="hide" onclick="hideconsole()" title="Hide Console!"> <input type="button" value="?" onmouseover="this.focus()" onclick=\'window.open("https://github.com/ldijkman/Ace_Seventh_Heaven/discussions/5","_blank")\'></div>';
          
   

          var div = document.createElement('div');
          div.id = 'console-log-text';

          outer.appendChild(div);
          return div;
        }());

        function printToDiv() {
          var msg = Array.prototype.slice.call(arguments, 0)
            .map(toString)
            .join(' ');
          var item = document.createElement('div');
          item.classList.add('log-row');
          item.textContent = msg;

          //logTo.appendChild(item);               // new logs on bottom
          logTo.prepend(item);                     // i want new logs on top
          
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



        console.error = function errorWithCopy() {
          error.apply(null, arguments);
          var args = Array.prototype.slice.call(arguments, 0);
          args.unshift('ERROR:');
          etype = "errorr";
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
          printToDiv('EXCEPTION:', err.message + '\n  ' + err.filename, err.lineno + ':' + err.colno);
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



  
