export const setToken = (code) => async (dispatch) => {
    const res = await fetch(`http://localhost:3001/token?code=${code}`, {method:'POST'});
    if(res.ok){
        const token = await res.json()
        dispatch({
            type:"SET_TOKEN",
            token
        })    
        return token;    
    }
}

export const getAccounts =  (token) => async (dispatch, getState) => {
    // const token = getState().auth.access_token;
    const res = await fetch(`http://localhost:3001/accounts`, {headers: {Authorization: `Bearer ${token}`}});
    if(res.ok){
        const accounts = await res.json();
        dispatch({
            type: "SET_ACCOUNTS",
            accounts
        })
    }
}

export const getTransactions =  (token, accountId) => async (dispatch, getState) => {
    // const token = getState().auth.access_token;
    const res = await fetch(`http://localhost:3001/transactions/${accountId}`, {headers: {Authorization: `Bearer ${token}`}});
    if(res.ok){
        const transactions = await res.json();
        dispatch({
            type: "SET_TRANSACTIONS",
            transactions
        })

        const reviewResults = reviewTransactions(transactions.results);
        dispatch({
             type: "SET_REVIEW_RESULTS",
             reviewResults
        })
        console.log('our review: ', reviewTransactions(transactions.results));
    }
}


export const reviewTransactions = (transactions) => {
    // transactions.results.filter(function(result) {
    //     const currentDate = new Date();
    //     const resultDate = new Date(result.timestamp);
    //     return resultDate.getFullYear() === currentDate.getFullYear() && resultDate.getMonth() !== currentDate.getMonth(); 
    // })

    const monthlySpending = transactions.reduce((currentObj, transaction)=>{
        const month = new Date(transaction.timestamp).getMonth();
        currentObj[month] = (currentObj[month] || 0) + transaction.amount;
        return currentObj
    }, {})

    console.log('this is our monthly spending', monthlySpending);
    let numMonthsSpendingMore = 0;
    let numMonthsSpendingLess = 0;
    
    Object.keys(monthlySpending).forEach((obj, month)=>{
        if(monthlySpending[month] > 0 ){
            numMonthsSpendingLess += 1;
        } else {
            numMonthsSpendingMore += 1;
        }
    })
    
    let spendsMoreThanEarns = (numMonthsSpendingMore / (numMonthsSpendingMore + numMonthsSpendingLess) >= 0.3);

    return {
        spendsMoreThanEarns
    }
 }