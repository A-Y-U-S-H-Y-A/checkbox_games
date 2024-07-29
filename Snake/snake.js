var squaregrid = 0;
var x=[];
var y=[];
var flag=0;
var gameon = true;
var d = 'd';
var fruitx;
var fruity;
var score=0;
var ts;
var whatever;


document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 37:
            d='l';
            break;
        case 38:
            d='u';
            break;
        case 39:
            d='r';
            break;
        case 40:
            d='d';
            break;
    }
});


function setup(){
    for(var i=squaregrid-1;i>=0;i--){
    for(var j=0;j<squaregrid;j++){
    var node = document.createElement("input");
    node.setAttribute("type", "checkbox");
    node.setAttribute("disabled", "disabled");
    ts = j.toString();
    ts+=",";
    ts+= i.toString();
    node.setAttribute("id", ts);
    document.getElementById("gb").appendChild(node);
    }    
    node = document.createElement("br");
    document.getElementById("gb").appendChild(node);
}
    var tn = Math.floor(squaregrid/2);
    x.push(tn);
    y.push(tn);
    ts = tn.toString();
    ts += ",";
    ts += tn.toString();
    document.getElementById(ts).checked=true;
    genfruit();
}


function genfruit(){
while(true){
flag = 0;
fruitx = Math.floor(Math.random() * (squaregrid));
fruity = Math.floor(Math.random() * (squaregrid));
for(var i=0;i<squaregrid;i++){
    if(x[i] == fruitx && y[i] == fruity){
        flag=1;
        break;
    }
}
    if(flag == 0){
        break;
    }
}
ts = fruitx.toString();
ts+=",";
ts+= fruity.toString();
document.getElementById(ts).checked=true;
document.getElementById("score").innerHTML=score;
}

function willcheck(){
    if(gameon == true){
    ts=x[0].toString();
    ts+=",";
    ts+=y[0].toString();
    document.getElementById(ts).checked=true;
    }
}
function willuncheck(){
    ts=x[(x.length)-1].toString();
    ts+=",";
    ts+=y[(y.length)-1].toString();
    document.getElementById(ts).checked=false;
}

async function game(){

if(d =='d'){
    tx=x[0];
    ty=y[0];
    ty-=1;
    if(ty < 0){
        gameon=false;
    }
    for (var i = 0; i < x.length; i++) {
        if(x[i] == tx && y[i] == ty){
            gameon=false;
            break;
        }
    }
    x.unshift(tx);
    y.unshift(ty);//Begining of array
    willcheck();
    if(tx == fruitx && ty == fruity){
        score+=1; 
        genfruit();
    }
    else{
        willuncheck();
        x.pop();
        y.pop(); 
    }
}

else if(d == 'u'){
    tx=x[0];
    ty=y[0];
    ty+=1;
    if(ty>squaregrid){
        gameon=false;
    }
    for (var i = 0; i < x.length; i++) {
        if(x[i] == tx && y[i] == ty){
            gameon=false;
            break;
        }
    }
    x.unshift(tx);
    y.unshift(ty);
    willcheck();
    if(tx == fruitx && ty == fruity){
        score+=1; 
        genfruit();
    }
    else{
        willuncheck();
        x.pop();
        y.pop(); 
    }
}

else if(d == 'l'){
    tx=x[0];
    ty=y[0];
    tx-=1;
    if(tx < 0){
        gameon=false;
    }
    for (var i = 0; i < x.length; i++) {
        if(x[i] == tx && y[i] == ty){
            gameon=false;
            break;
        }
    }
    x.unshift(tx);
    y.unshift(ty);
    willcheck();
    if(tx == fruitx && ty == fruity){
        score+=1; 
        genfruit();
    }
    else{
        willuncheck();
        x.pop();
        y.pop(); 
    }
}

else{
    tx=x[0];
    ty=y[0];
    tx+=1;
    if(tx>squaregrid){
        gameon=false;
    }
    for (var i = 0; i < x.length; i++) {
        if(x[i] == tx && y[i] == ty){
            gameon=false;
            break;
        }
    }
    x.unshift(tx);
    y.unshift(ty);
    willcheck();
    if(tx == fruitx && ty == fruity){
        score+=1;
        genfruit();
    }
    else{
        willuncheck();
        x.pop();
        y.pop(); 
    }
}
if(gameon==false){clearInterval(whatever);}
return Promise.resolve();
}




async function runner(){
    whatever = setInterval(game,200)
}

function setframe(){
    document.getElementById('size').value > 9 ? squaregrid = document.getElementById('size').value : squaregrid = 10
    var h = window.innerHeight / squaregrid;
    var w = window.innerWidth / squaregrid;
    console.log(h)
    console.log(w)
    var ss = (() => {return Math.floor(h) > Math.floor(w) ? Math.floor(w) : Math.floor(h)})();
    ss += 'px'
    var style = (function() {
        var style = document.createElement("style");
        style.appendChild(document.createTextNode(""));
        document.head.appendChild(style);
        console.log(style.sheet.cssRules);
        return style;
    })();
    q = 'input[type="checkbox"]{height:' + ss + ';width:' + ss + ';}';
    console.log(q)
    style.sheet.insertRule(q, 0);
    console.log(style.sheet.cssRules); // length is 1, rule added
    document.getElementById('setup').style.display = 'none'
    document.getElementById('p2').style.display = 'block'
    setup();
    runner();
}