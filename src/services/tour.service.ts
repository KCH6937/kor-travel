import status from '@modules/status-code.module';
import message from '@modules/message.module';
import { success, fail } from '@modules/response.module';
import openAPI from '@modules/open-api.module';
import areaMap from '@modules/area-code.module';

const processEntireTourData = async (
  area: string,
  detailArea: string,
  purpose: string,
  isStay: boolean
) => {
  try {
    const areaCode: number = areaMap.get(area) ?? 0;

    // 세부지역 정보 Open API 호출
    const tourDetailAreaInfo = await openAPI.getTourDetailAreaCodeAsJson(
      areaCode
    )!;

    // 세부지역 코드
    const detailAreaCode =
      tourDetailAreaInfo.data.response.body.items.item.find(
        (item: { name: string }) => item.name == detailArea
      ).code ?? 0;

    // 지역기반 관광지 정보 Open API 호출
    const tourInfo = await openAPI.getTourBasedAreaAsJson(
      areaCode,
      detailAreaCode
    );

    // 지역기반 관광지 정보 데이터 가공 처리
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

export default {
  processEntireTourData,
};
