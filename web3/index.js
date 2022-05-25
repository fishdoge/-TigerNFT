

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





//web3 excute function

async function NFTHolderClaim(){

    if(await NinjaNFTClaimCheck(coinbase) == 0 && await TigerNFTClaimCheck(coinbase) == 0 ){
        alert("你沒有東西可以提領");
        return;
    }

    await Tiger.methods.ClaimTigerToken().send({from:coinbase});

}

async function ModwithDraw(){

    if(await CheckModWithDraw(coinbase) == 0 ){
        alert("目前不能提領");
        return;
    }

    await Tiger.methods.Mod_withDraw().send({from:coinbase})
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

}


async function ClaimAirdrop(){
    let valse = await AirdropCheck(coinbase);

    if(valse == 0){
        alert("nothing th claim");
    }

    await Tiger.methods.Airdrop().send({from:coinbase});
}




async function changebutton(){
    btn1.onclick = async function test(){
        console.log("AAA");
    }
}


