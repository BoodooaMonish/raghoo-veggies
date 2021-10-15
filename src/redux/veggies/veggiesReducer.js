import { FETCH_VEGGIES_REQUEST, FETCH_VEGGIES_SUCCESS, FETCH_VEGGIES_FAILURE, UPDATE_STOCK_QUANTITY } from "./veggiesTypes";

const initalState = {
    data: [],
    loading: false,
    error: "",
};

//Sample JSON Veggies Store

// const initalState = {
//     data: [
//         {
//             discount: "0.00",
//             id: "2e3d6078-d4bb-11eb-9e32-cecd029e558e",
//             image: "bitterGourd-min.svg",
//             name: "Bitter Gourd",
//             standard_price: "20.00",
//             stock: "18",
//             unit_in_g: "500",
//             quantity: 0
//         },
//         {
//             discount: "6.00",
//             id: "2e4170d5-d4bb-11eb-9e32-cecd029e558e",
//             image: "broccoli-min.svg",
//             name: "Broccoli",
//             standard_price: "17.00",
//             stock: "80",
//             unit_in_g: "500",
//             quantity: 0
//         },
//         {
//             discount: "5.00",
//             id: "2e4517ee-d4bb-11eb-9e32-cecd029e558e",
//             image: "cabbage-min.svg",
//             name: "Cabbage",
//             standard_price: "25.00",
//             stock: "20",
//             unit_in_g: "500",
//             quantity: 0
//         },
//         {
//             discount: "10.00",
//             id: "2e490153-d4bb-11eb-9e32-cecd029e558e",
//             image: "carrot-min.svg",
//             name: "Carrots",
//             standard_price: "20.00",
//             stock: "80",
//             unit_in_g: "250",
//             quantity: 0
//         },
//         {
//             discount: "5.00",
//             id: "2e4ca06e-d4bb-11eb-9e32-cecd029e558e",
//             image: "cauliflower-min.svg",
//             name: "Cauliflower",
//             standard_price: "25.00",
//             stock: "20",
//             unit_in_g: "500",
//             quantity: 0
//         },
//         {
//             discount: "1.00",
//             id: "2e5017ca-d4bb-11eb-9e32-cecd029e558e",
//             image: "celery-min.svg",
//             name: "Celery",
//             standard_price: "15.00",
//             stock: "75",
//             unit_in_g: "250",
//             quantity: 0
//         },
//     ],
//     loading: false,
//     error: "",
// };

const veggiesReducer = (state = initalState, action) => {
    switch (action.type) {
        case FETCH_VEGGIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case FETCH_VEGGIES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: processData(action.payload),
                error: "",
            };

        case FETCH_VEGGIES_FAILURE:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload,
            };
        case UPDATE_STOCK_QUANTITY:
            return {
                ...state,
                data: updateQuantity(state.data),
            };
        default:
            return state;
    }
};

function processData(data) {
    let localCart = JSON.parse(window.localStorage.getItem("raghoo-veggies-cart"));
    let processedData = data;
    processedData.forEach((item) => {
        item.quantity = 0;
    });
    if (!localCart) {
        return processedData;
    } else {
        processedData.forEach((veggies) => {
            localCart.forEach((item) => {
                if (veggies.id === item.veggies_id) {
                    veggies.quantity = Number(item.quantity) || 0;
                }
            });
        });
        return processedData;
    }
}

function updateQuantity(data) {
    let localCart = JSON.parse(window.localStorage.getItem("raghoo-veggies-cart"));
    let processedData = data;
    processedData.forEach((item) => {
        item.quantity = 0;
    });
    processedData.forEach((veggies) => {
        localCart.forEach((item) => {
            if (veggies.id === item.veggies_id) {
                veggies.quantity = Number(item.quantity) || 0;
            }
        });
    });

    return processedData;
}

export default veggiesReducer;
