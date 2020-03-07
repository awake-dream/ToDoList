$(function () {

    var listArr = JSON.parse(localStorage.getItem("info") || "[]");

    var newList = JSON.parse(localStorage.getItem("down_info") || "[]");

    $(".goods_info").change(function () {
        var num = Date.now();

        var obj = {
            id: ++num,
            des: $(this).val().trim(),
            isSelect: false
        }

        listArr.push(obj);

        localStorage.setItem("info", JSON.stringify(listArr))

        $(".up_num").text(listArr.length);

        setInfo();

        $(this).val(" ");

    });

    setInfo();

    function setInfo() {
        let str = `
        
        <h2><p>正在进行时</p> <span class="up_num">${listArr.length}</span></h2>

        <ul class="up_list">
        `
        listArr.forEach(item => {
            str += `
            
            <li>
            <div class="list_box">
              <div>
                <input type="checkbox" class='goods_check' data-id=${item.id}>
                <a href="javascript:;" class="goods_title">${item.des}</a>
              </div>
  
              <button class="up_zt" data-id=${item.id}> - </button>
            </div>
            </li>
            `;
        })
        str += `</ul>`;

        $(".up_box").html(str);

    }


    $(".up_box").on("click", ".goods_check", function () {
        var id = $(this).data("id");


        listArr.forEach(item => {
            if (item.id == id) {

                newList.push(item);
                item.isSelect = true;

                localStorage.setItem("down_info", JSON.stringify(newList));
            }
        });

        downList();


        listArr = listArr.filter(item => item.id !== id);


        localStorage.setItem("info", JSON.stringify(listArr));

        setInfo();


    });

    $(".up_box").on("click", ".up_zt", function () {
        var id = $(this).data('id');

        listArr = listArr.filter(item => item.id !== id)
        
        localStorage.setItem("info", JSON.stringify(listArr));

        setInfo();
    })


    downList();

    function downList () {
        let str = `

        <h2><p>已经完成时</p> <span class="down_num">${newList.length}</span></h2>
        <ul class="down_list">`

        newList.forEach( item => {
            str += `
            <li>
            <div class="list_box">
              <div>
                <input type="checkbox" class="down_check" checked=${item.isSelect} data-id=${item.id}>
                <a href="javascript:;">${item.des}</a>
              </div>
  
              <button class="down_zt" data-id=${item.id}> - </button>
            </div>
            </li>
            `;
        })

        str += `</ul>`;

        $(".down_box").html(str);

    }


    $(".down_box").on("click", ".down_check", function () {
        var id = $(this).data("id");

        newList.forEach(item => {
            if(item.id === id){
                listArr.push(item);

                localStorage.setItem("info", JSON.stringify(listArr));

                setInfo();

            }
        })

        newList = newList.filter(item => item.id !== id);

        localStorage.setItem("down_info", JSON.stringify(newList));
        downList();

    });
    

    $(".down_box").on("click", ".down_zt", function () {
        var id = $(this).data('id');

        newList = newList.filter(item => item.id !== id)
        
        localStorage.setItem("down_info", JSON.stringify(newList));
        
        downList();
    })

    
    $(".remove").click(function () {
        listArr = [];
        localStorage.setItem("info", JSON.stringify(listArr));
        setInfo();

        newList = [];
        localStorage.setItem("down_info", JSON.stringify(newList));
        downList();

        
    });



});