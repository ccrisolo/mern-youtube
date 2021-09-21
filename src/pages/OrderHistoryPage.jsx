import React from "react";
import * as usersService from '../utilities/users-service';

const OrderHistoryPage = () => {
    async function handleCheckToken() {
        const expDate = await usersService.checkToken()

        return console.log(expDate)
    }

    return (
        <>
            <h1>OrderHistoryPage</h1>
            <button onClick={handleCheckToken}>
                Check When My Login Expires
            </button>
        </>
    );
};

export default OrderHistoryPage;
