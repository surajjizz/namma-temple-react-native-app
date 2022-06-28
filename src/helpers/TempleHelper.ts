import {ITemples} from '../interface/ITemple';
import ReligionStore from '../mobx-store/ReligionStore';
import RootStore from '../mobx-store/RootStore';
import TempleStore from '../mobx-store/TempleStore';
import {ResourceService} from '../services/Service';
import Function from '../utils/Function';

class TempleHelper {
  templeStore: TempleStore;
  religionStore: ReligionStore;

  constructor() {
    this.templeStore = RootStore.templeStore;
    this.religionStore = RootStore.religionStore;
  }

  getAllTemples = async () => {
    var resTemples: ITemples = {
      count: 0,
      next: '',
      previous: '',
      results: [],
    };
    var religionId = this.religionStore.selectedReligion.id;
    this.templeStore.isLoading = true;
    resTemples = await ResourceService().getResponse(
      `temple?religion_id=${religionId}&page_size=50`,
    );
    this.templeStore.isLoading = false;
    if (resTemples && resTemples?.results?.length > 0) {
      this.templeStore.temples = resTemples;
    } else {
      this.templeStore.temples = {
        count: 0,
        next: '',
        previous: '',
        results: [],
      };
    }
  };

  getTemplesByDistrict = async (districtId: any) => {
    var resTemples: ITemples = {
      count: 0,
      results: [],
    };
    var religionId = this.religionStore.selectedReligion.id;
    this.templeStore.isLoading = true;
    resTemples = await ResourceService().getResponse(
      `temple?religion_id=${religionId}&district_id=${districtId}&page_size=50`,
    );
    this.templeStore.isLoading = false;
    if (resTemples && resTemples?.results?.length > 0) {
      this.templeStore.filteredTemples = resTemples;
    } else {
      this.templeStore.filteredTemples = {
        count: 0,
        next: '',
        previous: '',
        results: [],
      };
    }
  };

  getTemplesByGod = async (godId: any) => {
    var resTemples: ITemples = {
      count: 0,
      results: [],
    };
    var religionId = this.religionStore.selectedReligion.id;
    this.templeStore.isLoading = true;
    resTemples = await ResourceService().getResponse(
      `temple?religion_id=${religionId}&god_id=${godId}&page_size=50`,
    );
    this.templeStore.isLoading = false;
    if (resTemples && resTemples?.results?.length > 0) {
      this.templeStore.filteredTemples = resTemples;
    } else {
      this.templeStore.filteredTemples = {
        count: 0,
        next: '',
        previous: '',
        results: [],
      };
    }
  };

  getTemplesByDistrictAndGod = async (districtId: any, godId: any) => {
    var resTemples: ITemples = {
      count: 0,
      results: [],
    };
    var religionId = this.religionStore.selectedReligion.id;
    this.templeStore.isLoading = true;
    resTemples = await ResourceService().getResponse(
      `temple?religion_id=${religionId}&district_id=${districtId}&god_id=${godId}&page_size=50`,
    );
    this.templeStore.isLoading = false;
    if (resTemples && resTemples?.results?.length > 0) {
      this.templeStore.filteredTemples = resTemples;
    } else {
      this.templeStore.filteredTemples = {
        count: 0,
        next: '',
        previous: '',
        results: [],
      };
    }
  };
}

export default new TempleHelper();
