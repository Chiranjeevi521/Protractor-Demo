# Protractor-Demo

This repository contains basic protractor tests that are written using typescript

Pre requisites : 
1) install node js
2) open command prompt and perform 
    npm install -g webdriver-manager
    webdriver-manager start ( This will start selenium server in your local machine )

clone this repository and perform npm install



# Protractor Wiki

1)	Install Node JS from https://nodejs.org/en/ ( LTS version )
2)	Add environment variable for npm ( Ex : C:\Users\cadasa\AppData\Roaming\npm )
3)	Follow this URL to Install and run first test using protractor -- http://www.protractortest.org/#/tutorial 

# Typescript setup: 

1)	Install visual studio code from https://code.visualstudio.com/
2)	Install typescript globally using command : npm install typescript –g
3)	Create a project Folder ( Ex : Protractor_Demo )
4)	Creation of tsconfig.json
    a.	CMD into Protractor_Demo folder and type tsc –init
5)	Creation of package.json
    a.	CMD into Protractor_Demo folder and type npm init –f 
6)	Creation of task.json
    a.	CMD into Protractor_Demo folder and type code .  This will open visual studio code
    b.	Press F1 – This will open tasks list
    c.	Select Configure Task Runner
    d.	Replace “tasks” with below mentioned code
        "tasks": [
                {
                    "taskName": "TypeScript Compiler",
                    "command": "tsc -P tsconfig.json",
                    "type": "shell",
                    "args": [
                        "-w"
                    ]
                }
            ]
7)	Enabling Debugging
    a.	CMD into Protractor_Demo folder and type code .  This will open visual studio code
    b.	Press F1 – This will open tasks list
    c.	Type and Select Open launch.json
    d.	Replace “configurations” with below mentioned code 
        "configurations": [
                {
                    "type": "node",
                    "request": "launch",
                    "name": "Launch Program",
                    "program": "${workspaceRoot}\\node_modules\\protractor\\bin\\protractor",
                    "outFiles": [
                        "${workspaceRoot}/out/**/*.js"
                    ],
                    "args": [
                        "conf.js"
                    ]
                }
            ]

    e.	To debug your application use keyword F5

# Writing first test in type script: 
1)	Add dependencies for the project
    a.	CMD into Protractor_Demo folder
    b.	install protractor as a dependency using command :  npm i --D protractor
    c.	install types as a dependency using command : npm i –D @types/jasmine
2)	Create protractor.conf.ts file and add below mentioned code to it 
        import { Config, browser } from "protractor";
        export let config:Config = {

            //seleniumAddress : 'http://localhost:4444/wd/hub',
            directConnect : true,
            framework :"jasmine2",
            specs : ['protractor.spec.js'],
            jasmineNodeOpts : {

            },

        }

3)	Create protractor.spec.ts file and add below mentioned code to it 
        import { by,element,browser } from "protractor";
        describe("Test Angular Site", ()=>{
            beforeAll(()=>{

               browser.get('https://angularjs.org/');

            });

            it("Test Text Field", ()=>{

                expect<any>(browser.getTitle()).toBe('AngularJS — Superheroic JavaScript MVW Framework');

            });
            });
4)	Press F1 key  type Run task  hit enter  select option “TypeScript Compiler” – This task will compile your type script files into js files and wait for changes in ts files
5)	CMD into Protractor_Demo folder and type Protractor protractor.conf.js

# To Enable Logging (Winston): 
1)	Add dependencies for the project
    a.	CMD into Protractor_Demo folder
    b.	install Winston as a dependency using command :  npm i –D winston
    c.	install types as a dependency using command : npm i –D @types/winston
2)	Import Winston into your spec files ( Ex : import { log } from "winston"; )
3)	Wherever you need, just add a log ( Ex : log("info",'Successfully verified title'); )

# To Enable Jasmine Spec Reporter: 
1) Add dependencies for the project
    a.	CMD into Protractor_Demo folder
    b.	install Jasmine spec reporter as a dependency using command :  npm i –D jasmine-spec-reporter
2) Import Jasmine-spec-reporter into your conf file ( Ex : import { SpecReporter } from "jasmine-spec-reporter"; )
3) To display stack trace place below mentioned code 
        onPrepare: function () {
            jasmine.getEnv().addReporter(new SpecReporter({
              spec: {
                displayStacktrace: true
              }
            }));

# To Enable Jasmine Allure Reporter: 
1) Configuring Maven
    a.	To use Allure reports, we need a maven plugin
    b.	1. Download “ apache-maven-3.5.0-bin.zip “ maven from https://maven.apache.org/download.cgi site
        2. Add environment variable M2_HOME with the value as path to apache-maven-3.5.0 folder.
        3. Add environment path variable like %M2_HOME%\bin 
    c.	Open CMD and type mvn –verision  If you get version details, then maven configured successfully
2) Add dependencies to the project
    a.	CMD into Protractor_Demo folder
    b.	install allure-reporter as a dependency using command :  npm i –D jasmine-allure-reporter
3) To Get Allure Reporter XML Files : 
    a.	At protractor.conf.ts file import AllureReporter ( Ex : let AllureReporter = require('jasmine-allure-reporter'); )
    b.	Inside OnPrepare function add below mentioned code : 
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
            }));
    c.	Run the Protractor protractor.conf.js –> Test results will be saved as xml files inside Protractor_Demo/allure-results folder
4) To Get Screen shots : 
    a.	At protractor.conf.ts file, Inside OnPrepare function add below mentioned code : 
            jasmine.getEnv().afterEach(function(done){
              browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                  return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
              })
            });
    b.	Run the Protractor protractor.conf.js –> After completing the run, you can see both images and xml files
5)	To Generate Allure Reports : 
    a.	Go to Protractor-Demo\node_modules\jasmine-allure-reporter folder and copy pom.xml file
    b.	CMD into Protractor_Demo folder
    c.	Run command “mvn site -Dallure.results_pattern=allure-results”  It creates target folder which contains allure report
    d.	Open “ Protractor-Demo\target\site\allure-maven-plugin\index.html “ in firefox browser to see allure report
    e.	To share reports with other, we need to enable Jetty server and share through it. To enable, run command mvn jetty:run -           Djetty.port=8888


# Docker Setup: 

1)	Install docker  stable version from https://docs.docker.com/docker-for-windows/install/ 
2)	After installation, you need to logout and login – After login your system will reboot to enable Hyper-V mode
3)	After Reboot – Open Powershell any type docker info  -- You should get something like below
 

4)	Get selenium hub container using command docker pull selenium/hub
5)	Get Selenium chrome node debug container using command docker pull selenium/node-chrome-debug
6)	Get selenium firefox node debug container using command docker pull selenium/node-firefox-debug
7)	Start the selenium hub using command docker run -d -P --name selenium-hub selenium/hub
8)	Link the chrome node container using command docker run -d -P --link selenium-hub:hub selenium/node-chrome-debug
9)	Link the firefox node container using command docker run -d -P --link selenium-hub:hub selenium/node-firefox-debug

# Alternative way of setting up Docker Containers ( Using .yml file ) : 
1)	Docker Compose : 
    a.	Create docker-compose.yml file and add below mentioned code
        version: '2'

        services:
            Selgrid:
                image: selenium/hub:latest
                container_name: Selgrid
                privileged: true
                ports:
                    - 4444:4444
                environment:
                    - GRID_TIMEOUT=240000
                    - GRID_BROWSER_TIMEOUT=240000
                networks:
                    - w2agrid_grid_internal

            nodechrome:
                image: selenium/node-chrome-debug:latest
                privileged: true
                depends_on:
                    - w2agrid
                ports:
                    - 5900
                environment:
                    - no_proxy=localhost
                    - HUB_PORT_4444_TCP_ADDR=w2agrid
                    - HUB_PORT_4444_TCP_PORT=4444
                networks:
                    - w2agrid_grid_internal

            nodefirefox:
                image: selenium/node-firefox-debug:latest
                privileged: true
                depends_on:
                    - w2agrid
                ports:
                    - 5901  
                environment:
                    - no_proxy=localhost
                    - HUB_PORT_4444_TCP_ADDR=w2agrid
                    - HUB_PORT_4444_TCP_PORT=4444
                networks:
                    - w2agrid_grid_internal

        networks:
            w2agrid_grid_internal:  

    b.	Run compose file using command docker-compose up –d
# Docker Server Configuration in conf file : 
1)	In conf.js fie, enable selenium address. Since selenium port is configured as 4444, no changes required
2)	If you want to run tests on multiple browsers (ON Both the nodes) we should add below mentioned code to conf.js file
        multiCapabilities: [{
          'browserName': 'firefox'
        }, {
          'browserName': 'chrome'
        }] 

# To Check Running containers and to Delete Docker images: 
1)	To See all the running containers using command docker ps -aq
2)	To remove all the containers use command : docker rm $(docker ps -a -q)
3)	To remove all the images use command : docker rmi $(docker images -q)


# To Send Emails:

1) Install Nodemailer using command npm i -g nodemailer

2) Create mail.ts file 

        const nodemailer = require('nodemailer');
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
                user: 'chiranjeevi.protractor@gmail.com',
                pass: 'Planon@521'
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: 'chiranjeevi.protractor@gmail.com', // sender address
            to: 'chiranjeevi521@gmail.com', // list of receivers
            subject: 'Protractor Demo Results at http://localhost:8888', // Subject line
            text: 'Dear StakeHolders, Please see attachment for todays result', // plain text body
            html: '<b>Hello world ?</b>', // html body
            attachments: [{
                'filename' : 'Results.html',
                'filePath' : './allure-results/Results.xml'
            }]
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });

3) Create OnComplete method at conf file

        onComplete : function () {

            let stdout:ChildProcess.stdout;
            let stderr:ChildProcess.stderr;
            let error: ChildProcess.error;

            console.log ('Sending test result as email');
            puts(error, stdout,stderr);
            exec('node ./util/mail.js', puts);
          }


# Data Driven Testing (Reading data from Json file)

  # Reading data from data class (For Super Calculator): 

1) Create a dataprovide.ts file and create below mentioned code

        export class DataProvider {

                plusProvider() {
                    return [
                        {a: 2, b: 3, expected: '5'},
                        {a: '14', b: 15, expected: '29'},
                        {a: 12, b: '13', expected: '25'},
                        {a: '22', b: '13', expected: '35'},
                    ];
                }
        }

2) In your test import using block ( Ex : var using = require('jasmine-data-provider'); ) 

3) Create using block and send data to the app

            let dataprovider = new DataProvider();
                    let plusProvider = dataprovider.plusProvider();
            let calculatormainpage = new SupercalculatorMainPage();
                    let elementhelper = new ElementHelper();


                using(plusProvider,(data)=>{

                    it("Supercalculator Addition", ()=>{

                        calculatormainpage.addition(data.a,data.b)
                        browser.sleep(6000);
                        expect<any>(elementhelper.resultText().getText()).toEqual(data.expected);

                    });

                });
		

 # Reading data from the excel file (For Super Calculator): 

1) Install xlsx using command: npm i -D xlsx

2) Import the xlsx into your spec files (Ex : import { readFile, read, ColInfo, RowInfo } from "xlsx"; )

3) Create test.xlsx file and rename first sheet as "Test_Data" and add data into the cells

4) Send data to the app using for loop. Ex : 
             let workbook = readFile('./data_provider/test.xlsx');
                     let sheetname = 'Test_Data';
                        let target = workbook.Sheets[sheetname];
                        for ( var i=2; i<14; i++){
                            let finalresult = String(target["C"+i].v);
                         calculatormainpage.addition(target["A"+i].v, target["B"+i].v)
                         expect<any>(elementhelper.resultText().getText()).toEqual(finalresult);
                        }

# Jenkins Setup: 

1) Get the Jenkins war file for windows from https://jenkins.io/download/

2) Start the Jenkins using command : java -jar jenkins.war --> It will start the Jenkins server at localhost:8080

3) Open chrome browser and go to localhost:8080 -- Jenkins main page will appear

4) Click on New Item and provide name of your project and select "Multiconfiguratio project"

5) Under Build, select "Execute Windows batch command" and provide batch commands to execute your project

Ex : 

        -----To Goto project folder and to start run --------
        cd\
        D:
        cd D:\GitReporsitories\Protractor-Demo
        rmdir /s /q D:\GitReporsitories\Protractor-Demo\allure-results
        protractor conf\conf.js

        ------- To copy allure reports to jasmine allure reporter location ------------
        cd\
        D:
        cd D:\GitReporsitories\Protractor-Demo\node_modules\jasmine-allure-reporter
        rmdir /s /q D:\GitReporsitories\Protractor-Demo\node_modules\jasmine-allure-reporter\allure-results
        xcopy D:\GitReporsitories\Protractor-Demo\allure-results D:\GitReporsitories\Protractor-Demo\node_modules\jasmine-allure- reporter\allure-results /i /d
        mvn site -Dallure.results_pattern=allure-results

        ---------- To start Jetty server to publish results --------------

        cd\
        D:
        cd D:\GitReporsitories\Protractor-Demo\node_modules\jasmine-allure-reporter
        mvn jetty:run -Djetty.port=8888

