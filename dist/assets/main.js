const LVL3_ITEM_HEIGHT = 56 // px

// populate menu on page load
document.addEventListener("DOMContentLoaded", function() {
  var lvl1_menu = document.querySelector('#main-menu');
  var tabIndex = 0;
  
  menu_items.forEach(function(lvl1) {
    var lvl1_el = document.createElement('li');
    var lvl1_html = `
      <img src="https://via.placeholder.com/30" alt="${lvl1.title}">
      <p>${lvl1.title}</p>
    `;

    if(!lvl1.subItems) {
      lvl1_html = `<a href=${lvl1.link}>${lvl1_html}</a>`
    } 
    else {
      lvl1_el.setAttribute('data-tab', ++tabIndex);
      lvl1_html += `
        <button class="more"><span class="chevron right"></span></button>`;

      var tab = document.createElement('div');
      tab.setAttribute('id', 'tab-'+tabIndex);
      tab.classList.add('tab');

      var lvl2_menu = document.createElement('ul');
      lvl2_menu.classList.add('list');

      lvl1.subItems.forEach(function(lvl2) {
        var lvl2_el = document.createElement('li');        

        if(!lvl2.subItems) {
          lvl2_el.innerHTML = `<a href=${lvl2.link}>${lvl2.title}</a>`;
          
        } 
        else {
          lvl2_el.classList.add('accordeon');
          lvl2_el.innerHTML = `
            <p>${lvl2.title}</p>
            <button class="more"><span class="chevron down"></span></button>
            <hr>
          `;

          var lvl3_menu = document.createElement('ul');          
          
          lvl2.subItems.forEach(function(lvl3) {
            var lvl3_el = document.createElement('li');
            lvl3_el.innerHTML = `<a href=${lvl3.link}>${lvl3.title}</a>`;
            lvl3_menu.appendChild(lvl3_el);
          });

          lvl2_el.appendChild(lvl3_menu);
        }
        lvl2_menu.appendChild(lvl2_el);
      });
      tab.appendChild(lvl2_menu);
      document.querySelector('#tab-pane').appendChild(tab);
    }
    lvl1_el.innerHTML = lvl1_html;

    lvl1_menu.appendChild(lvl1_el);
  });
});


// open - close main menu
function toggleMenu(el) {
  var pane = document.querySelector("#menu-pane");
  pane.classList.toggle("open");
  if(!pane.classList.contains("open")) {
    closeTab();
  }
  el.classList.toggle('open');
}

// open tab
document.querySelector("#main-menu").addEventListener("click", function (event) {
  // element variables
  var listElement = event.target.closest("li");
  var tabId = listElement.getAttribute('data-tab');
  var tabPane = document.querySelector("#tab-pane");
  
  if(tabId && !tabPane.classList.contains('open')) {
    // set title
    var tabTitle = document.querySelector('#tab-title');
    tabTitle.innerHTML = listElement.querySelector('p').innerHTML;
    // set active classes
    document.querySelector("#tab-"+tabId).classList.add('active');
    listElement.classList.add('highlight');
    // delay tab opening
    setTimeout(function() {
      tabPane.classList.add('open');      
    }, 300);
  }
});

document.querySelector('#tab-pane').addEventListener("click", function (event) {

  var item = event.target.closest('li');

  if(item) {
    if(item.classList.contains('accordeon')) {

      if(item.classList.contains('show')) {
        closeAccordeon();
      } else {
        closeAccordeon();
        var list = item.querySelector('ul');
      
        // maxHeight inline styling is required for animating height
        // as css can't animate the change when height is auto
        childrenCount = list.querySelectorAll('li').length;
        var maxHeight = (childrenCount * LVL3_ITEM_HEIGHT) + 'px';

        if(!item.classList.contains('show')) {
          item.querySelector('ul').style.maxHeight = maxHeight;
          item.classList.add('show');
        }
      }
    }
  } 
  else if(event.target == this) {
    closeTab();
  }
});

function closeTab() {
  var highighted = document.querySelector("#main-menu li.highlight");
  if(highighted) {
    highighted.classList.remove('highlight');
  }
  setTimeout(function() {    
    document.querySelector("#tab-pane").classList.remove('open');
    if(highighted) {
      document.querySelector("#tab-pane .active").classList.remove('active');
    }
    closeAccordeon();
  }, 200);
}

function closeAccordeon() {
  var pane = document.querySelector('#tab-pane');
  var accordeon = pane.querySelector('li.show');
  if(accordeon) {
    accordeon.classList.remove('show');
    accordeon.querySelector('ul').style.maxHeight = '';
  }
}