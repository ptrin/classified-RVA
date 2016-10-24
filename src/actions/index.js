export const GET_ADS = 'GET_ADS';
export const REMOVE_AD = 'REMOVE_AD';

export function getAds() {
    return {
        type: GET_ADS
    }
}

export function removeAd(adId) {
    return {
        type: REMOVE_AD,
        adId
    }
}
