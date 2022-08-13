var datas = {}
var cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let count = 12;

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


let vm = new Vue({
    el: '#app',
    data: {
        intros: []
    },
    methods: {
        randomCard: function () {
            this.$nextTick(() => {
                cards = document.querySelectorAll('.card')

                cards.forEach(card => {
                    let randomPos = Math.floor(Math.random() * 12);
                    card.style.order = randomPos;

                })

                cards.forEach(card => card.addEventListener('click', flipCard));



                $('.modal button').click(function () {
                    console.log('modal btnnn click')
                    if (count <= 0) {
                        $("#endModal").modal({
                            show: true,
                            backdrop: 'static'
                        })
                    }

                })
                $('.modal').click(function () {
                    if (count <= 0) {
                        $("#endModal").modal({
                            show: true,
                            backdrop: 'static'
                        })
                    }

                })


            })
        }
    },
    mounted() {
        $("#initModal").modal({
            show: true,
            backdrop: 'static'
        })

        axios
            .get('../data/flipcard.json')
            .then((res) => {
                datas = shuffle(res.data);

                for (let index = 0; index < datas.length; index++) {
                    // console.log(index)
                    datas[index].id = index + 1
                }

                this.intros = datas

                this.randomCard()

            })
            .catch(function (error) { // 
                console.log(error);
            });


    }
})


function flipCard() {

    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlippedCard) {
        //第一次點
        hasFlippedCard = true;
        firstCard = this;
    } else {
        //第二次點
        secondCard = this;
        console.log({
            firstCard,
            secondCard
        })

        //檢查484相同的
        checkForMatch();

    }


}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    count = count - 2;

    if (count <= 0) {
        document.querySelector('#status').innerText = "太棒了 遊戲結束!"
        console.log('遊戲結束啦!!');

    }

    resetBoard();

}


function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();

    }, 500);

}


function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

}


function checkForMatch() {

    if (firstCard.dataset.name === secondCard.dataset.name) {
        //如果兩張一樣的話
        console.log(firstCard.dataset.name)
        $(`#modal_${firstCard.dataset.name}`).modal({
            show: true,
        })
        document.querySelector('#status').innerText = "Bingo!"
        disableCards();
        console.log('count: ', count)

    } else {
        //如果兩張不同的話
        document.querySelector('#status').innerText = "翻錯啦!"
        unFlipCards();

    }

}
