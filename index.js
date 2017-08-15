import axios from 'axios'
import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyDGzrENtq_Fv5Rld-ARX_uQu6EZts53bUM",
  authDomain: "finalchat-a7c35.firebaseapp.com",
  databaseURL: "https://finalchat-a7c35.firebaseio.com",
  projectId: "finalchat-a7c35",
  storageBucket: "finalchat-a7c35.appspot.com",
  messagingSenderId: "29973831793"
};
firebase.initializeApp(config);



export const FETCH_USERS = 'FETCH_USERS'
const URL = 'https://jsonplaceholder.typicode.com/users'
const rootRef = firebase.database().ref()

export function fetchAPI(){
return (dispatch) => {
  rootRef.on('value',snap => {
    dispatch({
      type:FETCH_USERS,
      payload:snap.val()
    })
  })
}
}

export function pushAPI(field1,field2){
    const uniqueKey = rootRef.push();
    return dispatch => rootRef.push({
      username:field1,
      text:field2,
      key:uniqueKey.getKey()
    })
}

export function removeAPI(removeKey){
  let newkey = removeKey.key
  return dispatch => rootRef.orderByChild('key').equalTo(newkey).once('child_added')
  .then(snap=> {
    snap.ref.remove();
  })
}
