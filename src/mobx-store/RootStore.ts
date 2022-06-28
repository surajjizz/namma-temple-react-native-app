import CategoryStore from './CategoryStore';
import DistrictStore from './DistrictStore';
import GodStore from './GodStore';
import LoginStore from './LoginStore';
import ReligionStore from './ReligionStore';
import StarStore from './StarStore';
import TempleStore from './TempleStore';
import CommonStore from './CommonStore';
import {configure} from 'mobx';

class RootStore {
  commonStore: CommonStore;
  loginStore: LoginStore;
  religionStore: ReligionStore;
  districtStore: DistrictStore;
  godStore: GodStore;
  categoryStore: CategoryStore;
  starStore: StarStore;
  templeStore: TempleStore;

  constructor() {
    configure({
      enforceActions: 'never',
    });
    this.commonStore = new CommonStore();
    this.loginStore = new LoginStore();
    this.religionStore = new ReligionStore();
    this.districtStore = new DistrictStore();
    this.godStore = new GodStore();
    this.categoryStore = new CategoryStore();
    this.starStore = new StarStore();
    this.templeStore = new TempleStore();
  }
}

export default new RootStore();
