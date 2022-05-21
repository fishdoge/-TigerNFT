let token=document.getElementById('btn1');
let connect=document.getElementById('btn2');
let head=document.querySelector('.heading');
let sec2=document.querySelector('.field2').style;
let sec3=document.querySelector('.field3').style;
let sec4=document.querySelector('.field4').style;

window.onload=goDifferentPage("login")

function common(){
    connect.innerHTML="Disconnect Wallet"
    token.style.display="inline-block"
    sec2.display="inline-block"
    sec3.display="inline-block"
    sec4.display="none"
}

function goDifferentPage(page){
    switch(page){
        case "login":
            token.style.display="none"
            sec2.display="none"
            sec3.display="none"
            sec4.display="none"
            break;
        case "sec1":
            common()
            break;
        case "sec2":
            token.innerHTML="MOD Claim Tokens"
            common()
            break;
        case "sec3":
            token.innerHTML="DAO Foundation Claim Tokens"
            common()
            break;
        case "sec4":
            connect.innerHTML="Disconnect Wallet"
            token.innerHTML="Claim Tokens"
            head.innerHTML="AirDrop"
            token.style.display="inline-block"
            sec2.display="none"
            sec3.display="none"
            sec4.display="inline-block"
            break;          
    }
}
//條件判斷要去的頁面
function judgePage(){
    if(true){
        goDifferentPage("sec1")
    }
}
