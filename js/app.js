const list = document.querySelector(".list");
const listNum = document.querySelector(".list_footer p");
const listAddInput = document.querySelector(".input input");
const btnAdd = document.querySelector(".btn_add");
const filter = document.querySelector(".tab");
const btnRemove = document.querySelector(".list_footer a");

let todoList = [
    {
        note:"機車換機油",
        checked: "checked"
    },
    {
        note:"去超市買義大利麵",
        checked: ""
    },
    {
        note:"去7-11寄快遞",
        checked: "checked"
    },
    {
        note:"繳這個月的電話費",
        checked: ""
    }
]

//重整資料函式
const refreshData = () => {
    let str = "";
    todoList.forEach((item,index) => {
        str +=`<li><label class="checkbox" for=""><input type="checkbox" data-num="${index}" ${item.checked}/><span>${item.note}</span></label><a href="#" class="delete"></a></li>`;
    });

    const undo = todoList.filter(el => {
        return el.checked === "";
    })

    list.innerHTML = str;
    listNum.textContent = `${undo.length}個待完成項目`
}

//新增資料函式
const addNewData = () => {
    let todoListContent = {};

    todoListContent.note = listAddInput.value;
    todoListContent.checked = "";
    todoList.push(todoListContent);
    listAddInput.value = "";
    refreshData();
}

//過濾資料函式
const filterData = checked => {
    let str = "";
    const todo = todoList.filter(item => {
        return item.checked == checked;
  })
    todo.forEach((element,index) => {
        str +=`<li><label class="checkbox" for=""><input type="checkbox" data-num="${index}" ${element.checked}/><span>${element.note}</span></label><a href="#" class="delete"></a></li>`;
  });
    list.innerHTML= str;
}

//目錄CSS active樣式toggle函式
const activeToggle = () => {
    $(this).addClass('active');
    $('.tab li').removeClass('active');
}

refreshData();

// 新增代辦事項
btnAdd.addEventListener("click", e => {
    console.log(listAddInput.value);
    if(listAddInput.value== "") {
        alert("新增代辦事項不得為空")
        return;
    }

    addNewData();
})

list.addEventListener("click", e => {
    //移除代辦事項
    let num = e.target.getAttribute("data-num");
    if (e.target.getAttribute("class") === "delete") {
        e.preventDefault();
        todoList.splice(num,1);
        refreshData();
        return;
    }

    if(e.target.checked) {
        todoList[num].checked = "checked";
    } else {
        todoList[num].checked = "";
    }

    refreshData();
})

filter.addEventListener("click", e => {
    if (e.target.className == undefined) {
        return;
    }
    e.preventDefault();


    if (e.target.className == "todo") {
        activeToggle();
        filterData("");
      } else if (e.target.className == "finished") {
            activeToggle();
            filterData("checked");
      } else {
            activeToggle();
            refreshData();
      }


})

btnRemove.addEventListener("click", e => {
    e.preventDefault();

    //篩選出已完成的項目
    const finished = todoList.filter(item => {
        return item.checked == "checked";
    });

    //從剛剛篩選出的資料中比對原始資料，找到索引值並使用Spice移除

    // finished.forEach(item => {
    //     return todoList.splice(todoList.findIndex(el => {
    //         return el.checked == item.checked
    //     }),1);
    // })

    finished.forEach(function(item) {
        todoList.splice(todoList.findIndex(function(el){
           return el.checked == item.checked
        }),1);
    })

    refreshData();
})

