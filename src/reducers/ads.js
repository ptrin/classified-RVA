import { GET_ADS, REMOVE_AD } from '../actions';

const initialState = [];

export default function ads(state = initialState, action) {
    switch (action.type) {
        case GET_ADS:
            return [
                {"adId":1119633612,"title":"Weight Lifting Equipment","imageUrl":"http://i.ebayimg.com/00/s/NjAwWDgwMA==/z/gfoAAOSwnGJWTkGN/$_2.JPG","price":" Please Contact","urgent":false,"reduced":false,"highlight":false},
                {"adId":1119964374,"title":"Two bass guitars","imageUrl":"http://i.ebayimg.com/00/s/ODAwWDYwMA==/z/lNwAAOSw7FRWT-PS/$_2.JPG","price":"$100.00","urgent":false,"reduced":false,"highlight":false},
                {"adId":1116124908,"title":"Ibanez EWB20WNE Exotic Woods Acoustic-Electric Bass","imageUrl":"http://i.ebayimg.com/00/s/NDUwWDgwMA==/z/ffwAAOSwT5tWPNRj/$_2.JPG","price":"$450.00","urgent":false,"reduced":false,"highlight":false},
                {"adId":1118339216,"title":"Ibanez Bass Acoustic-Electric AEB10E-DVS-27-01","imageUrl":"http://i.ebayimg.com/00/s/ODAwWDQ1MA==/z/p4AAAOSwlV9WR7mO/$_2.JPG","price":"$280.00","urgent":false,"reduced":false,"highlight":false},
                {"adId":1120187773,"title":"\"Couch For Sale\"","imageUrl":"http://i.ebayimg.com/00/s/NjAwWDgwMA==/z/EscAAOSwnipWUQkK/$_2.JPG","price":" Free","urgent":false,"reduced":false,"highlight":false},
                {"adId":1112387733,"title":"Electric Basses: Squier Classic Vibe 50s \u0026 Hondo Fame 830","imageUrl":"http://i.ebayimg.com/00/s/NDgyWDgwMA==/z/ZYUAAOSwA4dWKT4z/$_2.JPG","price":"$260.00","urgent":false,"reduced":false,"highlight":false}
            ];
            break;

        case REMOVE_AD:
            return state.filter((item) => {
                return item.adId != action.adId 
            });
            break;
        
        default:
            return state;
    }
}
