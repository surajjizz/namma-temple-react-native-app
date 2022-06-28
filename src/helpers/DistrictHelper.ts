import {IDistrict} from '../interface/IDistrict';
import DistrictStore from '../mobx-store/DistrictStore';
import RootStore from '../mobx-store/RootStore';
import {ResourceService} from '../services/Service';
import Function from '../utils/Function';

class DistrictHelper {
  districtStore: DistrictStore;

  constructor() {
    this.districtStore = RootStore.districtStore;
  }

  getDistricts = async () => {
    var resDistricts: IDistrict[] = [];
    this.districtStore.isLoading = true;
    resDistricts = await ResourceService().getResponse('district?page_size=50');
    this.districtStore.isLoading = false;
    if (resDistricts && resDistricts.length > 0) {
      this.districtStore.districts = resDistricts;
    } else {
      this.districtStore.districts = [];
    }
  };
}

export default new DistrictHelper();
