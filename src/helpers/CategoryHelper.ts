import {ICategory} from '../interface/ICategory';
import CategoryStore from '../mobx-store/CategoryStore';
import ReligionStore from '../mobx-store/ReligionStore';
import RootStore from '../mobx-store/RootStore';
import {ResourceService} from '../services/Service';
import Function from '../utils/Function';

class CategoryHelper {
  categoryStore: CategoryStore;
  religionStore: ReligionStore;

  constructor() {
    this.categoryStore = RootStore.categoryStore;
    this.religionStore = RootStore.religionStore;
  }

  getCategories = async () => {
    var resCategories: ICategory[] = [];
    var religionId = this.religionStore.selectedReligion.id;
    this.categoryStore.isLoading = true;
    resCategories = await ResourceService().getResponse(
      `category?religion_id=${religionId}`,
    );
    this.categoryStore.isLoading = false;
    if (resCategories && resCategories.length > 0) {
      this.categoryStore.categories = resCategories;
    } else {
      this.categoryStore.categories = [];
    }
  };
}

export default new CategoryHelper();
