export const TOKEN_SYMBOL = (chainId : number) => {    
    if(Number(chainId) == 137) {
        return 'USDT'
    }
    if(Number(chainId) == 88888) {
        return 'wCHZ'
    }

    return '';
} 
