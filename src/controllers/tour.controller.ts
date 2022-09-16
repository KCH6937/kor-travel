import { Request, Response } from 'express';
import tourService from '@services/tour.service';

const getTourInfo = async (req: Request, res: Response) => {
  const { area, detail_area: detailArea, purpose, is_stay: isStay } = req.body;

  const result = await tourService.processEntireTourData(
    area,
    detailArea,
    purpose,
    isStay
  );

  if (result.status === 200) {
    return res.status(result.status).send(result);
  } else {
    console.error(result);
    return res
      .status(result.status)
      .send({ status: result.status, message: result.message });
  }
};

export default {
  getTourInfo,
};
