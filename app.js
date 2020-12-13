const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const arrayEmployees =[];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function employeeInfo() {
    console.log("Welcome, let's begin building your team!");
    inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: 'What is the role of your team member?',
        choices: ['Manager', 'Engineer', 'Intern', 'Finished/Save']
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the employee?',
        when: function(response) {
            return(response.role !== 'Finished/Save')}

      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the employees id number?',
        when: function(response) {
            return(response.role !== 'Finished/Save')}
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the employees email?',
        when: function(response) {
            return(response.role !== 'Finished/Save')}
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: 'Enter your Managers office number.',
        when: function(response) {
            return(response.role === 'Manager')}
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your Enginners GitHub username.',
        when: function(response) {
            return(response.role === 'Engineer')}
      },
      {
        type: 'input',
        name: 'school',
        message: 'Enter your Interns school.',
        when: function(response) {
            return(response.role === 'Intern')}
      },
    ])
    .then(function (response) {
        if(response.role === "Manager") {
            //if statement to create new manager card with relevant info
         const manager = new Manager(response.name, response.id, response.email, response.officeNumber); 
         //pushes new instance to employee array
         arrayEmployees.push(manager); 
         //calls the function again to add another member or exit
         employeeInfo();
        } else if (response.role === "Engineer") {
            //if statement to create new engineer card with relevant info
            const engineer = new Engineer(response.name, response.id, response.email, response.github); 
            //pushes new instance to employee array
            arrayEmployees.push(engineer); 
            //calls the function again to add another member or exit
            employeeInfo();
        } else if (response.role === "Intern") {
            //if statement to create new intern card with relevant info
            const intern = new Intern(response.name, response.id, response.email, response.school); 
            //pushes new instance to employee array
            arrayEmployees.push(intern); 
            //calls the function again to add another member or exit
            employeeInfo();
        } else {
            //on choosing Finished/Save, it will give the daving data feedback
            console.log("Saving data...")
            //calls create HTML function
            createHTML(); 
            }
       }); 
  };

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
employeeInfo();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
function createHTML(){
    //checks to see if an output folder already exists...if not, it makes one
    if(fs.existsSync("output") || fs.mkdirSync("output")); 
    //writes the HTML code to the HTML file
    fs.writeFileSync(outputPath, render(arrayEmployees), "utf-8");
    //added a comment to make it a little user-friendly
    console.log("Generating your team..."); 
}

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
