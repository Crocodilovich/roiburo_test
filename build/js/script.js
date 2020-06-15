let links = document.querySelectorAll('.flat-nav__menu-link'),
    content = document.querySelector('.flat__content'),
    info = document.querySelector('.flat-nav__info'),
    progress = document.querySelector('.flat__nav-ptogress-current'),
    house = document.querySelectorAll('.house'),
    floor = document.querySelectorAll('.floor__button'),
    plan = document.querySelectorAll('.plan__button');

let houseOpt,
    floorOpt,
    planOpt;

openBox('building');

links[1].disabled = true;
links[2].disabled = true;
links[3].disabled = true;

[].forEach.call(house, function(itme) {
  itme.addEventListener('click', function() {
    houseOpt = this.dataset.value;

    [].forEach.call(house, function(itme) {
      itme.classList.remove('house_active');
    });
    itme.classList.add('house_active');

    addInfo();
    document.querySelector('.flat-nav__title').textContent = 'Вы выбрали:';
    progress.textContent = 2;
    openBox('floor');

    links[1].disabled = false;
    links[2].disabled = true;
    links[3].disabled = true;

    selectionFloor();
  });
});

function selectionFloor() {
  [].forEach.call(floor, function(itme) {
    itme.addEventListener('click', function() {
      floorOpt = this.dataset.value;

      [].forEach.call(floor, function(itme) {
        itme.classList.remove('floor__button_active');
      });
      itme.classList.add('floor__button_active');

      addInfo();
      progress.textContent = 3;
      openBox('plan');

      links[1].disabled = false;
      links[2].disabled = false;
      links[3].disabled = true;

      selectionPlan();
    });
  });
}

function selectionPlan() {
  [].forEach.call(plan, function(itme) {
    itme.addEventListener('click', function() {
      planOpt = this.dataset.value;

      [].forEach.call(plan, function(itme) {
        itme.classList.remove('plan__button_active');
      });
      itme.classList.add('plan__button_active');

      progress.textContent = 4;
      openBox('room');

      links[1].disabled = false;
      links[2].disabled = false;
      links[3].disabled = false;
    });
  });
}


function openBox(str) {
  [].forEach.call(links, function(elem) {
    elem.classList.remove('flat-nav__menu-link_active');

    if (elem.dataset.content === str) {
      elem.classList.add('flat-nav__menu-link_active');
    }
  });

  [].forEach.call(content.children, function(elem) {
    elem.classList.add('hidden');
  });

  if (content.querySelector('#' + str)) {
    let box = content.querySelector('#' + str);
    
    box.classList.remove('hidden');
  }
}

function addInfo() {
  info.innerHTML = '';

  if (houseOpt) {
    info.appendChild(createInfoItem(houseOpt));
  }
  if (floorOpt) {
    info.appendChild(createInfoItem(floorOpt));
  }
}

function createInfoItem(str) {
  let li = document.createElement('li');

  li.classList.add('flat-nav__info-item', 'title');
  li.textContent = str;

  return li;
}

[].forEach.call(links, function(item, index) {
  item.addEventListener('click', function(evt) {
    evt.preventDefault();

    [].forEach.call(links, function(elem) {
      elem.classList.remove('flat-nav__menu-link_active');
    });
    item.classList.add('flat-nav__menu-link_active');
    progress.textContent = index + 1;

    [].forEach.call(content.children, function(elem) {
      elem.classList.add('hidden');
    });

    if (content.querySelector('#' + this.dataset.content)) {
      let box = content.querySelector('#' + this.dataset.content);
      
      box.classList.remove('hidden');
    }
  });
});
