import axios from 'axios';

// ex) 강남구, 노원구, 구월동 ... as area code
const getTourDetailAreaCodeAsJson = async (areaCode: number): Promise<any> => {
  const url =
    'https://apis.data.go.kr/B551011/KorService/areaCode?numOfRows=50&pageNo=1&MobileOS=WIN&MobileApp=none&serviceKey=' +
    process.env.TOUR_SERVICE_ENCODE_KEY! +
    '&areaCode=' +
    areaCode +
    '&_type=json';

  return await axios.get(url);
};

// touristSpot order by hits
const getTourBasedAreaAsJson = async (
  areaCode: number,
  detailAreaCode: number
): Promise<any> => {
  console.log(areaCode, detailAreaCode);
  const url =
    'https://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=10&pageNo=1&MobileOS=WIN&MobileApp=none&serviceKey=' +
    process.env.TOUR_SERVICE_ENCODE_KEY! +
    '&_type=json&arrange=B&contentTypeId=12&areaCode=' +
    areaCode +
    '&sigunguCode=' +
    detailAreaCode;

  return await axios.get(url);
};

export default {
  getTourBasedAreaAsJson,
  getTourDetailAreaCodeAsJson,
};
