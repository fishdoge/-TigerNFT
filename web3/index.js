

const Tiger_address = "0xF07e42D0Fd586cc04B9abFE72dED7aa33f239d6d";
let Tiger;

async function login_In_button(){
    await ethereum.request({ method: 'eth_requestAccounts' });
    window.location.reload();
}

async function setCollent(){
    let account = await web3.eth.getAccounts();

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

    await Time();
    await CheckTigerCoinBalance();

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





//web3 excute function



