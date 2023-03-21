import axios from "axios";

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
    try {
        const {data : {data} } = await axios.get(
            `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, 
        {
            params: {
                bl_latitude: bl_lat ? bl_lat : '26.63391396387383',
                tr_latitude: tr_lat ? tr_lat : '20.379399971893',
                bl_longitude: bl_lng ? bl_lng : '92.68011532638876',
                tr_longitude: tr_lng ? tr_lng : '88.00861412192309',
                limit: '30',
                currency: 'USD',
                lunit: 'km',
                lang: 'en_US'
            },
            headers: {
                'X-RapidAPI-Key': 'b9c5ef41f0msh2f0e3d934dd479ep150855jsn15f93efa9d4b',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
              }

        });

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
