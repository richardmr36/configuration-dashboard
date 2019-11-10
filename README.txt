This README file explains what the configuration-dashboard application is and how to run it in the local server.

TITLE: Configuration Dashboard

SUMMARY: This is a dashboard application in React with Bootstrap CSS to show all the JSON configurations available, view, modify and delete them if required. When the app loads for the first time, the application.conf file of dashboard-configuration-server is parsed as JSON and displayed.


-- PREREQUISITES --

1. Node JS Runtime, v6.10.1 or higher
2. Node Package Manager, v3.10.10 or higher


-- INSTALLING THE DEPENDENCIES --

1. Navigate to the root folder configuration-dashboard.
2. Run `npm install`


-- RUNNING THE APPLICATION --

Run `npm start` and application will be live in the default local URL (http://localhost:3000)
Please note that configuration-dashboard-server should be running for the dashboard to load the default configuration.


-- API ENDPOINT CONFIGURATION --

Server API base URL is configured in api-config.js. By default it takes the host which `npm start` refers to and the port is set to 9000


-- USER INTERFACE GUIDE --

This is a Single Page Application where the page is divided into two sections. The left section shows the list of available configurations and the right section displays the JSON in tree structure which is selected to view.

LEFT SECTION: 

The list of configuration is shown in table view which shows the name of the configuration, option to view the configuration in the right section in tree structure and option to delete the whole configuration.

RIGHT SECTION: 

The JSON tree structure shown in right section can be modified on clicking the value. When you click the value, a textbox appears in the place of the value with current value populated and with Cancel and Add option. You can edit the value and press Enter or click on Add to apply the changes. To discard the changes, simply click on Cancel. To delete the whole key-value, click on `-` symbol which is present at the end of each value. If there is no `-` symbol present, then the key-value is read-only and cannot be modified. To add a new key-value, click the `+` symbol at the closing brace `}` or `]`. 

Once all the modifications are done for the configuration, click on Add or Update button at the top of the right section to save it to the database and it gets available in the left section to view or delete. To add a new configuration in the middle of modifications of some other configuration, click on `Click here to Add` link in the left section and the right section shows an empty configuration. Please note that the unsaved modifications i.e. JSON modified but not clicked on Add or Update will be lost when you click on `Click here to Add`

The readonly properties are read only once on pageload. Hence if subsequent updates are made on readonly property keys with its API, then the UI has to be reloaded to bring them into effect. This is done on purpose under the assumption that the readonly properties will be usually a one-time configuration.


-- JSON STRUCTURE EXPLAINED --

Each JSON needs to have a ConfigId key which is used as its primary key and ConfigName is used to display the name in the dashboard table. You will not be able to create or update a configuration without these two keys.

To add another JSON as value for a key, type `{}` in the textbox and click Add or press Enter. Now you will get `+` symbol with which you will be able to add keys under that JSON. In the same way, to add an array, type `[]`.





