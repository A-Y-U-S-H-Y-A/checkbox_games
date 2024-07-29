var squaregrid = 7;
var flag=0;
var gameon = true;
var ts;
var score=0;
var tx;
var ty;
var whatever;
var stack = [];
var s;
var index;
var px,py;
var wx,wy;

squaregrid+=1;

document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 37:
            if(document.getElementById(stringen(px,py)).classList.contains('al')){
                document.getElementById(stringen(px,py)).checked = false;
                px-=1;
                document.getElementById(stringen(px,py)).checked = true;
                if(px == wx && py == wy){
                    score+=1;
                    setup();
                }
            }
            break;
        case 38:
            if(document.getElementById(stringen(px,py)).classList.contains('at')){
                document.getElementById(stringen(px,py)).checked = false;
                py+=1;
                document.getElementById(stringen(px,py)).checked = true;
                if(px == wx && py == wy){
                    score+=1;
                    setup();
                }
            }
            break;
        case 39:
            if(document.getElementById(stringen(px,py)).classList.contains('ar')){
                document.getElementById(stringen(px,py)).checked = false;
                px+=1;
                document.getElementById(stringen(px,py)).checked = true;
                if(px == wx && py == wy){
                    score+=1;
                    setup();
                }
            }
            break;
        case 40:
            if(document.getElementById(stringen(px,py)).classList.contains('ab')){
                document.getElementById(stringen(px,py)).checked = false;
                py-=1;
                document.getElementById(stringen(px,py)).checked = true;
                if(px == wx && py == wy){
                    score+=1;
                    setup();
                }
            }
            break;
    }
});

function stringen(x,y){
    var tes = x.toString();
    tes+=",";
    tes+= y.toString();
    return tes;
}

function setup(){
    document.getElementById('gb').innerHTML='';
    document.getElementById('score').innerHTML=score;
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
stack.push('0,0');
document.getElementById('0,0').setAttribute("visited", "visited");
mazegen(0,0);
px=0;
py=0;
document.getElementById('0,0').checked = true;
wy=squaregrid-1;
wx=squaregrid-1;
document.getElementById(stringen(wx,wy)).checked = true;
}

function sleep(ms){
    ms*=1000;
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function giveup() {
    document.getElementById(stringen(px,py)).checked = false;
    px=0;py=0;
    document.getElementById(stringen(px,py)).checked = true;
    document.getElementById(stringen(px,py)).removeAttribute('visited');
    await sleep(2);
    stack.push(stringen(px,py));
    while(true){
        if(px == wx && py == wy){console.log('solved');break;}
        document.getElementById(stringen(px,py)).checked = true;
        var z = 'n';
        if((px+1)<squaregrid && document.getElementById(stringen(px+1,py)).hasAttribute('visited') && document.getElementById(stringen(px,py)).classList.contains('ar')){
            stack.push(stringen(px+1,py));
            document.getElementById(stringen(px+1,py)).removeAttribute('visited');
            document.getElementById(stringen(px+1,py)).checked = true;
            px+=1;
            z='r';
        }
        else if((px-1)>=0 && document.getElementById(stringen(px-1,py)).hasAttribute('visited') && document.getElementById(stringen(px,py)).classList.contains('al')){
            stack.push(stringen(px-1,py));
            document.getElementById(stringen(px-1,py)).removeAttribute('visited');
            document.getElementById(stringen(px-1,py)).checked = true;
            px-=1;
            z='l';
        }
        else if((py+1)<squaregrid && document.getElementById(stringen(px,py+1)).hasAttribute('visited') && document.getElementById(stringen(px,py)).classList.contains('at')){
            stack.push(stringen(px,py+1));
            document.getElementById(stringen(px,py+1)).removeAttribute('visited');
            document.getElementById(stringen(px,py+1)).checked = true;
            py+=1;
            z='t';
        }
        else if((py-1)>=0 && document.getElementById(stringen(px,py-1)).hasAttribute('visited') && document.getElementById(stringen(px,py)).classList.contains('ab')){
            stack.push(stringen(px,py-1));
            document.getElementById(stringen(px,py-1)).removeAttribute('visited');
            document.getElementById(stringen(px,py-1)).checked = true;
            py-=1;
            z='b';
        }
        else{z='n';}
        if(z=='n'){
            document.getElementById(stringen(px,py)).checked = false;
            stack.pop();
            var tc = stack[stack.length-1];
            py = parseInt(tc.substring(tc.indexOf(',')+1));
            px = parseInt(tc.substring(0,tc.indexOf(',')));
        }
        await sleep(0.5);
        
    }

}


function mazegen(x,y){
    var pd = ['Right','Top','Left','Bottom'];
    
    
    while(true){
    tl=pd.length;
    
    if(tl==0){
        stack.pop();
        break;
    }
    
    dir = pd[Math.floor(Math.random() * (tl))];


    if(dir == 'Right'){
       tx = x+1;
       if(tx>=squaregrid){
        index = pd.indexOf('Right');
        pd.splice(index, 1);   
        }
        else{
       ty = y;
       ts = stringen(tx,ty);
       s = document.getElementById(ts);
       if(s.hasAttribute('visited')){
        index = pd.indexOf('Right');
        pd.splice(index, 1);
       }
       else{
        stack.push(ts);
        s.classList.add("al");
        s.setAttribute("visited", "visited");
        ts = stringen(x,y);
        s = document.getElementById(ts);
        s.classList.add("ar");
        break;
       }
    }
    }


    else if(dir == 'Left'){
        tx = x-1;
        if(tx<0){
            index = pd.indexOf('Left');
            pd.splice(index, 1);
        }
        else{
        ty = y;
        ts = stringen(tx,ty);
        s = document.getElementById(ts);
        if(s.hasAttribute('visited')){
         index = pd.indexOf('Left');
         pd.splice(index, 1);
        }
        else{
         stack.push(ts);
         s.classList.add("ar");
         s.setAttribute("visited", "visited");
         ts = stringen(x,y);
         s = document.getElementById(ts);
         s.classList.add("al");
         break;
        } 
    }
    }


    else if(dir == 'Top'){
        ty = y+1;
        if(ty>=squaregrid){
         index = pd.indexOf('Top');
         pd.splice(index, 1);
         }
        else{   
        tx = x;
        ts = stringen(tx,ty);
        s = document.getElementById(ts);
        if(s.hasAttribute('visited')){
         index = pd.indexOf('Top');
         pd.splice(index, 1);
        }
        else{
         stack.push(ts);
         s.classList.add("ab");
         s.setAttribute("visited", "visited");
         ts = stringen(x,y);
         s = document.getElementById(ts);
         s.classList.add("at");
         break;
        }
    }
    }


    else{
        ty = y-1;
        if(ty<0){
         var index = pd.indexOf('Bottom');
         pd.splice(index, 1);
        }
        else{
        tx = x;
        ts = stringen(tx,ty);
        s = document.getElementById(ts);
        if(s.hasAttribute('visited')){
         var index = pd.indexOf('Bottom');
         pd.splice(index, 1);
        }
        else{
         stack.push(ts);
         s.classList.add("at");
         s.setAttribute("visited", "visited");
         ts = stringen(x,y);
         s = document.getElementById(ts);
         s.classList.add("ab");
         break;
        }
    }
    }

    //End While
    }


    if(stack.length>0){
        var tc = stack[stack.length-1];
        y = parseInt(tc.substring(tc.indexOf(',')+1));
        x = parseInt(tc.substring(0,tc.indexOf(',')));
        mazegen(x,y);
    }



}

setup();