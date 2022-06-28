import { action, makeObservable, observable } from 'mobx';
import { IReligion } from '../interface/IReligion';

export default class ReligionStore {
  @observable religions: IReligion[] = [];
  @observable selectedReligion: IReligion = {
    id: 0,
    name_tamil: '',
    name_english: '',
    image: undefined
  };
  @observable isLoading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action resetData() {
    this.religions = [];
    this.selectedReligion = {
      id: 0,
      name_tamil: '',
      name_english: '',
      image: undefined
    }
    this.isLoading = false;
  }
}
