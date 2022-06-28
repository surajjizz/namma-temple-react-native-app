import {action, makeObservable, observable} from 'mobx';
import {IStar} from '../interface/IStar';

export default class StarStore {
  @observable stars: IStar[] = [];
  @observable isLoading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action resetData() {
    this.stars = [];
    this.isLoading = false;
  }
}
