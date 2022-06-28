import {action, makeObservable, observable} from 'mobx';
import {IGod} from '../interface/IGod';

export default class GodStore {
  @observable gods: IGod[] = [];
  @observable districtBasedGods: IGod[] = [];
  @observable selectedGod: IGod = {
    id: 0,
    num_temples: 0,
    history_tamil: '',
    history_english: '',
    nick_name_tamil: '',
    nick_name_english: '',
    name_tamil: '',
    name_english: '',
    religion: 0,
    image_1: '',
    image_2: '',
    image_3: '',
    image_4: '',
    video_tamil: '',
    video_english: '',
  };
  @observable isLoading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action resetData() {
    this.gods = [];
    this.districtBasedGods = [];
    this.selectedGod = {
      id: 0,
      num_temples: 0,
      history_tamil: '',
      history_english: '',
      nick_name_tamil: '',
      nick_name_english: '',
      name_tamil: '',
      name_english: '',
      religion: 0,
      image_1: '',
      image_2: '',
      image_3: '',
      image_4: '',
      video_tamil: '',
      video_english: '',
    };
    this.isLoading = false;
  }
}
