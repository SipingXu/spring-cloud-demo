const dbName = "piggymetrics";
const userName = "@ARANGO_USER_NAME@";
const password = "@ARANGO_USER_PASSWORD@";
const collections = ["accounts", "users", "recipients", "datapoints"];

function initDBAndCollections() {
    let dbList = db._databases();
    if (dbList.indexOf(dbName) >= 0) {
        return;
    }

    print("Create database and collections ...");
    db._createDatabase(dbName);
    db._useDatabase(dbName);
    collections.forEach(collection => db._create(collection));
    print("Done.");

    print("Loading data ...");
    const initData = [
        {
            "_key": "demo",
            "note": "demo note",
            "lastSeen": Date.now(),
            "expenses": [
                {
                    "amount": 1300,
                    "currency": "USD",
                    "icon": "home",
                    "period": "MONTH",
                    "title": "Rent"
                },
                {
                    "amount": 120,
                    "currency": "USD",
                    "icon": "utilities",
                    "period": "MONTH",
                    "title": "Utilities"
                },
                {
                    "amount": 20,
                    "currency": "USD",
                    "icon": "meal",
                    "period": "DAY",
                    "title": "Meal"
                },
                {
                    "amount": 240,
                    "currency": "USD",
                    "icon": "gas",
                    "period": "MONTH",
                    "title": "Gas"
                },
                {
                    "amount": 3500,
                    "currency": "EUR",
                    "icon": "island",
                    "period": "YEAR",
                    "title": "Vacation"
                },
                {
                    "amount": 30,
                    "currency": "EUR",
                    "icon": "phone",
                    "period": "MONTH",
                    "title": "Phone"
                },
                {
                    "amount": 700,
                    "currency": "USD",
                    "icon": "sport",
                    "period": "YEAR",
                    "title": "Gym"
                }
            ],
            "incomes": [
                {
                    "amount": 42000,
                    "currency": "USD",
                    "icon": "wallet",
                    "period": "YEAR",
                    "title": "Salary"
                },
                {
                    "amount": 500,
                    "currency": "USD",
                    "icon": "edu",
                    "period": "MONTH",
                    "title": "Scholarship"
                }
            ],
            "saving": {
                "amount": 5900,
                "capitalization": false,
                "currency": "USD",
                "deposit": true,
                "interest": 3.32
            }
        }
    ];

    db._query("FOR doc IN @initData INSERT doc INTO accounts", {"initData": initData});
    print("Done.");
}

function initPrivileges() {
    let users = require("@arangodb/users");
    if (!users.isValid(userName, password)) {
        try {
            users.remove(userName);
        }
        catch (error) {
            // Ignore the error
        }
        
        users.save(userName, password, true);
        users.grantDatabase(userName, dbName, "rw");
        users.grantCollection(userName, dbName, "*", "rw");
    }
}

initDBAndCollections();
initPrivileges();
