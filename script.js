// Render the page via render ()
//перерендер страницы через render()

// set an array variable for all tasks
//задаем переменную массива всех задач
let allTasks = [];
let valueInput = "";
let input = null;
// temporary index for the ability to edit text in the task
//временный индекс для возможности редактирования текста в задаче
let tempIndex = -1;
let temp = "";

// actions on page load
// load input
//действия при загрузке страницы
//загрузка инпут
window.onload = function init() {
  input = document.getElementById("add-task");
  // hang listeners for change and press Enter
  //навешиваем слушателей на изменение и нажатие кнопки Enter
  input.addEventListener("change", updateValue);
  input.addEventListener("keyup", keyPress);
};

// load the add task button
//загрузка кнопки добавления задачи
const onClickButton = () => {
  if (input.value === "") {
    alert("Недопустимое значение");
  } else {
    allTasks.push({
      text: valueInput,
      isCheck: false,
    });
    // zeroing the value of the variable and the value of the input
    //обнуление значения переменной и значения инпута
    valueInput = "";
    input.value = "";
    render();
  }
};

// load the button for deleting all tasks
//загрузка кнопки удаления всех задач
const resetButton = () => {
  allTasks = [];
  render();
};

// update the input value
//обновление значения инпута
const updateValue = (event) => {
  valueInput = event.target.value;
};

// check the state function
//функция состояния check
const onChangeCheckbox = (index) => {
  allTasks[index].isCheck = !allTasks[index].isCheck;
  render();
};

// function of the delete button
//функция кнопки удаления
const removeTask = (index) => {
  allTasks.splice(index, 1);
  render();
};

// function to check the index so that you can edit
//функция проверки индекса, чтоб появилась возможность редактирования
const editTask = (index) => {
  tempIndex = index;
  render();
};

// function to save edited text
//функция сохранения отредактированного текста
const doneTask = () => {
  if (!temp.length) {
    alert("Недопустимое значение");
  } else {
    allTasks[tempIndex].text = temp;
    tempIndex = -1;
    render();
  }
};

// function for canceling test editing
//функция отмены редактирования теста
const cancelTask = () => {
  tempIndex = -1;
  render();
};

// when you press Enter, the task is added
//при нажатии Enter происходит добавление задачи
const keyPress = (e) => {
  if (e.key == "Enter") {
    onClickButton();
  }
  render();
};

// when you press Enter, the edited text is saved
//при нажатии Enter происходит сохранение отредатированного текста
const keyPress1 = (e, textEdit) => {
  if (e.ctrlKey && e.keyCode == 13) {
    textEdit.value += "\n";
  } else if (e.key === "Enter") {
    doneTask(textEdit);
    render();
  } else {
    temp = e.target.value;
  }
};

// decoration function (main)
//функция оформления(главная)
const render = () => {
  let content = document.getElementById("content-page");

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  // sort the array to display completed tasks from the bottom
  //сортировка массива для отображения выполненных задач снизу
  allTasks.sort((one, two) => {
    if (one.isCheck > two.isCheck) {
      return 1;
    } else if (one.isCheck < two.isCheck) {
      return -1;
    } else {
      return 0;
    }
  });

  // iterate over the array general
  //перебор массива общий
  allTasks.map((item, index) => {
    //add a div(container)
    //добавляем див (контейнер)
    let container = document.createElement("div");
    container.id = `task-s{index}`;

    // add a checkbox
    //добавляем чекбокс
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.isCheck;
    container.appendChild(checkbox);
    checkbox.className = "checkbox-task";

    // add text
    //добавляем текст
    if (tempIndex === index) {
      // add text for editing
      //добавляем текст для редактирования
      let textEdit = document.createElement("textarea");
      // so that there is text for editing, and not emptiness
      //нужно чтоб был текст для редактирования, а не пустота
      textEdit.value = item.text;
      textEdit.className = "main-textarea";
      // add a value to Enter when editing a task
      //добавление значения на Enter при редактировании задачи
      textEdit.addEventListener("keyup", (e) => keyPress1(e, textEdit));
      container.appendChild(textEdit);

      // add an image to save the edited text
      //добавим изображение для сохранения редактированного текста
      let imageDone = document.createElement("img");
      imageDone.src = "./done.png";
      container.appendChild(imageDone);
      imageDone.className = "imageDone";
      imageDone.addEventListener("click", () => doneTask());

      // add an image to remove the text edit
      //добавим изображение для удаления редактирования текста
      let imageCancel = document.createElement("img");
      imageCancel.src = "./cancel.png";
      container.appendChild(imageCancel);
      imageCancel.className = "imageCancel";
      imageCancel.addEventListener("click", () => cancelTask());

      checkbox.disabled = true;
    } else {
      // add text (not editable)
      //добавим текст (не редактируемого)
      let text = document.createElement("p");
      text.innerText = item.text;
      container.appendChild(text);
      // apply the class depending on whether the task is checked
      //применяем класс в зависимости от того, чекнута ли задача
      text.className = item.isCheck ? "text-task done-text-task" : "text-task";

      // add an image to edit the text
      //добавим изображение для редактирования текста
      let imageEdit = document.createElement("img");
      imageEdit.src = "./edit.png";
      container.appendChild(imageEdit);
      imageEdit.style.display = item.isCheck ? "none" : "flex";
      imageEdit.className = "imageEdit";
      imageEdit.addEventListener("click", () => editTask(index));

      // add an image to delete the task
      //добавим изображение для удаления задачи
      let imageDelete = document.createElement("img");
      imageDelete.src = "./delete.png";
      container.appendChild(imageDelete);
      imageDelete.className = "imageDelete";

      // add an event for deleting all tasks
      //добавляем событие удаления всех задач
      imageDelete.addEventListener("click", () => removeTask(index));
    }

    //add container in div html
    //добавим контейнер в див html
    content.appendChild(container);
    container.className = "task-container";

    // function for tracking the state of the checkbox
    //функция отслеживания состояния чекбокса
    checkbox.onChange = () => {
      onChangeCheckbox(index);
    };
  });
};
