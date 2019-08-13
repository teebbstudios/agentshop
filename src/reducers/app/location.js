import types from '../../constants';

const initialState = {
    longitude: null,
    latitude: null,
    cityName: null,
    cityId: null,
    alphabetAddressData: null,
    cityArray: [],
    locationCityName: null,
    locationCityId: null,
    allAddressData:[],
    pickerAllAddressData:[],
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case types.location.SET_LOCATION_POSITION:
            return Object.assign({}, state, {
                longitude: action.longitude,
                latitude: action.latitude,
            })
        case types.location.SET_SELECTED_CITY:
            return Object.assign({}, state, {
                cityName: action.cityName,
                cityId: action.cityId,
            })
        case types.location.SET_LOCATION_CITY:
            return Object.assign({}, state, {
                locationCityName: action.cityName,
                locationCityId: action.cityId,
            })
        case types.location.SET_LOCATION_INFO:
            return Object.assign({}, state, {
                longitude: action.longitude,
                latitude: action.latitude,
                cityName: action.cityName,
                cityId: action.cityId,
                locationCityName: action.locationCityName,
                locationCityId: action.locationCityId,
            })
        case types.location.SET_ALPHABET_ADDRESS_DATA:
            return Object.assign({}, state, {
                alphabetAddressData: action.data,
            })
        case types.location.SET_ALL_CITY_ARRAY:
            return Object.assign({}, state, {
                cityArray: action.data,
            })
        case types.location.SET_ALL_ADDRESS_DATA:
            return Object.assign({}, state, {
                allAddressData : action.allAddressData,
                pickerAllAddressData : action.pickerAllAddressData,
            })

        default:
            return state;
    }
}
