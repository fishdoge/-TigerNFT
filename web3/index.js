

//const Tiger_address = "0xF07e42D0Fd586cc04B9abFE72dED7aa33f239d6d";
const Tiger_address = "0x1ed9C88fD0d7a45FB24Ed53CF8913efb106cD318"//lcoal
let Tiger;
let TigerNFT;
let NinjaNFT;
const TigerNFTaddress = "0x500D80B13DaD4cDF247cc355081501762cD05B24";//test
const NinjaNFTaddress = "0x500D80B13DaD4cDF247cc355081501762cD05B24";

// const TigerNFTaddress = "0x2f224AE9323f5dF323d2A079833edA5C891D1510"; // true
// const NinjaNFTaddress = "0x3d6ab55fB262f786ba1e9d1172657FB2d462F1f8";

async function login_In_button(){
    await ethereum.request({ method: 'eth_requestAccounts' });
    window.location.reload();
}

async function setCollent(){
    let account = await ethereum.request({ method: 'eth_requestAccounts' });

    coinbase = account[0];

    if(coinbase == undefined){
        return;
    }

    $("#btn2").text(coinbase);

    let ETHbalance = await web3.eth.getBalance(coinbase);
    ETHbalance = web3.utils.fromWei(ETHbalance, 'ether');

    let add = coinbase.substring(0,12)


    console.log(add);
    $("#btn2").text(add);
    $("#input1").val(coinbase);


}

async function CheckTigerCoinBalance(){
    let TigerAmount  = await Tiger.methods.balanceOf(coinbase).call();
    TigerAmount = web3.utils.fromWei(TigerAmount, 'ether');
    console.log(TigerAmount);
    $("#TgcAmounts").val(TigerAmount);
}



async function setNFT_ABI(){
    await setCollent();
    if(coinbase == undefined){
        return;
    }
    Tiger = new web3.eth.Contract(TigerABI,Tiger_address);
    TigerNFT = new web3.eth.Contract(TigetNFTABI,NinjaNFTaddress);
    NinjaNFT = new web3.eth.Contract(TigetNFTABI,NinjaNFTaddress);
    await Time();
    await CheckTigerCoinBalance();

    $("#TigerBal").text(await TigerNFTBalance(coinbase));
    $("#NinjaBal").text(await NinjaNFTBalance(coinbase));


}


setNFT_ABI();


//return web3 view function

async function Time(){
    let PastTime = await Tiger.methods.checkTime().call();

    PastTime =  (86400 * 30) -  (PastTime % (86400 * 30));


    let PastDays = Math.trunc(PastTime/86400);

    let Pasthour =  Math.trunc((PastTime % 86400) / 3600);

    let Pastmin =  Math.trunc(((PastTime % 86400) % 3600)/60);
    console.log((PastTime % 86400));

    console.log(PastDays +" 天 " + Pasthour + " 小時 " + Pastmin +" 分鐘 " );

    $("#input3").val(PastDays +" 天 " + Pasthour + " 小時 " + Pastmin +" 分鐘 ");
}

async function ModClaimTime(){

    if(await CheckModAddress(coinbase)){
    let modTime = await Tiger.methods.MODtimer(coinbase).call();

    modTime =  (86400 * 30) -  (modTime % (86400 * 30));


    let PastDays = Math.trunc(modTime/86400);

    let Pasthour =  Math.trunc((modTime % 86400) / 3600);

    let Pastmin =  Math.trunc(((modTime % 86400) % 3600)/60);
    console.log((modTime % 86400));

    console.log(PastDays +" 天 " + Pasthour + " 小時 " + Pastmin +" 分鐘 " );

    $("#input3").val(PastDays +" 天 " + Pasthour + " 小時 " + Pastmin +" 分鐘 ");

    }else{
        $("#input3").val("0");
    }

}

async function AirdropCheck(address){
    let value = await Tiger.methods.airdrop_Check(address).call();

    return value;
}


async function NinjaNFTClaimCheck(address){
    let value = await Tiger.methods.Check_Ninja_Token(address).call();

    return value;
}

async function TigerNFTClaimCheck(address){
    let value = await Tiger.methods.Check_Tiger_Token(address).call();

    return value;
}

async function CheckModWithDraw(address){
    let value = await Tiger.methods.check_Mod_withDraw(address).call();

    return value;
}

async function CkeckDAO(){
    let value = await Tiger.methods.Check_Dao_withDraw_Amount().call();
    value = web3.utils.fromWei(value, 'ether');
    return value;
}


async function CheckModAddress(address){
    let check = await Tiger.methods.Tiger_MOD(address).call();

    return check;
}


async function TigerNFTBalance(address){
    let cjeck = await TigerNFT.methods.balanceOf(address).call();

    return cjeck;

}

async function NinjaNFTBalance(address){

    let cjeck = await NinjaNFT.methods.balanceOf(address).call();

    return cjeck;
}





//web3 excute function

async function NFTHolderClaim(){

    if(await NinjaNFTClaimCheck(coinbase) == 0 && await TigerNFTClaimCheck(coinbase) == 0 ){
        alert("你沒有東西可以提領");
        return;
    }

    await Tiger.methods.ClaimTigerToken().send({from:coinbase});

    window.location.reload();

}

async function ModwithDraw(){

    if(await CheckModWithDraw(coinbase) == 0 ){
        alert("目前不能提領");
        return;
    }

    await Tiger.methods.Mod_withDraw().send({from:coinbase})

    window.location.reload();
}

async function DaoClaim(){
    if(await CkeckDAO() == 0){

        return;
    }

    if(coinbase == '0x8c30f38C9c710AAec22D8E7A265Cc7B306167CD5'){
        await Tiger.methods.Dao_withDraw().send({from:coinbase});
    }else{
        alert("You are not the DAO owner");
    }


    window.location.reload();

}


async function ClaimAirdrop(){
    let valse = await AirdropCheck(coinbase);

    if(valse == 0){
        alert("nothing th claim");
    }

    await Tiger.methods.Airdrop().send({from:coinbase});

    window.location.reload();
}




