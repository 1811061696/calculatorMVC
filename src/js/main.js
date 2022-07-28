class Model {
    constructor() {
        (this.ARR_NUMBER_BUTTON = [
            {
                name: "7",
                text: 7,
                class: "number"
            },
            {
                name: "8",
                text: 8,
                class: "number"
            },
            {
                name: "9",
                text: 9,
                class: "number"
            },
            {
                name: "mul",
                text: "*",
                class: "math"
            },
            {
                name: "4",
                text: 4,
                class: "number"
            },
            {
                name: "5",
                text: 5,
                class: "number"
            },
            {
                name: "6",
                text: 6,
                class: "number"
            },
            {
                name: "add",
                text: "+",
                class: "math"
            },
            {
                name: "1",
                text: 1,
                class: "number"
            },
            {
                name: "2",
                text: 2,
                class: "number"
            },
            {
                name: "3",
                text: 3,
                class: "number"
            },
            {
                name: "sub",
                text: "-",
                class: "math"
            },
            {
                name: "0",
                text: 0,
                class: "number"
            },
            {
                name: "poin",
                text: ".",
                class: "poin"
            },
            {
                name: "div",
                text: "/",
                class: "math"
            },
            {
                name: "AC",
                text: "AC",
                class: "clear"
            },
            {
                name: "equal",
                text: "=",
                class: "equal"
            },
        ]),

        // khởi tạo các dữ liệu ban đầu
        (this.calculation = []),
        (this.start = 0),
        (this.starttResult = 0),
        (this.lastResult = 0);
    };


    addToQuere = (start) => {
        this.calculation.push(start);
    }

    // clear
    clearAll = () => {
        this.calculation = []
        this.start = 0;
        this.starttResult = this.start
    };

    // get number
    getNumberButton(number) {
        if(this.lastResult != 0) {
            // check điều kiện click khi đang tồn tại  lastResult
            if(this.start !== "+" || this.start !== "-" || this.start !== "*" || this.start !== "/"){
                this.start = 0;
                this.starttResult = this.start
                this.lastResult = 0;
            }
        }
        
        // resest start
        if(this.start === "ERROR" || (this.start == "0" && number != ".")){
            this.start = "";
            this.starttResult = this.start
        }



        // kiểm tra giá trị nhập vào ban đầu khác (.) và kiểm tra trong mảng đã tồn tại dấu (.) hay chưa
        if(!(number === ".") || !this.start.match(/[.]/)) {
            this.start += number;
            this.starttResult = this.start;
        }
    };


    getMathButton = (math) => {
        if(this.start !== 0 && this.start !== "-") {
            this.start = parseFloat(this.start);
            this.addToQuere(this.start);
            this.addToQuere(math)
            this.start += math;
            this.starttResult = this.start
            this.start = 0;
        }
        // kiểm tra toán tử nhập vào và kiểm tra kiểu dữ liệu phần tử đầu tiên của mảng
        if(math == "-" && isNaN(this.calculation[0]) && this.start !== "-") {
            this.start = "-";
            this.starttResult = this.start;
        }
    }
 
    // nhận kết quả
    getResult = () => {
        return this.starttResult;
    }

    calculateQueue = (value) => {

        if(this.start !== 0) {
            this.start = parseFloat(this.start);
            this.addToQuere(this.start);
        }

        var result = value[0];
        console.log(value)
        
        var check = 0;


        // ckeck độ dài của calculation 
        if(value.length > 2 ) {        
            //  bắt đầu chạy từ vị trí t2 trong mảng, điểm dừng là độ dài của mảng, bước nhảy 2s
            for (let i = 2; i < value.length; i = i + 2) {

                // this.calculation[i - 1] lấy ra toán tử trong mảng
                switch(this.calculation[i - 1]){
                    case "+":
                        result += value[i];
                        break;
                    case "-":
                        result -= value[i];
                        break;
                    case "*":
                        result *= value[i];
                        break;
                    case "/":
                        if(value[i] === 0){
                            check = 1;
                            this.clearAll();
                            this.start = "ERROR";
                            this.starttResult = this.start;
                        }
                        else{
                            result = result / value [i];
                        }
                        break;
                }
                this.lastResult = result
            }

            result = result.toFixed(4) 
            result = parseFloat(result)

            if(check !== 1) {
                this.start = result;
                console.log("start:", this.start)

                this.starttResult = this.start;
                console.log("startResult: ", this.start)

                console.log("calculation: ", this.calculation)
                this.calculation = [];

            }

        }

        // khi độ dài của calculation < 2
        else
        {
            this.start = value [0];
            console.log("start:", this.start)

            this.starttResult = this.start;
            console.log("startResult", this.starttResult)

            this.lastResult = this.starttResult;
            console.log("lastResult", this.lastResult)

            console.log("calculation:" , this.calculation)
            this.calculation = []
        }
    }

}






class View {
    constructor() {
        // khung hiển thị
        this.app = this.createElement("div", "app");
        this.calculator = this.createElement("div","calculator");
        this.screen = this.createElement("div", "result");
        this.button = this.createElement("div", "form-button");
        this.header = this. createElement("header");
        this.header.textContent = "Máy tính đơn giản"
        this.calculator.append(this.screen, this.button); // nối các phần tử con lại với nhau
        this.app.append(this.header, this.calculator);
        document.body.append( this.app);
    }

    
    updateScreen = (value) => {
        this.screen.textContent = value;
    };

    // hàm tạo element
    createElement(tag, className) {
        const element = document.createElement(tag);
        if(className) element.classList.add(className);
        return element;
    };

    // render button UI
    render(buttons) {
        buttons.forEach((button) => {
            this.button.innerHTML += `<button 
                id="${button.name}" 
                class="${button.class}"
                value="${button.text}"
                >
                ${button.text}
                </button>`
        });
    }


    // bắt sự kiện khi người dùng click vào số và dấu (.)
    bindNumberAndPoint = (handler) => {
        this.button.addEventListener("click" , (event) => {
            if(event.target.className === "number" || event.target.className === "poin") {
                const keyValue = event.target.value;
                handler(keyValue); // callBack
            }
        })
    }


    // bắt sự kiện khi người dùng clcik vào các toán tử
    bindMathButton = (handler) => {
        this.button.addEventListener("click", (event) => {
            if(event.target.className === "math") {
                const keyValue = event.target.value;
                handler(keyValue); // call back
            }
        })
    }


    // bắt sự kiện khi người dùng nhấn vào nút AC
    bindClear = (handle) => {
        this.button.addEventListener("click", (event) => {
            if(event.target.className === "clear") {
                handle(); // callback
            }
        })
    }

    // bắt sự kiện khi click vào dấu (=)
    bindCalculate = (handle) => {
        this.button.addEventListener("click" , (event) => {
            if(event.target.className === "equal") {
                handle() // call back
            }
        })
    }
}




class Controller {
    constructor(model, view){
        this.model = model
        this.view = view
        this.view.render(this.model.ARR_NUMBER_BUTTON);
        this.view.bindNumberAndPoint(this.handleButtonAndPoint)
        this.view.bindMathButton(this.handleButtonMath);
        this.view.bindClear(this.handleClear);
        this.view.bindCalculate(this.handleCalculate);
    }


    // sử lý sự kiện khi người dùng click vào các number
    handleButtonAndPoint = (number) => {
        this.model.getNumberButton(number);
        this.view.updateScreen(this.model.getResult())
    }

    // sử lý sự kiện khi người dùng click vào các toán tử
    handleButtonMath = (math) => {
        this.model.getMathButton(math);
        this.view.updateScreen(this.model.getResult())
    }

    // sử lý khi người dùng nhấn nút AC
    handleClear = () => {
        this.model.clearAll()
        this.view.updateScreen(this.model.getResult())
    }

    // sử lý hoạt động tính toán
    handleCalculate = ()  => {
        this.model.calculateQueue(this.model.calculation)
        this.view.updateScreen(this.model.getResult())
    }
}


const app = new Controller(new Model(), new View());
const app2 = new Controller(new Model(), new View());
const app3 = new Controller(new Model(), new View());