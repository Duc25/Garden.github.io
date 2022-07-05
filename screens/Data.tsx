import React, { useState } from 'react'
import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import "firebase/auth";
import {getDatabase, ref, onValue,set} from "firebase/database";
import  "firebase/firestore";
import  "firebase/functions";
import "firebase/storage";

const Data=()=>{
var valueFan="ON";
var valuePump="ON";
const db = getDatabase();
  
}
 
  
  const dbRefFan = ref(db,'VARIABLE/');
    onValue(dbRefFan, (snapshop) =>{
        if(snapshop.val()=="ON"){
            switchFan;
            valueFan="ON";
        }else if(snapshop.val()=="OFF"){
            setswitchFan;
            valueFan="OFF";
        }
    });
 

  
  const dbRefPump = ref(db,'VARIABLE/'+'Bom');
  onValue(dbRefPump, (snapshop) =>{
      if(snapshop.val()=="ON"){
          switchPump==true;
          valuePump="ON";
      }else if(snapshop.val()=="OFF"){
          switchPump==false;
          valuePump="OFF";
      }
  });
}
export default Data;