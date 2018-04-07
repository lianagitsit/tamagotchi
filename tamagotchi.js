var inquirer = require('inquirer');
var pal = process.argv[2];
var command = process.argv[3];

function digitalPal(){
    this.hungry = false;
    this.sleepy = false;
    this.bored = true;
    this.age = 0;

    this.feed = function(){
        if (this.hungry){
            console.log("That was yummy");
            this.hungry = false;
            this.sleepy = true;
        } else {
            console.log("No thanks! I'm full.");
        }
    }
    
    this.sleep = function(){
        if (this.sleepy){
            console.log("Zzzzzz");
            this.sleepy = false;
            this.bored = true;
            this.increaseAge();
        } else {
            console.log("No way! I'm not tired.");
        }
    }

    this.play = function(){
        if (this.bored){
            console.log("Yay! Let's play!");
            this.bored = false;
            this.hungry = true;
        } else {
            console.log("Not right now. Later?");
        }
    }

    this.increaseAge = function(){
        this.age += 1;
        console.log("Happy birthday to me! I am "+this.age+" old!");
    }
}

var dog = new digitalPal();

dog.outside = false;

dog.bark = function(){
    console.log("Woof! Woof!");
}

dog.goOutside = function(){
    if (this.outside){
        console.log("We're already outside though...");
    } else {
        console.log("Yay! I love the outdoors!");
        this.outside = true;
        this.bark();
    }
}

dog.goInside = function(){
    if (this.outside){
        console.log("Do we have to? Fine...");
        this.outside = false;
    } else {
        console.log("I'm already inside...");
    }
}

var cat = new digitalPal();

cat.houseCondition = 100;

cat.meow = function(){
    console.log("Meow! Meow!");
}

cat.destroyFurniture = function(){
    if (this.houseCondition <= 0){
        return;
    }
    this.houseCondition -= 10;
    console.log("MWAHAHAHA! TAKE THAT FURNITURE!");
    this.bored = false;
    this.sleepy = true;
}

cat.buyNewFurniture = function(){
    this.houseCondition += 50;
    console.log("Are you sure about that?");
}

inquirer.prompt([
    {
        type: "list",
        message: "Which pal do you choose?",
        choices: ["dog", "cat"],
        name: "pal"
      }
]).then(inquirerResponse => {
    if (inquirerResponse.pal === "dog"){
        let pal = dog;

        inquirer.prompt([
            {
                type: "list",
                message: "What would you like to do with your pal?",
                choices: ["Go inside", "Go outside", "Feed", "Sleep", "Play"],
                name: "stuffToDo"
            }
        ]).then(inquirerResponse2 => {
            let action = inquirerResponse2.stuffToDo;
            switch(action){
                case "Go inside":
                    pal.goInside();
                    break;
                case "Go outside":
                    pal.goOutside();
                    break;
                case "Feed":
                    pal.feed();
                    break;
                case "Sleep":
                    pal.sleep();
                    break;
                case "Play":
                    pal.play();
                    break;
            }
        })
    } else if (inquirerResponse.pal === "cat"){
        let pal = cat;

        inquirer.prompt([
            {
                type: "list",
                message: "What would you like to do with your pal?",
                choices: ["Destroy furniture", "Buy new furniture", "Feed", "Sleep", "Play"],
                name: "stuffToDo"
            }
        ]).then(inquirerResponse2 => {
            let action = inquirerResponse2.stuffToDo;
            switch(action){
                case "Destroy furniture":
                    pal.destroyFurniture();
                    break;
                case "Buy new furniture":
                    pal.buyNewFurniture();
                    break;
                case "Feed":
                    pal.feed();
                    break;
                case "Sleep":
                    pal.sleep();
                    break;
                case "Play":
                    pal.play();
                    break;
            }
        })
    }
})
