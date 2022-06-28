import {IGod} from '../interface/IGod';
import GodStore from '../mobx-store/GodStore';
import ReligionStore from '../mobx-store/ReligionStore';
import RootStore from '../mobx-store/RootStore';
import {ResourceService} from '../services/Service';
import Function from '../utils/Function';

class GodHelper {
  godStore: GodStore;
  religionStore: ReligionStore;

  constructor() {
    this.godStore = RootStore.godStore;
    this.religionStore = RootStore.religionStore;
  }

  getGods = async () => {
    var resGods: IGod[] = [];
    var religionId = this.religionStore.selectedReligion.id;
    this.godStore.isLoading = true;
    resGods = await ResourceService().getResponse(
      `god?religion_id=${religionId}&page_size=50`,
    );
    this.godStore.isLoading = false;
    if (resGods && resGods.length > 0) {
      this.godStore.gods = resGods;
    } else {
      this.godStore.gods = [];
    }
  };

  getGodsByDistrict = async (districtId: number) => {
    var resGods: IGod[] = [];
    var religionId = this.religionStore.selectedReligion.id;
    this.godStore.isLoading = true;
    resGods = await ResourceService().getResponse(
      `god?religion_id=${religionId}&district_id=${districtId}&page_size=50`,
    );
    this.godStore.isLoading = false;
    if (resGods && resGods.length > 0) {
      this.godStore.districtBasedGods = resGods;
    } else {
      this.godStore.districtBasedGods = [];
    }
  };
}

export default new GodHelper();
