import {IUserInfo} from '../interface/ILogin';
import {IReligion} from '../interface/IReligion';
import LocalStorage from './LocalStorage';

export default class AppStorage extends LocalStorage {
  static _KEYS = {
    USER_DETAILS: 'userDetails',
    RELIGIONS: 'religion',
    SELECTED_RELIGION: 'selectedReligion',
    LANGUAGE: 'language',
  };

  static setValue(key: string, value: any) {
    super.set(key, value);
  }

  static getValue(key: string, defaultValue: string = '') {
    if (super.get(key) !== null) {
      return super.get(key);
    } else return defaultValue;
  }

  static setUserDetails(userInfo: IUserInfo) {
    this.setValue(this._KEYS.USER_DETAILS, userInfo);
  }

  static async getUserDetails() {
    return await super.get(this._KEYS.USER_DETAILS);
  }

  static setReligions(religions: IReligion[]) {
    this.setValue(this._KEYS.RELIGIONS, religions);
  }

  static async getReligions() {
    return await super.get(this._KEYS.RELIGIONS);
  }

  static setLanguage(language: string) {
    this.setValue(this._KEYS.LANGUAGE, language);
  }

  static async getLanguage() {
    return await super.get(this._KEYS.LANGUAGE);
  }
}
