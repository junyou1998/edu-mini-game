// datas => 介紹資料
var datas = {}
console.log('datas:', datas)
// 將資料重新隨機排序
function shuffle(arr) {
    var i,
        j,
        temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
};

// var newDatas = shuffle(datas.intros);

var type_sort = [];
var sort_id = []


console.log('type_sort' + type_sort + '/sort_id' + sort_id)

// 解決100vh視窗高手機顯示bug的問題
document.documentElement.style.setProperty(
    '--vw',
    window.innerWidth * 0.01 + 'px'
)
document.documentElement.style.setProperty(
    '--vh',
    window.innerHeight * 0.01 + 'px'
)


// 地圖地圖
var map = [
    [0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 4],
    [1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
];
// 0代表道路
// 1代表牆壁
// 3代表食物
// 4代表出口

var [rows, cols] = [12, 12] //地圖12*12
var player = [0, 0]; //玩家初始位置

var objCount = 10; //食物數量
var get = 0
var popup = 1

// 畫格子
genGrid()

function genGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            var block = document.createElement("div");
            block.id = `b-${row}-${col}`;
            block.className = "block";
            document.querySelector(".map").appendChild(block);
        }
    }
}



function genMaze() {
    // 生食物
    genObj()

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

            if (map[row][col] == 1) {
                $(`#b-${row}-${col}`).addClass("wall");
            } else if (map[row][col] == 3) {
                $(`#b-${row}-${col}`).addClass("obj");
            } else if (map[row][col] == 4) {
                $(`#b-${row}-${col}`).addClass("exit");
            } else {
                $(`#b-${row}-${col}`).addClass("road");
            }
        }
    }
}

// 生食物 亂數放置食物隨機將地板變成3
function genObj() {
    var count = 0
    do {
        var row = Math.floor(Math.random() * rows)
        var col = Math.floor(Math.random() * cols)
        if (map[row][col] != 1 && map[row][col] != 3 && map[row][col] != 4 && row != player[row] && col != player[col]) {
            map[row][col] = 3
            count++
        }
    }
    while (count < objCount)

    var sort_count = 0
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

            if (map[row][col] == 3) {
                console.log('i found gift!')
                $(`#b-${row}-${col}`).addClass(`type_${type_sort[sort_count]}`);
                $(`#b-${row}-${col}`).addClass(`unique_${sort_id[sort_count]}`);
                sort_count++
            } else {

            }
        }
    }
}

// 初始化腳色位置
var random_player = Math.floor(Math.random() * 2) + 1
initPlayer()

function initPlayer() {

    $(`#b-${player[0]}-${player[1]}`).addClass("player")
    $(`#b-${player[0]}-${player[1]}`).addClass(`player_${random_player}`)
}

$(document).keydown(function (e) {

    //   上38下40左37右39
    var x = 0,
        y = 0
    console.log('popup', popup)
    if (popup == 0) {
        if (e.keyCode == 38) {
            console.log('向上')
            y = -1
        } else if (e.keyCode == 40) {
            console.log('向下')
            y = 1
        } else if (e.keyCode == 37) {
            console.log('向左')
            x = -1
        } else if (e.keyCode == 39) {
            console.log('向右')
            x = 1
        } else {}

    }
    var moveX = 0
    var moveY = 0
    moveX = player[1] + x
    moveY = player[0] + y
    if (get < 11) {
        movement(moveX, moveY)
    }
    console.log(player)
});
console.log(map)




$('.modal').click(function () {
    popup = 0;
})
var btns = document.querySelectorAll(".btn-success")
console.log(btns)
btns.forEach(function (element) {
    element.onclick = function () {
        console.log('i click modal')
        popup = 0;
    }
})


function movement(moveX, moveY) {
    if (moveX >= 0 && moveX < cols && moveY >= 0 && moveY < rows && map[moveY][moveX] != 1) {
        player = [moveY, moveX]
        $('.road').removeClass('player')
        $('.obj').removeClass('player')
        $('.exit').removeClass('player')
        $(`#b-${moveY}-${moveX}`).addClass("player")
        $(`#b-${moveY}-${moveX}`).addClass(`player_${random_player}`)
        if (map[moveY][moveX] == 3) {


            map[moveY][moveX] = 0
            get++
            popup = 1

            console.log(typeof ($(`#b-${moveY}-${moveX}`).attr('class')))
            var cut = $(`#b-${moveY}-${moveX}`).attr('class').split(' ')
            console.log("cut" + cut[2].split('_')[1])
            var popmodal = cut[2].split('_')[1]
            $(`#modal_${popmodal}`).modal({
                show: true,
                backdrop: 'static'
            })
            $(`#b-${moveY}-${moveX}`).removeClass("obj")
            $(`#b-${moveY}-${moveX}`).addClass("road")
            console.log(get)
            if (get > 0 && get < objCount) {
                console.log(`吃了${get}個`)
            } else if (get >= objCount) {
                $('.exit').addClass('ready')
                console.log(`全部吃完了`)
            }

            console.log('get obj')
        } else if (map[moveY][moveX] == 4) {
            if ($('.exit').hasClass('ready')) {
                get++
                $('.exit').removeClass('player')
                console.log('byebye')
                $("#endModal").modal({
                    show: true,
                    backdrop: 'static'
                })
            }
        }
    } else {
        console.log("撞到牆")

    }
}


// const area = document.getElementById('touchControl');
// const data = {
//     value: 1
// };
// const touchThreshold = 20;

// new TouchSweep(area, data, touchThreshold);


// area.addEventListener('swipeleft', event => {
//     movement(player[1] - 1, player[0])
//     console.log("You have swiped left")
// });

// area.addEventListener('swiperight', event => {

//     movement(player[1] + 1, player[0])
//     console.log("You have swiped right")
// });

// area.addEventListener('swipedown', event => {

//     movement(player[1], player[0] + 1)
//     console.log("You have swiped down")
// });

// area.addEventListener('swipeup', event => {
//     movement(player[1], player[0] - 1)
//     console.log("You have swiped up")
// })

// vue實體 處理彈出視窗的部分
var vm = new Vue({
    el: '#app',
    data: {
        intros: []
    },
    methods: {
        popup: function () {
            console.log('this is popup:', popup)
            popup = 0;

            // $('#init-modal').modal('hide')
            $("#init-modal").modal({
                show: false,
                backdrop: 'static'
            })
        }
    },
    mounted() {
        $("#initModal").modal({
            show: true,
            backdrop: 'static'
        })

        axios
            .get('./game-api.json')
            .then((res) => {
                datas = shuffle(res.data);

                for (let index = 0; index < datas.length; index++) {
                    // console.log(index)
                    datas[index].id = index + 1

                    switch (datas[index].category) {
                        case '越南飲食':
                            datas[index].type_id = 1
                            break;
                        case '越南服飾':
                            datas[index].type_id = 2
                            break;
                        case '越南藝術':
                            datas[index].type_id = 3
                            break;
                        case '越南建築':
                            datas[index].type_id = 4
                            break;
                        case '越南自然景觀':
                            datas[index].type_id = 5
                            break;
                        case '越南城市':
                            datas[index].type_id = 6
                            break;
                        default:
                            break;
                    }

                }
                console.log('vue: ', datas)

                this.intros = datas

                for (let i = 0; i < 10; i++) {

                    type_sort.push(datas[i].type_id)
                    sort_id.push(datas[i].id)

                }

                console.log(type_sort, sort_id)
                // 畫地圖
                genMaze()

                // this.randomCard()

            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
    }
})