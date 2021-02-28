const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let mainArr = [];

// Starting user questions here
// Manager or not
const confirmManager = [{
    type: 'confirm',
    name: 'Manager',
    message: 'Are you a manager?'
}];
const managersInfo = [{
    type: "input",
    name: "managers_name",
    message: "What is your name?"
},
{
    type: "input",
    name: "managers_id",
    message: "What is your id?"
},
{
    type: "input",
    name: "managers_email",
    message: "What is your email?"
},
{
    type: "input",
    name: "managers_officeNumber",
    message: "What is your office phone number?"
}
];
const newManagersInfo = [{
    type: "input",
    name: "new_managers_name",
    message: "What is your manager's name?"
},
{
    type: "input",
    name: "new_managers_department",
    message: "What is your manager's department?"
},
{
    type: "input",
    name: "new_managers_id",
    message: "What is your manager's id?"
},
{
    type: "input",
    name: "new_managers_email",
    message: "What is your manager's email?"
},
{
    type: "input",
    name: "new_managers_officeNumber",
    message: "What is your manager's office phone number?"
}
];
const engineerQuestions = [{
    type: "input",
    name: "engineers_name",
    message: "What is your engineer's name?"
},
{
    type: "input",
    name: "engineers_id",
    message: "What is your engineer's id?"
},
{
    type: "input",
    name: "engineers_email",
    message: "What is your engineer's email?"
},
{
    type: "input",
    name: "engineers_gitHub",
    message: "What is your engineer's GitHub username?"
}
];
const internQuestions = [{
    type: "input",
    name: "interns_name",
    message: "What is your intern's name?"
},
{
    type: "input",
    name: "interns_id",
    message: "What is your intern's id?"
},
{
    type: "input",
    name: "interns_email",
    message: "What is your intern's email?"
},
{
    type: "input",
    name: "interns_school",
    message: "What is your intern's school?"
}
];
const list = [{
    type: "list",
    name: "teamMember_type",
    choices: ["Engineer", "Intern", "I don't want to add any more team members"],
    message: "Select the role to add in your team?"
}];

// Prints the manager question and add manager check later
// If statements to connect every functions for the promt above
inquirer.prompt(confirmManager).then(ans => {
    if (ans.Manager === true) {
        promptManager();
    } else {
        promptMyManager();
    }
});


// Depends on the user choice it will give different set of the promt questions from above
const promptNext = () => {
    inquirer.prompt(list).then(data => {
        switch (data.teamMember_type) {
            case "Engineer":
                promptEngineer();
                break;
            case "Intern":
                promptIntern();
                break;
        }
    });
}

// Funtions for guiding users to register a new manager if the user selects no to the manager question
// Ofc if the answer is yes then it guids to the next promt
const promptManager = () => {
    inquirer.prompt(managersInfo).then(ans => {
        console.log(ans);
        mainArr.push(new Manager(ans.managers_name, ans.managers_id, ans.managers_email, ans.managers_officeNumber));
        promptNext();
    });
};
const promptMyManager = () => {
    inquirer.prompt(newManagersInfo).then(ans => {
        console.log(ans);
        mainArr.push(new Manager(ans.managers_name, ans.managers_id, ans.managers_email, ans.managers_officeNumber));
        promptNext();
    });
};

// Function for engineer sets of promts
const promptEngineer = () => {
    inquirer.prompt(engineerQuestions).then(ans => {
        console.log(ans);
        mainArr.push(new Engineer(ans.engineers_name, ans.engineers_id, ans.engineers_email, ans.engineers_gitHub));
        promptNext();
    });
};

// Function for intern sets of promts
const promptIntern = () => {
    inquirer.prompt(internQuestions).then(ans => {
        console.log(ans);
        mainArr.push(new Intern(ans.interns_name, ans.interns_id, ans.interns_email, ans.interns_school));
        promptNext();
    });
};


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
