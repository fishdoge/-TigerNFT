let token=document.getElementById('btn1');
let connect=document.getElementById('btn2');
let block=document.querySelector('.block');
let head=document.querySelector('.heading');
let sec2=document.querySelector('.field2').style;
let sec3=document.querySelector('.field3').style;
let sec4=document.querySelector('.field4').style;

window.onload=goDifferentPage("login")

function common(){
    //head.innerHTML="Token Claim Dashboard"
    //connect.innerHTML="Disconnect Wallet"
    token.style.display="inline-block"
    sec2.display="inline-block"
    sec3.display="inline-block"
    sec4.display="none"
    token.style.width="50%"
    connect.style.width="50%"
    block.style.width="80%"
    if(window.innerWidth<=900){
        token.style.width="100%"
        connect.style.width="100%"
    }
    if(window.innerWidth<=426){
        block.style.width="90vw"
    }
}


async function goDifferentPage(page){
    switch(page){
        case "login":
            token.style.display="none"
            sec2.display="none"
            sec3.display="none"
            sec4.display="none"
            break;
        case "sec1":
            common();
            head.innerHTML = "NFT holder"
            let claimvalue = parseInt(await NinjaNFTClaimCheck(coinbase))+ parseInt(await TigerNFTClaimCheck(coinbase));
            $("#input2").val(claimvalue);
            token.innerHTML="NFT Holder Claim Tokens"
            break;
        case "sec2":
            common();
            head.innerHTML = "MOD"
            if(!CheckModAddress){
                token.innerHTML = "You are not the MOD";
            }else{
                token.innerHTML="MOD Claim Token";
            }
            $("#input2").val(await CheckModWithDraw(coinbase));

            break;
        case "sec3":
            common();
            head.innerHTML="DAO Foundation"
            $("#input2").val(await CkeckDAO());
            token.innerHTML="DAO Foundation Claim Token"
            break;
        case "sec4":
            common();
            await AirdropCheck(coinbase);
            //connect.innerHTML="Disconnect Wallet"
            $("#input4").val(await AirdropCheck(coinbase));
            token.innerHTML="Claim Token"
            head.innerHTML="AirDrop"
            sec2.display="none"
            sec3.display="none"
            sec4.display="inline-block"
            break;
    }
}