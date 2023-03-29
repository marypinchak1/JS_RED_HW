// 1. Create a class "Client" with properties "name", "account number", and "balance", and methods for getting balance and withdrawing money from the account.
class Client {
  constructor(
    name,
    accountNumber,
    balance,
    interestRate = null,
    creditLimit = null,
    accountType
  ) {
    this.name = name;
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.interestRate = interestRate;
    this.creditLimit = creditLimit;
    this.accountType = accountType;

    if (this.accountType === "Credit Account") {
      this.creditAccount = new CreditAccount (this.name, this.accountNumber, this.balance, this.creditLimit);
    } else if (this.interestRate != null) {
      // create a new instance of DepositAccount
      this.depositAccount = new DepositAccount(this.name, this.accountNumber, this.balance, this.interestRate);
    }
  }
  
  getBalance() {
    return this.balance;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log("Insufficient funds");
    } else {
      this.balance -= amount;
      console.log(
        `Successfully withdrew ${amount} from account ${this.accountNumber}`
      );
    }
  }
}

// 2. Create a class "Account" with properties "account number" and "balance", and a method for withdrawing money from the account.
class Account {
  constructor(accountNumber, balance) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log("Insufficient funds");
    } else {
      this.balance -= amount;
      console.log(
        `Successfully withdrew ${amount} from account ${this.accountNumber}`
      );
    }
  }
}

// 3. Create a class "CreditAccount" that extends Account with a "credit limit" property, and methods for withdrawing money from the account and the credit limit.
class CreditAccount extends Account {
  constructor(accountNumber, balance, creditLimit) {
    super(accountNumber, balance);
    this.creditLimit = creditLimit;
  }

  withdraw(amount) {
    if (amount > this.balance + this.creditLimit) {
      console.log("Insufficient funds");
    } else if (amount > this.balance) {
      const amountFromCredit = amount - this.balance;
      this.balance = 0;
      this.creditLimit -= amountFromCredit;
      console.log(
        `Successfully withdrew ${amount} (with ${amountFromCredit} from credit) from account ${this.accountNumber}`
      );
    } else {
      this.balance -= amount;
      console.log(
        `Successfully withdrew ${amount} from account ${this.accountNumber}`
      );
    }
  }
}

// 4. Create a class "DepositAccount" that extends Account with an "interest" property, and a method for adding interest to the account balance.
class DepositAccount extends Account {
  constructor(accountNumber, balance, interestRate) {
    super(accountNumber, balance);
    this.interestRate = interestRate;
  }

  addInterest() {
    const interest = this.balance * (this.interestRate / 100);
    this.balance += interest;
    console.log(
      `Added ${interest} of interest to account ${this.accountNumber}`
    );
    
  }
}

// 5. Create a class "Bank" with properties "name" and an array of clients, and methods for adding a new client, removing a client, and checking a client's balance.
class Bank {
  constructor(name) {
    this.name = name;
    this.clients = [];
  }

  addClient(client) {
    this.clients.push(client);
    console.log(
      `Added client ${client.name} with account number ${client.accountNumber} to bank ${this.name}`
    );
  }

  removeClient(client) {
    const index = this.clients.indexOf(client);
    if (index === -1) {
      console.log("Client not found in bank");
    } else {
      this.clients.splice(index, 1);
      console.log(
        `Removed client ${client.name} with account number ${client.accountNumber} from bank ${this.name}`
      );
    }
  }

   getClientBalance(accountNumber) {
    const client = this.clients.find((c) => c.accountNumber === accountNumber);
    if (client) {
      console.log(
        `Balance of account ${accountNumber}: ${client.getBalance()}`
      );
    } else {
      console.log("Client not found in bank");
    }
  }
}
// *****START POINT OF THE APPLICATION*****
document.addEventListener("DOMContentLoaded", function () {
  // 6. Adding some clients with different types of accounts.

  // Create a new Bank object
  const myBank = new Bank("My Bank");

  // Create clients with different types of accounts
  const client1 = new Client(
    "Mariia Pinchak",
    "001",
    15000,
    "-",
    "-",
    "Regular Account"
  );
  const client2 = new Client(
    "Iryna Pec",
    "002",
    20000,
    "-",
    "-",
    "Regular Account"
  );
  const client3 = new Client(
    "Ihor Lialiuk",
    "003",
    40000,
    5,
    "-",
    "Deposit Account"
  );
  const client4 = new Client(
    "Vasyl Melko",
    "004",
    10000,
    5,
    "-",
    "Deposit Account"
  );
  const client5 = new Client(
    "Nazarii Kekosh",
    "005",
    5000,
    "-",
    2000,
    "Credit Account"
  );
  const client6 = new Client(
    "Ostap Vasylenko",
    "006",
    8000,
    "-",
    4000,
    "Credit Account"
  );

  // Add the clients to the bank
  myBank.addClient(client1);
  myBank.addClient(client2);
  myBank.addClient(client3);
  myBank.addClient(client4);
  myBank.addClient(client5);
  myBank.addClient(client6);

  // Get the HTML element for the bank div
  const bankDiv = document.getElementById("bank");

  // Create a table to display the client information
  const table = document.createElement("table");

  // Create the table header
  const headerRow = document.createElement("tr");
  headerRow.innerHTML =
    "<th>Name</th><th>Account Number</th><th>Balance, USD</th><th>Interest Rate, %</th><th>Credit Limit, USD</th><th>Account Type</th>";
  table.appendChild(headerRow);

  // Add each client to the table
  for (const client of myBank.clients) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${client.name}</td><td>${client.accountNumber}</td><td>${client.balance}</td><td>${client.interestRate}</td><td>${client.creditLimit}</td><td>${client.accountType}</td>`;
    table.appendChild(row);
  }

  // Add the table to the bank div
  bankDiv.appendChild(table);

  // 8. Demonstrate the functionality of the bank.

  // Get the balance of the client's account
  console.log(client1.getBalance()); // Output: 15000

  // Withdraw money from the client's account
  client3.withdraw(5000);
  console.log(client3.getBalance()); // Output: 35000

  // Remove a client from the bank
  myBank.removeClient(client5);

  // Get the balance of a client's account
  myBank.getClientBalance("007"); // Output: Client not found in bank

  // Add interest to the client's account
  client4.depositAccount.addInterest();
  console.log(client4.getBalance()); // Output: 10500
});
