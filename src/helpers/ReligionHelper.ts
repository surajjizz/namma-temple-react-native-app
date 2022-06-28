import {IReligion} from '../interface/IReligion';
import ReligionStore from '../mobx-store/ReligionStore';
import RootStore from '../mobx-store/RootStore';
import {ResourceService} from '../services/Service';
import AppStorage from '../storage/AppStorage';
import Function from '../utils/Function';

class ReligionHelper {
  religionStore: ReligionStore;

  constructor() {
    this.religionStore = RootStore.religionStore;
  }

  getReligions = async () => {
    var resReligions: IReligion[] = [];
    this.religionStore.isLoading = true;
    resReligions = await ResourceService().getResponse('religion');
    this.religionStore.isLoading = false;
    if (resReligions && resReligions.length > 0) {
      this.religionStore.religions = resReligions;
      AppStorage.setReligions(resReligions);
    } else {
      this.religionStore.religions = [];
    }
  };
}

export default new ReligionHelper();
