import status from '@modules/status-code.module';
import message from '@modules/message.module';
import { success, fail } from '@modules/response.module';
import openAPI from '@modules/open-api.module';
import areaMap from '@modules/area-code.module';

const processEntireTourData = async (
  area: string,
  detailArea: string,
  // purpose: string,
  isStay: boolean
) => {
  try {
    // 해당하는 지역이 없을 경우 지역 무관으로 처리
    const areaCode: number = areaMap.get(area) ?? 0;

    // 세부지역 정보 Open API 호출
    const tourDetailAreaInfo = await openAPI.getTourDetailAreaCodeAsJson(
      areaCode
    )!;

    // 세부지역 코드
    const detailAreaCode =
      tourDetailAreaInfo.data.response.body.items.item?.find(
        (item: { name: string }) => item.name == detailArea
      )?.code ?? 0;

    //조건에 따른 관광지 정보 Open API 호출
    const tourInfo = await getTourByCondition(
      areaCode,
      detailAreaCode,
      // purposeCode,
      isStay
    );

    // 반환될 관광지 정보 데이터 가공 처리
    const processedTourInfo: TourInfo =
      tourInfo.data.response.body.items.item.map(
        (item: {
          title: string;
          addr1: string;
          firstimage: string;
          mapx: string;
          mapy: string;
        }) => {
          return {
            title: item.title,
            address: item.addr1,
            imageUrl: item.firstimage,
            mapX: item.mapx,
            mapY: item.mapy,
          };
        }
      );

    return success(status.OK, message.SUCCESS, processedTourInfo);
  } catch (error: any) {
    return fail(
      status.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR,
      error
    );
  }
};

const getAccommodation = async (areaCode: number, detailAreaCode: number) => {
  console.log('now developing');
  return null;
};

const getWeather = (areaCode: number) => {
  console.log('now developing');
  return null;
};

const getTourByCondition = async (
  areaCode: number,
  detailAreaCode: number,
  // purposeCode: number,
  isStay: boolean
): Promise<any> => {
  let tourInfo;
  if (areaCode === 0) {
    console.log('지역 무관 선택 - 전체 관광지 조회');
    tourInfo = await openAPI.getTourAnywhereAsJson();
  } else {
    if (detailAreaCode === 0) {
      console.log('세부지역 무관 선택 - 지역 기반 관광지 조회');
      tourInfo = await openAPI.getTourBasedAreaAsJson(areaCode, 0);
    } else {
      console.log('지역 및 세부지역 모두 선택 - 세부지역 기반 관광지 조회');
      tourInfo = await openAPI.getTourBasedAreaAsJson(areaCode, detailAreaCode);
    }
  }

  return tourInfo;
};

export default {
  processEntireTourData,
};
