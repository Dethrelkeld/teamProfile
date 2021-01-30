const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { prompt } = require("inquirer");

function createTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR) 

    } fs.writeFileSync(outputPath, render(team), "utf8");
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const team = [];

const idArray = [];



const manQ = [
    {
        type: "input",
        name: "manName",
        message: "What is the manager's name?",
        validate: answer => {
            if (answer !== "") {
                return true;
            } return "Please enter your name";
        },
    },
    {
        type: "input",
        name: "manId",
        message: "What is the manager's id#?",
        validate: answer => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
                return true;
            } return "Please enter a four digit number";
        },
    },
    {
        type: "input",
        name: "manEmail",
        message: "What is the manager's email?",
        validate: answer => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
                return true;
            } return "Please enter a vaild email";
        },
        
    },
    {
        type: "input",
        name: "manNumber",
        message: "What is the manager's office number?",
    },
];

const engQ = [
    {
        type: "input",
        name: "engName",
        message: "What is the engineer's name?",
    },
    {
        type: "input",
        name: "engId",
        message: "What is the engineer's id#?",
    },
    {
        type: "input",
        name: "engEmail",
        message: "What is the engineer's email?",
    },
    {
        type: "input",
        name: "engGit",
        message: "What is the engineer's Github?",
    },
];

const intQ = [
    {
        type: "input",
        name: "intName",
        message: "What is the intern's name?",
    },
    {
        type: "input",
        name: "intId",
        message: "What is the intern's id#?",
    },
    {
        type: "input",
        name: "intEmail",
        message: "What is the intern's email?",
    },
    {
        type: "input",
        name: "intSchool",
        message: "What is the intern's school?",
    },
];

const role = [
    {
        type: "list",
        name: "roleJob",
        message: "What is the role of this employee?",
        choices: ["Intern", "Engineer", "Manager", "No new Employees"],

    },
];

function quest() {

    inquirer.prompt(role).then(function (answers) {

        switch (answers.roleJob) {
            case "Intern":
                inquirer.prompt(intQ).then(function (answers) {
                    const intern = new Intern(answers.intName, answers.intId, answers.intEmail, answers.intSchool);
                    team.push(intern);
                    quest();
                });
                break;
            case "Engineer":
                inquirer.prompt(engQ).then(function (answers) {
                    const engineer = new Engineer(answers.engName, answers.engId, answers.engEmail, answers.engGit);
                    team.push(engineer);
                    quest();
                });
                break;
            case "Manager":
                inquirer.prompt(manQ).then(function (answers) {
                    const manager = new Manager(answers.manName, answers.manId, answers.manEmail, answers.manNumber);
                    team.push(manager);
                    quest();
                });
                break;
            default:
                createTeam();


        };
    });
};

quest();





// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
