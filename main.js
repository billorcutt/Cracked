'use strict';

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const storage = require('electron-json-storage');
const remoteMain = require('@electron/remote/main');
remoteMain.initialize();
var Menu = electron.Menu;
var menu = new Menu();
var dialog = electron.dialog;
var fs = require('fs');
var shell = electron.shell;
var monode = require('monode')();
var draggedFilePath = []; //path of any file that was dragged onto the app icon
var openFileAlias;
global.monome_device = null;
global.shared_object = {};
global.window_id = 0;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null,
    crackedWindows = {},
    currentId = 0,
    shuttingDown=false;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit',function(e){
    if(BrowserWindow.getAllWindows().length) {
        e.preventDefault();
        shuttingDown=true;
        closeWindows();
    }
});

global.flipShutdownFlag = function () {
    if(shuttingDown) {
        shuttingDown = false;
    }
};

function closeWindows() {
    if(BrowserWindow.getAllWindows().length) {
        if(BrowserWindow.getAllWindows()[0]) {
            BrowserWindow.getAllWindows()[0].close();
        }
    }
}

monode.on('device', function(device) {
    if(device) {
        global.monome_device = device;
        console.log("monome device connected:", device);

        //tbd-make this configurable
        device.rotation = 180;
    }
});

monode.on('disconnect', function(device){
    global.monome_device = null;
    console.log('A device was disconnected:', device);
});

app.on("open-file", function(event, path) {
    event.preventDefault();
    if(!app.isReady()){
        draggedFilePath.push(path);
    } else {
        openFileAlias([path]);
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

    // Create the Application's main menu
    var template = [{
        label: "Application",
        submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "File",
        submenu: [
            { label: "New", accelerator: "CmdOrCtrl+N", click: function() { mainWindow = openCrackedWindow(); } },
            { label: "Open", accelerator: "CmdOrCtrl+O", click: function() { openFile(dialog.showOpenDialogSync(mainWindow,{
                filters: [
                    { name: 'Javascript', extensions: ['js'] }
                ],
                title:"Open a file",
                properties:["multiSelections","openFile"]

            })) } },
            { label: "Save", accelerator: "CmdOrCtrl+S", click: function() { saveFile(); } },
            { label: "Close", accelerator: "CmdOrCtrl+W", click: function() {
                if(mainWindow) {
                    mainWindow.close();
                } else if(BrowserWindow.getAllWindows()[0]) {
                    BrowserWindow.getAllWindows()[0].close();
                }
            } }
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}, {
        label: "Window",
        submenu: [
            { label: "Toggle Audio", accelerator: "CmdOrCtrl+M", click:muteWindow},
            { label: "Toggle Read-Only", accelerator: "CmdOrCtrl+L", click:toggleReadOnly},
            { label: "Reload Window", accelerator: "CmdOrCtrl+R", click:reloadWindow},
            {
                label: 'Toggle Developer Tools',
                accelerator: (function () {
                    if (process.platform === 'darwin')
                        return 'Alt+Command+I';
                    else
                        return 'Ctrl+Shift+I';
                })(),
                click: function (item, mainWindow) {
                    if (mainWindow)
                        mainWindow.toggleDevTools();
                }
            }
        ]}, {
        label: "Themes",
        submenu: getThemesMenu()
        },{
        label: "Help ",
        submenu: [{
                label:'Examples',
                submenu:getExamples()
            },
            {
                label:'Demos',
                submenu:getDemos()
            },
            {
                label:'API Docs',
                click:function(){
                    shell.openExternal('http://billorcutt.github.io/i_dropped_my_phone_the_screen_cracked/');
                }
            },
            {
                label:'Website',
                click:function(){
                    shell.openExternal('https://github.com/billorcutt/i_dropped_my_phone_the_screen_cracked');
                }
            }
        ]}
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

    //are we opening bc a file was dragged onto the icon?
    if(!draggedFilePath.length) {
        mainWindow = openCrackedWindow();
    } else {
        openFile(draggedFilePath);
        draggedFilePath = [];
    }

    if(process.env.CRACKED_SMOKE_TEST === "1" || process.argv.indexOf("--cracked-smoke-test") !== -1) {
        runSmokeTest();
    }

    //it opens a window
    function openCrackedWindow() {

        var options = {width: 800, height: 600, webPreferences:{webSecurity:false, nodeIntegration: true, contextIsolation:false, nativeWindowOpen:false}};

        //offset from current window
        if(mainWindow) {
            options.x = mainWindow.getBounds().x + 10;
            options.y = mainWindow.getBounds().y + 10;
        }

        // Create the browser window.
        var win = new BrowserWindow(options);
        remoteMain.enable(win.webContents);

        // and load the index.html of the app.
        win.loadURL('file://' + __dirname + '/index.html');

        // Restore the current theme only after the editor has initialized.
        win.webContents.once('did-finish-load', function() {
            storage.get("theme",function(error,data){
                if(!error && data && data.name) {
                    win.webContents.executeJavaScript(
                        "crackedEditor.setOption('theme', "+JSON.stringify(data.name)+");"
                    );
                }
            });
        });

        // Open the DevTools.
        //win.webContents.openDevTools();

        //focus
        win.on('focus',function(e){
            mainWindow = this;
            currentId = this.id;
        });

        //keep the window from closing before we can save
        win.on('close',function(e){
            e.preventDefault();
            return false;
        });

        // Emitted when the window is closed.
        win.on('closed', function(e) {
            delete crackedWindows[currentId];
            mainWindow = BrowserWindow.getFocusedWindow() || null;
            currentId = mainWindow ? mainWindow.id : 0;
            if(shuttingDown) {
                app.quit();
            }
        });

        crackedWindows[win.id]=win;
        global.window_id = win.id;

        return win;
    }

    //start menu
    //get an array of theme css from the theme directory
    //to build the menu
    function getThemesMenu() {

        var path = app.getAppPath();
        var themes = fs.readdirSync(path+'/lib/editor/theme/');
        var result = [];
        if(themes && themes.length) {
            themes.map(function(item){
                var name = item.replace(/\.css/,'');
                result.push({
                    label:name,
                    click:function(){
                        if(mainWindow && storage) {
                            mainWindow.webContents.executeJavaScript("crackedEditor.setOption(\"theme\", \""+name+"\");");
                            storage.set("theme",{"name":name});
                        }
                    }
                });
            });
        }

        result.push({ type: "separator" });
        result.push({
            label:"Make Text Bigger",
            click:makeFontBigger,
            accelerator: 'Command+='
        });
        result.push({
            label:"Make Text Smaller",
            click:makeFontSmaller,
            accelerator: "Command+-"
        });
        return result;
    }



    function makeFontBigger() {
        if(mainWindow) {
            mainWindow.webContents.executeJavaScript("changeFontSize(1)");
        }
    }

    function makeFontSmaller() {
        if(mainWindow) {
            mainWindow.webContents.executeJavaScript("changeFontSize(0)");
        }
    }

    //scan the demo folder and create a menu
    function getDemos() {
        var path = app.getAppPath();
        var demos = fs.readdirSync(path+'/Cracked/Demos/');
        var result = [];
        if(demos && demos.length) {
            demos.map(function(name){
                result.push({
                    label:name,
                    click:function(){
                        openFile([path+'/Cracked/Demos/'+name]);
                    }
                });
            });
        }
        return result;
    }

    //scan the examples folder and create a menu
    function getExamples() {
        var path = app.getAppPath();
        var examplesDirectories = fs.readdirSync(path+'/Cracked/Examples/');
        var result = [];
        if(examplesDirectories && examplesDirectories.length) {
            examplesDirectories.map(function(categoryDirectory){
                if(fs.lstatSync(path+'/Cracked/Examples/'+categoryDirectory).isDirectory()) {
                    result.push({
                        label:categoryDirectory,
                        submenu:[]
                    });
                    var examples = fs.readdirSync(path+'/Cracked/Examples/'+categoryDirectory);
                    if(examples && examples.length) {
                        examples.map(function(item){
                            result[result.length-1].submenu.push({
                                label:item,
                                click:function(){
                                    openFile([path+'/Cracked/Examples/'+categoryDirectory+'/'+item]);
                                }
                            })
                        });
                    }
                }
            });
        }
        return result;
    }

    //define some methods for opening & saving
    function openFile(path) {
        if(path && path.length) {
            for(var i=0;i<path.length;i++) {
                mainWindow = openCrackedWindow();
                (function(win, filePath) {
                    win.webContents.once('did-finish-load', function() {
                        win.webContents.executeJavaScript("openFile("+JSON.stringify(filePath)+")");
                    });
                })(mainWindow, path[i]);
            }
        }
    }

    //make an alias for the openFile method we can use outside the onReady handler
    openFileAlias = (function(){return openFile})();

    function saveFile() {
        if(mainWindow) {
            mainWindow.webContents.executeJavaScript("saveFile()");
        }
    }

    function reloadWindow() {
        if(mainWindow) {
            mainWindow.webContents.executeJavaScript("evalEditor()");
        }
    }

    function toggleTitleTag(tag) {
        var title = mainWindow.webContents.getTitle();
        if(title.indexOf(tag)!==-1) {
            title = title.replace("["+tag+"]", "");
        } else {
            title = title + " ["+tag+"]";
        }
        mainWindow.webContents.executeJavaScript("document.title='"+title+"'");
    }

    function toggleReadOnly() {
        if(mainWindow) {
            mainWindow.webContents.executeJavaScript("crackedEditor.setOption(\"readOnly\", !crackedEditor.getOption(\"readOnly\"))");
            var title = mainWindow.webContents.getTitle();
            toggleTitleTag("Read-Only");
        }
    }

    function muteWindow() {
        if(mainWindow) {
            mainWindow.webContents.setAudioMuted(!mainWindow.webContents.isAudioMuted());
            var title = mainWindow.webContents.getTitle();
            toggleTitleTag("Muted");
        }
    }

    async function runSmokeTest() {
        var resultArgument = process.argv.find(function(argument) {
            return argument.indexOf("--cracked-smoke-result=") === 0;
        });
        var resultPath = process.env.CRACKED_SMOKE_RESULT ||
            (resultArgument ? resultArgument.substring("--cracked-smoke-result=".length) : null);
        try {
            await new Promise(function(resolve) {
                if(mainWindow.webContents.isLoading()) {
                    mainWindow.webContents.once("did-finish-load", resolve);
                } else {
                    resolve();
                }
            });

            var editorReady = await mainWindow.webContents.executeJavaScript(
                "typeof crackedEditor !== 'undefined'"
            );
            if(!editorReady) {
                throw new Error("Editor did not initialize");
            }

            var applicationMenu = Menu.getApplicationMenu();
            var themeMenu = applicationMenu.items.find(function(item) {
                return item.label === "Themes";
            });
            var themeItem = themeMenu.submenu.items.find(function(item) {
                return item.type === "normal" && item.label !== "rubyblue";
            });
            themeItem.click(themeItem, mainWindow);
            var selectedTheme = await mainWindow.webContents.executeJavaScript(
                "crackedEditor.getOption('theme')"
            );
            if(selectedTheme !== themeItem.label) {
                throw new Error("Theme menu did not update the editor");
            }

            var oldWindows = BrowserWindow.getAllWindows();
            var helpMenu = applicationMenu.items.find(function(item) {
                return item.label.trim() === "Help";
            });
            var demosMenu = helpMenu.submenu.items.find(function(item) {
                return item.label === "Demos";
            });
            var demoItem = demosMenu.submenu.items[0];
            demoItem.click(demoItem, mainWindow);

            var demoWindow;
            for(var attempt=0;attempt<100;attempt++) {
                demoWindow = BrowserWindow.getAllWindows().find(function(win) {
                    return oldWindows.indexOf(win) === -1;
                });
                if(demoWindow && !demoWindow.webContents.isLoading()) {
                    break;
                }
                await new Promise(function(resolve) { setTimeout(resolve, 50); });
            }
            if(!demoWindow) {
                throw new Error("Demo menu did not open a window");
            }

            var demoLoaded = await demoWindow.webContents.executeJavaScript(
                "crackedEditor.getDoc().getValue().length > 0"
            );
            if(!demoLoaded) {
                throw new Error("Demo source did not load");
            }

            console.log("CRACKED_SMOKE_TEST_OK", JSON.stringify({
                editorReady: editorReady,
                theme: selectedTheme,
                demo: demoItem.label
            }));
            if(resultPath) {
                fs.writeFileSync(resultPath, JSON.stringify({
                    ok: true,
                    editorReady: editorReady,
                    theme: selectedTheme,
                    demo: demoItem.label
                }));
            }
            app.exit(0);
        } catch(error) {
            console.error("CRACKED_SMOKE_TEST_FAILED", error);
            if(resultPath) {
                fs.writeFileSync(resultPath, JSON.stringify({
                    ok: false,
                    error: error.stack
                }));
            }
            app.exit(1);
        }
    }

});
