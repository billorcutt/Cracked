__().saw(100).panner().dac(0.25).play();

setTimeout(function(){
    __("panner").pan(1);
},500);

setTimeout(function(){
    __("panner").pan(-1);
},1000);

setTimeout(function(){
    __("panner").pan(1);
},1500);

setTimeout(function(){
    __("panner").pan(-1);
},2000);

setTimeout(function(){
    __("panner").pan(1);
},2500);

setTimeout(function(){
    __("panner").pan(0);
},3000);

setTimeout(function(){
    __("*").stop();
},3500);