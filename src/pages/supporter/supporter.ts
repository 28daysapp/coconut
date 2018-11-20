import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { SupporterProvider } from '../../providers/supporter/supporter'
import firebase from 'firebase';

/**
 * Generated class for the SupporterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supporter',
  templateUrl: 'supporter.html',
})
export class SupporterPage {
  type = 'supporter';
  
  firesupporterreviewsum = firebase.database().ref('/supporterreviewsum');
  public userList: Array<any>;
  public loadedUserList: Array<any>;
  public UserRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams, public chat: ChatProvider,
    public viewCtrl: ViewController, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public supporter: SupporterProvider
  ) {
    this.UserRef = firebase.database().ref('/users');
  }
  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.userList = this.userList.filter((v) => {
      if (v.username && q || v.uid && q) {
        if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.uid.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.userList.length);
  }
/*
  ratingsum(user){
    console.log(user.username+"-1");
    var sum;
    var reviewrating;
    this.firesupporterreviewsum.child(user.uid).once("value").then((snapshot) => {
      reviewrating = snapshot.val();
      console.log(reviewrating+"-3");
      if (reviewrating == null) {
        return 0;
      }
      else {
        sum = reviewrating.ratingA + reviewrating.ratingB + reviewrating.ratingC + reviewrating.ratingD
        sum = sum + (reviewrating.count * 4);
        console.log(sum+"-2");
        return sum;
      }
    });
  }
*/

  initializeItems(): void {
    this.userList = this.loadedUserList;
  }
  ionViewWillEnter() {
    this.UserRef.on('value', userList => {
      let users = [];
      userList.forEach(user => {
        users.push(user.val());
        return false;
      });
      this.userList = users;
      this.loadedUserList = users;
    });
  }
  supporterreview(user) {
    this.navCtrl.push('SupporterreviewPage',
      {
        user: user
      });
  }
  gooperator(){
    this.navCtrl.push('OperatorPage');
  }
  
}
/*
  sendRequest() {
    this.chat.initializebuddy(this.userList);
    this.navCtrl.push('SupporterchatPage').then(() => {
      var index = this.viewCtrl.index;
      this.navCtrl.remove(index);
    });
  }
}
  
    ionViewWillEnter() {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      this.userp.getallUserprofiles().then((res) => {
        this.userprofiles = res;
      });
      this.loading.dismiss();
    }
    */
  /*ionViewWillEnter() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.count = 0;
    this.chat.getallusersExceptbuddy().then((res) => {
      console.log('SupporterPage - getallusersExceptbuddy - userprofiles : ' + JSON.stringify(res));
      this.userprofiles = res;
      this.usernum = this.userprofiles.length;
      if (this.usernum == 0) {
        let alert = this.alertCtrl.create({
          title: '대화 가능한 서포터가 없습니다.',
          message: '현재 대화 중인 서포터를 제외한 다른 서포터가 없습니다.',
          buttons: [
            {
              text: '확인',
              role: 'cancel',
              handler: () => {
                this.loading.dismiss();
                this.navCtrl.setRoot('HomePage');
              }
            }
          ]
        });
        alert.present();
      } else {

        this.user = this.userprofiles[this.count];
        console.log(this.user.uid)
        this.supporter.getreviewrating(this.user.uid).then((reviewrating) => {
          this.reviewrating = reviewrating;
          if (this.reviewrating == null) {
            this.ratingsA = this.makeRating(0);
            this.ratingsB = this.makeRating(0);
            this.ratingsC = this.makeRating(0);
            this.ratingsD = this.makeRating(0);
          } else {
            this.ratingsA = this.makeRating(this.reviewrating.ratingA / this.reviewrating.count);
            this.ratingsB = this.makeRating(this.reviewrating.ratingB / this.reviewrating.count);
            this.ratingsC = this.makeRating(this.reviewrating.ratingC / this.reviewrating.count);
            this.ratingsD = this.makeRating(this.reviewrating.ratingD / this.reviewrating.count);
          }
          this.loadComplete = true;
        });
        this.loading.dismiss();
      }
    });
  }*/
  /*
    nextSupporter() {
      if (this.usernum <= 1) {
        return;
      }
      this.count++;
      if (this.count == this.usernum) {
        this.count = 0;
      }
      this.user = this.userprofiles[this.count];
      console.log(this.user.uid)
      this.supporter.getreviewrating(this.user.uid).then((reviewrating) => {
        this.reviewrating = reviewrating;
        if (this.reviewrating == null) {
          this.ratingsA = this.makeRating(0);
          this.ratingsB = this.makeRating(0);
          this.ratingsC = this.makeRating(0);
          this.ratingsD = this.makeRating(0);
        } else {
          this.ratingsA = this.makeRating(this.reviewrating.ratingA / this.reviewrating.count);
          this.ratingsB = this.makeRating(this.reviewrating.ratingB / this.reviewrating.count);
          this.ratingsC = this.makeRating(this.reviewrating.ratingC / this.reviewrating.count);
          this.ratingsD = this.makeRating(this.reviewrating.ratingD / this.reviewrating.count);
        }
        this.loadComplete = true;
      });
    }
  */

  /*
    makeRating(num) {
      console.log('hi' + num);
      var ratings = [];
      for (var i = 1; i < 6; i++) {
        var rating: any = {};
        if (i <= num) {
          rating.src = 'assets/star-full.png';
        } else {
          rating.src = 'assets/star.png';
        }
        ratings.push(rating);
      }
      // console.log(JSON.stringify(ratings));
      return ratings;
    }
  
    supporterreview(user) {
      this.navCtrl.push('SupporterreviewPage',
        {
          user: user
        });
    }
  */