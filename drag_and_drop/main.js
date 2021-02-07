class DragAndDrop {
  constructor(){
    // Elements
    this.$addBtns = document.querySelectorAll('.add-btn:not(.solid)');
    this.$saveItemBtns = document.querySelectorAll('.solid');
    this.$addItemContainers = document.querySelectorAll('.add-container');
    this.$addItems = document.querySelectorAll('.add-item');

    // Item Lists
    this.$columnsList = document.querySelectorAll('.drag-item-list');
    this.$backlogList = document.getElementById('backlog-list');
    this.$progressList = document.getElementById('progress-list');
    this.$completeList = document.getElementById('complete-list');
    this.$onHoldList = document.getElementById('on-hold-list');

    // Initialize arrays
    this.backlogListArray = JSON.parse(localStorage.getItem('backlogItems')) 
    || ['Release the course', 'Sit back and relax'];
    this.progressListArray = JSON.parse(localStorage.getItem('progressItems')) 
    || ['Work on projects', 'Listen to music'];
    this.completeListArray = JSON.parse(localStorage.getItem('completeItems')) 
    || ['Being cool', 'Getting stuff done'];
    this.onHoldListArray = JSON.parse(localStorage.getItem('onHoldItems')) 
    || ['Being uncool'];
    
    // Global vars
    this.dragging = false;
    this.draggedItem;
    this.currentColumn;
    this.listArray = [];
    this.containersArray = [this.$backlogList, this.$progressList, this.$completeList, this.$onHoldList];
  }

  // Set new values and save in local storage
  updateSavedColumns(array){
    this.listArray = array || [this.backlogListArray, this.progressListArray, this.completeListArray, this.onHoldListArray];
    const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
    arrayNames.forEach((item, index) => {
      localStorage.setItem(`${item}Items`, JSON.stringify(this.listArray[index]));
    });
  }

  // Allow arrays to reflect Drag and Drop items
  rebuildsArray(){
    for(let i= 0; i<this.containersArray.length; i++){
      const containerChildrens = this.containersArray[i].children;
      if (containerChildrens.length){
        this.listArray[i] = Array.from(containerChildrens).map(item => item.textContent);
      } else {
        this.listArray[i] = [];
      }
    }
    this.updateSavedColumns(this.listArray);
    this.updateDOM();
  }


  //        Item behavior
  // When item start dragging
  dragItem(event){
    this.draggedItem = event.target;
    this.dragging = true;
  }

  // Column allowsfor item drop
  allowDrop(event){
    event.preventDefault();
  } 

  // Dropping element
  dropItem(event){
    event.preventDefault();
    this.containersArray.forEach(item => item.classList.remove('over'));
    if (typeof this.currentColumn === 'number' && this.currentColumn >= 0){
      const parent = this.$columnsList[this.currentColumn];
      parent.appendChild(this.draggedItem);
      this.rebuildsArray();
      this.dragging = false;
    }
  }

  // When item enter on Column area
  dragEnter(index){
    this.containersArray[index].classList.add('over');
    this.currentColumn = index;
  }


  //        Populate DOM
  // Create item element
  createItemEl(container, column, item, index){
    const $li = document.createElement('li');
    $li.classList.add('drag-item');
    $li.textContent = item;
    $li.setAttribute('draggable', true);
    $li.setAttribute('contenteditable', true);
    $li.setAttribute('id', index);
    // Append new element to container
    container.append($li);
    $li.ondragstart = (event) =>  this.dragItem(event);
    $li.addEventListener('focusout', (event) => this.updateLiItem(event, column, index));
  }

  // Update li item with new text
  updateLiItem(event, columnIndex, listItemIndex){
    if (!this.dragging){
      if (!event.target.textContent.length){
        this.listArray[columnIndex].splice(listItemIndex, 1);
        this.updateSavedColumns(this.listArray);
        this.updateDOM();
      } else {
        this.listArray[columnIndex][listItemIndex] = event.target.textContent;
        this.updateSavedColumns(this.listArray);
        this.updateDOM();
      }
    }
  }

  // Abstraction
  updateItemContainer(container, containerindex, arrayItems){
    container.textContent = ''; 
    arrayItems.forEach((item, index) => {
      this.createItemEl(container, containerindex, item, index);
    });
  }

  // Update columns and rows
  updateDOM(){
    this.containersArray.forEach((container, index) => {;
      this.updateItemContainer(container, index, this.listArray[index]);
    });
  }

  // Save new item to column
  saveItemToColumn(index, content){
    this.listArray[index].push(content);
    this.updateSavedColumns(this.listArray);
    this.updateDOM();
  }

  // Show input box
  showInputBox(index){
    this.$addBtns[index].style.visibility = 'hidden';
    this.$saveItemBtns[index].style.display = 'flex';
    this.$addItemContainers[index].style.display = 'flex';
  }

  // Hide input box
  hideInputBox(index){
    this.$addBtns[index].style.visibility = 'visible';
    this.$saveItemBtns[index].style.display = 'none';
    this.$addItemContainers[index].style.display = 'none';
    if (this.$addItems[index].textContent){
      this.saveItemToColumn(index, this.$addItems[index].textContent);
      this.$addItems[index].textContent = '';
    }
  }

  
  //        On Load
  // Initial start function
  load(){
    this.updateSavedColumns();
    this.updateDOM();
    // Event listeners
    this.$columnsList.forEach((item, index) => {
      item.addEventListener('drop', (event) => this.dropItem(event));
      item.addEventListener('dragover', (event) => this.allowDrop(event));
      item.addEventListener('dragenter', () => this.dragEnter(index));
    });
    this.$addBtns.forEach((item, index) => {
      item.addEventListener('click', () => this.showInputBox(index));
    });
    this.$saveItemBtns.forEach((item, index) => {
      item.addEventListener('click', () => this.hideInputBox(index));
    });
    this.$addItems.forEach(item => {
      item.setAttribute('contenteditable', true);
    });
  }
}

const project = new DragAndDrop();
project.load();