/* Requiurements:
    ● Create a basic HTML file. You are required to create a budgeting website with the following specifications:
    ● Make use of session storage to store the values
*/

// Note: I would have preferred displaying Income and Expense statements in a table on the webpage,
// but eventually followed the instructions given in the task and displayed these information in the prompt boxes.

/* Create an income object where you can put in the following information as attributes:
    ○ Name, as a string (E.g. Salary)
    ○ The amount, as a number (E.g. 4000)
    ○ Whether or not it is recurring, as a boolean
*/

// create a blueprint of an income object
class Income {
    constructor(name, amount, recurring) {
        this.name = name
        this.amount = amount
        this.recurring = recurring
    }
}

// create a blueprint of an expenses object
class Expenses {
    constructor(name, amount, recurring) {
        this.name = name
        this.amount = amount
        this.recurring = recurring
    }
}

// Create 5 different objects to represent income from different places.
const initIncome = () => {
    return [
        new Income('Salary', 3000, false),
        new Income('Interest', 20, true),
        new Income('Dividend', 30, true),
        new Income('Rent', 600, true),
        new Income('Gift', 50, false)
    ]
}

// Create 5 different objects to represent different expenses.
const initExpenses = () => {
    return [
        new Expenses('HomeLoan', 1000, true),
        new Expenses('Grocery', 320, true),
        new Expenses('Travel', 50, true),
        new Expenses('Dineout', 280, false),
        new Expenses('Bills', 250, true)
    ]
}

// Using a prompt box, display the income items and let the user add another entry.
const displayIncome = () => {
    try {
        //Get the array of income objects from sessionStorage
        let incomeList = JSON.parse(sessionStorage.getItem("income"))
        if (incomeList == null) {
            incomeList = initIncome()
            // add intial incomeList to the sessionStorage
            sessionStorage.setItem("income", JSON.stringify(incomeList))
        }

        // Using a prompt box, display the income items and let the user add another entry.
        let newIncome = prompt(`Currnet Income items are: ${JSON.stringify(incomeList)}\n\nEnter new Income Entry (name, amount, recurring (true/false)):`)

        if (newIncome != "") {
            //add newIncome to the incomeList
            newIncome = newIncome.split(",")
            let newIncomeObj = new Income(newIncome[0].trim(), parseInt(newIncome[1].trim()), newIncome[2].trim())
            incomeList.push(newIncomeObj)

            // add updated incomeList to the sessionStorage
            sessionStorage.setItem("income", JSON.stringify(incomeList))
        }
        else {
            msg = "No input found for income entry"
            alert(msg)
            throw Error(msg)
        }
    }
    catch (error) {
        console.log(error)
    }
}

// Using a prompt box, display the expenses items and let the user add another entry.
const displayExpenses = () => {
    try {
        //Get the array of expense objects from sessionStorage
        let expenseList = JSON.parse(sessionStorage.getItem("expenses"))
        if (expenseList == null) {
            expenseList = initExpenses()
            // add intial expenseList to the sessionStorage
            sessionStorage.setItem("expenses", JSON.stringify(expenseList))
        }

        // Using a prompt box, display the expenses items and let the user add another entry.
        let newExpense = prompt(`Currnet Expence items are: ${JSON.stringify(expenseList)}\n\nEnter new Expence Entry (name, amount, recurring (true/false)):`)

        if (newExpense != "") {
            //add newExpense to the expenseList
            newExpense = newExpense.split(",")
            let newExpObj = new Expenses(newExpense[0].trim(), parseInt(newExpense[1].trim()), newExpense[2].trim())
            expenseList.push(newExpObj)

            // add updated expenseList to the sessionStorage
            sessionStorage.setItem("expenses", JSON.stringify(expenseList))
        }
        else {
            msg = "No input found for expenses entry"
            alert(msg)
            throw Error(msg)
        }
    }
    catch (error) {
        console.log(error)
    }
}

// Display the total amount of disposable income (income minus expenses)
// Using a prompt box, ask the user how much of their disposable income they would like to put into savings.
// Finally, create an alert to display the total amount of disposable income left.
const disposbleIncome = () => {
    let totalIncome = 0
    let totalExpenses = 0
    let incomeList = JSON.parse(sessionStorage.getItem("income"))
    let expenseList = JSON.parse(sessionStorage.getItem("expenses"))

    for (let item of incomeList) {
        totalIncome += item.amount
    }

    for (let item of expenseList) {
        totalExpenses += item.amount
    }

    let disposableIncome = totalIncome - totalExpenses
    let savings = prompt(`Your current disposable income is: ${disposableIncome}
    \n\nEnter the amount you would like to put into savings:`)

    alert(`Final disposable income is: ${disposableIncome - savings}`)
}

// This function will automatically called on the html page load
const onLoad = () => {
    displayIncome()
    displayExpenses()
    disposbleIncome()
}
