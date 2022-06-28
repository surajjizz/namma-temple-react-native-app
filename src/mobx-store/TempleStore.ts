import {action, makeObservable, observable} from 'mobx';
import {ITemple, ITemples} from '../interface/ITemple';

export default class TempleStore {
  @observable temples: ITemples = {
    count: 0,
    next: '',
    previous: '',
    results: [],
  };
  @observable filteredTemples: ITemples = {
    count: 0,
    next: '',
    previous: '',
    results: [],
  };
  @observable selectedTemple: ITemple = {
    id: 0,
    temple_id: '',
    history_tamil: '',
    history_english: '',
    contact_tamil: '',
    contact_english: '',
    location_tamil: '',
    location_english: '',
    direction_tamil: '',
    direction_english: '',
    festival_tamil: '',
    festival_english: '',
    special_tamil: '',
    special_english: '',
    prayer_tamil: '',
    prayer_english: '',
    consecration_tamil: '',
    consecration_english: '',
    open_time_tamil: '',
    open_time_english: '',
    name_tamil: '',
    name_english: '',
    deity_name_tamil: '',
    deity_name_english: '',
    video_id: '',
    latitude: '',
    longitude: '',
    god: 0,
    district: 0,
    star: 0,
  };
  @observable isLoading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action resetPostData() {
    this.selectedTemple = {
      id: 0,
      temple_id: '',
      history_tamil: '',
      history_english: '',
      contact_tamil: '',
      contact_english: '',
      location_tamil: '',
      location_english: '',
      direction_tamil: '',
      direction_english: '',
      festival_tamil: '',
      festival_english: '',
      special_tamil: '',
      special_english: '',
      prayer_tamil: '',
      prayer_english: '',
      consecration_tamil: '',
      consecration_english: '',
      open_time_tamil: '',
      open_time_english: '',
      name_tamil: '',
      name_english: '',
      deity_name_tamil: '',
      deity_name_english: '',
      video_id: '',
      latitude: '',
      longitude: '',
      god: 0,
      district: 0,
      star: 0,
    };
  }

  @action resetData() {
    this.temples = {
      count: 0,
      next: '',
      previous: '',
      results: [],
    };
    this.filteredTemples = {
      count: 0,
      next: '',
      previous: '',
      results: [],
    };
    this.isLoading = false;
    this.resetPostData();
  }
}
