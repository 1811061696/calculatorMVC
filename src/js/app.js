class Model {
    constructor() {
        (this.ARR_NUMBER_BUTTON = [
            {
                name: "7",
                text: 7,
                class: "number",
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
        // khai báo các dữ liệu ban đầu
        (this.calculation = []),
        (this.start = 0),
        (this.startResult = 0),
        (this.lastResult = 0);
    };

    // thêm giá trị vào mảng phép tính
    addToQueue = (start) =>  {
        this.calculation.push(start);
    };

    // resest 
    clearAll = () => {
        this.calculation = []
        this.start = 0;
        this.startResult = this.start;
    };

    // lấy ra các number
    getNumberButton = (number) => {
        // kiểm tra kết quả hiện tại
        if(this.lastResult != 0){
            this.clearAll();
            this.lastResult = 0;
        }

        
        if (this.start === "ERROR" || (this.start == "0" && number != ".")) {
            this.start = "";
            this.startResult = this.start;
        }

        // kiểm tra giá trị nhập vào có phải dấu (.) không và trong mảng đã có dấu (.) chưa
        if( !(number === ".") || !this.start.match('[.]')) {
            this.start += number;
            this.startResult = this.start
        }
    };

    // lấy các toán tử
    getMathButton = (math) => {
        if(this.start !==0 && this.start !=="-") {
            this.start = parseFloat(this.start);
            this.addToQueue(this.start);
            this.addToQueue(math)
            this.start += math
            this.startResult = this.start;
            this.start = 0
        }

        // kiểm tra toán tử nhập vào và kiểm tra kiểu dữ liệu phần tử đầu tiên của mảng
        if(math == "-" && isNaN(this.calculation[0]) && this.start !== "-" ) {
            this.start = "-";
            this.startResult = this.start;
        }
        
    };


   getResult = () => {
    return this.startResult;
   }

   // thực hiện tính toán
   calculateQueue = (value) => {
    if(this.start !== 0) {
        this.start = parseFloat(this.start)
        this.addToQueue(this.start)
    }

    var result = value[0];
    var ckeck = 0;

    //  bắt đầu chạy từ vị trí t2 trong mảng, điểm dừng là độ dài của mảng, bước nhảy 2
    for (var i = 2; i< value.length; i = i + 2 ){
        // calculation[i - 1] --> lấy ra toán tử trong mảng
        switch(this.calculation[i - 1]) {
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
                if(value[i] === 0 ){
                    ckeck = 1;
                    this.clearAll();
                    this.start = "ERROR";
                    this.startResult = this.start;
                }
                else{
                    result = result / value[i];
                }
                break;
            }
        this.lastResult = result;
    }

    result = result.toFixed(4);
    result = parseFloat(result);

    if(ckeck !==1 ){
        this.start = result;
        this.startResult  = this.start
        this.calculation = [];
    }
   };

}







class View {
    constructor() {
        // tạo khung hiển thị
      this.app = this.createElement("div", "app");// tạo các element
      this.calculator = this.createElement("div", "calculator");
      this.screen = this.createElement("div", "result");
      this.button = this.createElement("div", "form-button");
      this.calculator.append(this.screen, this.button);  // nối các element lại với nhau
      this.app.append(this.calculator); 
      document.body.appendChild(this.app); // hiển thị ra body
    }

    // hàm update giá trị
    updateScreen = (value) => {
      this.screen.textContent = value;
    };

    // tạo element
    createElement(tag, className) {
      const element = document.createElement(tag);
      if (className) element.classList.add(className);
      return element;  
    };


    // hàm render các nút
    render(buttons) {  
        buttons.forEach((button) => {
          this.button.innerHTML += `<button id="${button.name}" class="${button.class}"
          value = "${button.text}">${button.text}</button>`;
        });
      }

    // bắt sự kiện click cho các nút số và (.)
    bindNumberAndDot = (handler) => {
        this.button.addEventListener("click", (e) => {
          if (e.target.className === "number" || e.target.className === "poin") {
            const keyValue = e.target.value;
            handler(keyValue); // call back
          }
        });
    };


    // bắt sự kiện click cho nút AC
    bindClear = (handler) => {
        this.button.addEventListener("click", (e) => {
          if (e.target.className === "clear") {
            handler();
          }
        });
      };

      // bắt sự kiện click cho các toán tử
    bindOperation = (handler) => {
        this.button.addEventListener("click", (e) => {
          if (e.target.className === "math") {
            const keyValue = e.target.value;
            handler(keyValue);
          }
        });
      };

      // bắt sự kiện click cho nút =
      bindCalculate = (handler) => {
        this.button.addEventListener("click", (e) => {
          if (e.target.className === "equal") {
            handler();
          }
        });
      };
}





class Controller {
    constructor(model, view) {
        this.model= model;
        this.view = view;
        this.view.render(this.model.ARR_NUMBER_BUTTON); 
        this.view.bindNumberAndDot(this.handleButtonAndDot);
        this.view.bindClear(this.handleClear);
        this.view.bindOperation(this.handleOperation);
        this.view.bindCalculate(this.handleCalculate);
    }

    // sử lý hoạt động lấy number và (.)
    handleButtonAndDot = (char) => {
        this.model.getNumberButton(char);
        this.view.updateScreen(this.model.getResult());
    };

    // sử lý clear
    handleClear = () => {
        this.model.clearAll();
        this.view.updateScreen(this.model.getResult());
    };

    // sử lý hoạt động các toán tử
    handleOperation = (math) => {
        this.model.getMathButton(math);
        this.view.updateScreen(this.model.getResult());
    };

    // sử lý hoạt động tính toán
    handleCalculate = () => {
        this.model.calculateQueue(this.model.calculation);
        this.view.updateScreen(this.model.getResult());
    };  
}

const app = new Controller(new Model(), new View());
// const app1 = new Controller(new Model(), new View());
// const app2 = new Controller(new Model(), new View());
