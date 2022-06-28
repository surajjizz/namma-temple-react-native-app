import {action, makeObservable, observable} from 'mobx';
import {IDistrict} from '../interface/IDistrict';

export default class DistrictStore {
  @observable districts: IDistrict[] = [];
  @observable selectedDistrict: IDistrict = {
    id: 0,
    history_tamil: '',
    history_english: '',
    festival_tamil: '',
    festival_english: '',
    tourist_tamil: '',
    tourist_english: '',
    food_tamil: '',
    food_english: '',
    name_tamil: '',
    name_english: '',
    population: '',
    area: '',
    image_1: '',
    image_2: '',
    image_3: '',
    image_4: '',
    latitude: '',
    longitude: '',
    num_temples: 0,
    video_tamil: '',
    video_english: '',
  };
  @observable formDistrictErrors: any = {};
  @observable isLoading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action resetData() {
    this.districts = [];
    this.isLoading = false;
    this.selectedDistrict = {
      id: 0,
      history_tamil: '',
      history_english: '',
      festival_tamil: '',
      festival_english: '',
      tourist_tamil: '',
      tourist_english: '',
      food_tamil: '',
      food_english: '',
      name_tamil: '',
      name_english: '',
      population: '',
      area: '',
      image_1: '',
      image_2: '',
      image_3: '',
      image_4: '',
      latitude: '',
      longitude: '',
      num_temples: 0,
      video_tamil: '',
      video_english: '',
    };
  }
}
