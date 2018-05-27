//included in the index.html
//window code for opening and saving.

var fs = require('fs');
var path = path || require('path');
var electron = require('electron');
var flipShutdownFlag = electron.remote.getGlobal("flipShutdownFlag");
var app = electron.remote.app;
var dialog = electron.remote.dialog;
var crackedFile = null;
const currentWindow = electron.remote.getCurrentWindow();

//monome section
var monome_device = electron.remote.getGlobal("monome_device") || null;
var _monome_press_callback = null;

function _monome_init() {
    monome_device = electron.remote.getGlobal("monome_device");
}

function _monome_led_on(x,y) {
    if(monome_device && monome_device.ready) {
        monome_device.led(x,y,1);
    }
}

function _monome_led_off(x,y) {
    if(monome_device && monome_device.ready) {
        monome_device.led(x,y,0);
    }
}

function _monome_key_press(cb) {
    if(monome_device && monome_device.ready && typeof cb === "function") {
        _monome_press_callback = cb;
    }
}

//register callback only once
if(monome_device && monome_device.ready) {
    monome_device.on('key', function(x, y, s) {
        if(monome_device && typeof _monome_press_callback === "function") {
            _monome_press_callback(x, y, s);
        }
    });
}

//Emitted when the window is closed.
currentWindow.on('close', function(e) {
    //if the document hasn't been edited
    if(crackedEditor.getDoc().isClean()) {
        //so go ahead and close
        currentWindow.destroy();
    } else {
        dialog.showMessageBox({
            type:"question",
            message:"Do you want to save the changes made to this document?",
            buttons:["Don't Save","Cancel","Save"],
            defaultId:2
        },function(result) {
            //save
            if(result===2) {
                saveFile(function(){
                    currentWindow.destroy();
                });
             //cancel-do nothing
            } else if(result===1) {
            //don't save
                flipShutdownFlag();
            } else {
                currentWindow.destroy();
            }
        });
    }
});

//get an array of plugin js from the plugins directory
//and insert them into the document
function loadLibrary() {
    var path = app.getAppPath();
    var library = fs.readdirSync(path+'/lib/cracked/');
    var result = [];
    if(library && library.length) {
        library.map(function(item){
            var file = fs.readFileSync(path+'/lib/cracked/'+item);
            result.push(file);
        });
    }
    return result;
}

//get an array of plugin js from the plugins directory
//and insert them into the document
function loadPlugins() {
    var path = app.getPath('documents');
    var plugins = fs.readdirSync(path+'/Cracked/Plugins/');
    var result = [];
    if(plugins && plugins.length) {
        plugins.map(function(item){
            var file = fs.readFileSync(path+'/Cracked/Plugins/'+item);
            result.push(file);
        });
    }
    return result;
}

//get an array of theme css from the theme directory
//and insert them into the document
function insertCSS() {
    var path = app.getAppPath();
    var themes = fs.readdirSync(path+'/lib/editor/theme/');
    var result = [];
    if(themes && themes.length) {
        themes.map(function(item){
            var link = document.createElement("link");
            link.rel="stylesheet";
            link.href="lib/editor/theme/"+item;
            document.head.appendChild(link);
        });
    }
    return result;
}

//read a directory and return an array of its contents.
function readDirectory(pathToDirectory,filelist) {
    filelist = filelist || [];
    if(fs.existsSync(pathToDirectory)) {
        var files = fs.readdirSync(pathToDirectory);
        files.forEach(function (file) {
            if (fs.statSync(path.join(pathToDirectory, file)).isDirectory()) {
                filelist = readDirectory(path.join(pathToDirectory, file), filelist);
            }
            else {
                filelist.push(path.join(pathToDirectory, file));
            }
        });
    } else {
        console.error("ls: directory "+pathToDirectory+" does not exist.");
    }
    return filelist;
}

//try to find a file in the cracked app's search path
function resolvePath(pathToFile) {
    var path = require('path');
    var docPath = app.getPath("documents");
    var fileDir = crackedFile ? path.resolve(crackedFile,'..') : null;
    var pathToFileNormalized = path.normalize(pathToFile);
    var file = null;

    if(fs.existsSync(pathToFile)) {
        file = pathToFile;
    } else if(fileDir && fs.existsSync(fileDir+'/'+pathToFileNormalized)) {
        file = fileDir+'/'+pathToFileNormalized;
    } else if(fs.existsSync(docPath+'/Cracked/'+pathToFileNormalized)){
        file = docPath+'/Cracked/'+pathToFileNormalized;
    }
    return file;
}

//open a file with a path
function openFile(path) {
    if (path && path.length) {
        fs.readFile(path, 'utf8', function (err, contents) {
            crackedEditor.getDoc().setValue(contents);
            crackedFile=path;
            document.title=path;
            crackedEditor.getDoc().markClean();
        });
    }
}

//save a file
function saveFile(callback) {
    //if not previously saved
    if(!crackedFile) {
        //throw up a dialog
        dialog.showSaveDialog({title:"Do you want to save the changes made to the document \"Untitled\"?"},function(path){
            if(path && path.length) {
                __cb(path);
            }
        });
    } else {
        //already saved so just save it.
        __cb();
    }
    //inner function does all the working of saving.
    function __cb(pathFromDialog) {
        var path = crackedFile ? crackedFile : pathFromDialog;
        if(path && path.length) {
            fs.writeFile(path, crackedEditor.getDoc().getValue(), 'utf8',function(err){
                if(!err) {
                    crackedEditor.getDoc().markClean();
                    crackedFile = path;
                    document.title = (document.title.indexOf("Muted")!=-1) ? path + " [Muted]" : path;
                    if(typeof callback === "function") {
                        callback();
                    }
                }
            });
        }
    }
}