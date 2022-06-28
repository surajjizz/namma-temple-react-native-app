import {IStar} from '../interface/IStar';
import RootStore from '../mobx-store/RootStore';
import StarStore from '../mobx-store/StarStore';
import {ResourceService} from '../services/Service';
import Function from '../utils/Function';

class StarHelper {
  starStore: StarStore;

  constructor() {
    this.starStore = RootStore.starStore;
  }

  getStars = async () => {
    var resStars: IStar[] = [];
    this.starStore.isLoading = true;
    resStars = await ResourceService().getResponse(`star`);
    this.starStore.isLoading = false;
    if (resStars && resStars.length > 0) {
      this.starStore.stars = resStars;
    } else {
      this.starStore.stars = [];
    }
  };
}

export default new StarHelper();
