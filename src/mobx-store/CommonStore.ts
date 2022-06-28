import {action, makeObservable, observable} from 'mobx';
import { languageType } from '../interface/ICommon';

export default class CommonStore {
  @observable language: languageType = 'tamil';

  constructor() {
    makeObservable(this);
  }

  @action resetData() {
    this.language = 'tamil';
  }
}
