import axios from "axios";
import { FETCH_VEGGIES_REQUEST, FETCH_VEGGIES_SUCCESS, FETCH_VEGGIES_FAILURE, UPDATE_STOCK_QUANTITY, REMOVE_STOCK_QUANTITY } from "./veggiesTypes";

export const fetchVeggiesRequest = () => {
    return {
        type: FETCH_VEGGIES_REQUEST,
    };
};

export const fetchVeggiesSuccess = (veggies) => {
    return {
        type: FETCH_VEGGIES_SUCCESS,
        payload: veggies,
    };
};

export const fetchVeggiesFailure = (error) => {
    return {
        type: FETCH_VEGGIES_FAILURE,
        payload: error,
    };
};

export const updateStockQuantity = () => {
    return {
        type: UPDATE_STOCK_QUANTITY,
    };
};

// the action creator "fetchVeggies" fetches the veggies in JSON from a database and then save them to the redux store
export const fetchVeggies = () => {
    return (dispatch) => {
        dispatch(fetchVeggiesRequest());
        axios
            .get("/api/veggies.json")
            .then((response) => {
                const veggies = response.data;
                dispatch(fetchVeggiesSuccess(veggies));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchVeggiesFailure(errorMsg));
            });
    };
};
