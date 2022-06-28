import AppStorage from '../storage/AppStorage';
import { Linking, Platform, Share, ToastAndroid } from 'react-native';
import { languageType } from '../interface/ICommon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigation/StackNavigator';

class Function {

  clearAllData(RootStore: any) {
    AppStorage.clearStorage();
    RootStore?.commonStore?.resetData();
    RootStore?.loginStore?.resetData();
    RootStore?.categoryStore?.resetData();
    RootStore?.districtStore?.resetData();
    RootStore?.religionStore?.resetData();
    RootStore?.godStore?.resetData();
    RootStore?.templeStore?.resetData();
    RootStore?.starStore?.resetData();
  }

  isValidEmail(text: any): boolean {
    let isValid: boolean = false;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === true) {
      isValid = true;
    } else {
      isValid = false;
    }
    return isValid;
  }

  urlParams(postDataObj: any): string {
    let postData = '';
    for (var key in postDataObj) {
      if (postData != '') {
        postData += '&';
      }
      postData += key + '=' + encodeURIComponent(postDataObj[key]);
    }
    return postData;
  }

  toast(msg: string = '') {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  }

  isPrevScreen(navigation: NativeStackNavigationProp<RootStackParams>): boolean {
    var available: boolean = false;
    if (navigation?.getState()?.routes?.length > 1) {
      available = true;
    } else {
      available = false;
    }
    return available;
  }

  navigateToGoogleMap(latitute: string, longitute: string) {
    var scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    var latLng = `${latitute},${longitute}`;
    var label = 'Custom Label';
    var mapUrl = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    if (mapUrl) {
      Linking.openURL(mapUrl);
    }
  }

  async socialShare() {
    try {
      const result = await Share.share({
        title: 'Namma Temple',
        message: `android ids, AppLink : https://www.google.com/`,
        url: 'https://www.google.com/',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  switchLanguage(language: languageType) {
    AppStorage.setLanguage(language);
    if (language === 'tamil') {
      console.log('tamil');
      // Store.dispatch(switchLanguage(languageTamil));
    } else {
      console.log('english');
      // Store.dispatch(switchLanguage(languageEnglish));
    }
  }
}

export default new Function();
