

const Tiger_address = "";
let Tiger;

async function login_In_button(){
    await ethereum.request({ method: 'eth_requestAccounts' });
    window.location.reload();
}


async function setNFT_ABI(){

    Tiger_address = "";

    Tiger = new web3.eth.Contract(TigerABI,Tiger_address);

}

//return web3 view function


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



