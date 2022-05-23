let token=document.getElementById('btn1');
let connect=document.getElementById('btn2');
let block=document.querySelector('.block');
let head=document.querySelector('.heading');
let sec2=document.querySelector('.field2').style;
let sec3=document.querySelector('.field3').style;
let sec4=document.querySelector('.field4').style;
let pageList=document.querySelector('.change-page').style;

window.onload=goDifferentPage("login")

function common(){
    head.innerHTML="Token Claim Dashboard"
    //connect.innerHTML="Disconnect Wallet"
    token.style.display="inline-block"
    sec2.display="inline-block"
    sec3.display="inline-block"
    sec4.display="none"
    pageList.top="15%"
    token.style.width="60%"
    connect.style.width="60%"
    block.style.width="80%"
    head.style.margin="0"
    head.style.padding="0"
    //RWD
    if(window.innerWidth<=768){
        block.style.margin="5vh"
        block.style.padding="20px"
        pageList.top="5%"
    }else if(window.innerWidth<=1024){
        block.style.height="90vh"
        block.style.margin="5vh"
        pageList.top="10%"
    }
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
            token.innerHTML="NFT Holder Claim Tokens"
            break;
        case "sec2":
            common()
            token.innerHTML="MOD Claim Tokens"
            break;
        case "sec3":
            common()
            token.innerHTML="DAO Foundation Claim Tokens"
            break;
        case "sec4":
            common()
            //connect.innerHTML="Disconnect Wallet"
            token.innerHTML="Claim Tokens"
            head.innerHTML="AirDrop"
            sec2.display="none"
            sec3.display="none"
            sec4.display="inline-block"
            break;
    }
}