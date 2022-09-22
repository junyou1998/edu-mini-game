let vm = new Vue({
    el: '#app',
    data:{
        question: "蘋果",
        answer: ["A","P","P","L","E"],
        elements: [],
        reply: [],
        msg: '',
        complete: false
    },
    methods:{
        shuffle(array){
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            if(JSON.stringify(array) === JSON.stringify(this.answer)){
                return this.shuffle(array)
            }else{
                return array
            }
        },
        use(index){
            temp = this.elements[index]
            this.reply.push(temp)
            this.elements.splice(index,1)
            window.navigator.vibrate(200); 
            if(JSON.stringify(this.reply)===JSON.stringify(this.answer)){
                this.msg = "你好棒棒"
                this.complete = true
            }
        },
        back(index){
            if(!this.complete){
                temp = this.reply[index]
                this.elements.push(temp)
                this.reply.splice(index,1)
                window.navigator.vibrate(200); 
            }else{
                this.msg = "已經答對囉"
                window.navigator.vibrate(500); 
            }

        }
    },
    mounted(){
        this.elements = this.shuffle(Array.from(this.answer))
    }
})