import {action, makeObservable, observable} from 'mobx';
import {ICategory} from '../interface/ICategory';

export default class CategoryStore {
  @observable categories: ICategory[] = [];
  @observable selectedCategory: ICategory = {
    id: 0,
    num_temples: 0,
    name_tamil: '',
    name_english: '',
    navigation: 0,
    religion: 0,
  };
  @observable formCategoryErrors: any = {};
  @observable isLoading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action resetData() {
    this.categories = [];
    this.selectedCategory = {
      id: 0,
      num_temples: 0,
      name_tamil: '',
      name_english: '',
      navigation: 0,
      religion: 0,
    };
    this.isLoading = false;
  }
}
