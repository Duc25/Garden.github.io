import { StyleSheet,
  Text, 
  View,
  StatusBar,
  Switch,
  Image,
  TextInput,
  Button,
  } from 'react-native';
  import React, { useState, useEffect, useRef } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { RootTabScreenProps } from '../types';

import Fan from "../assets/images/fan.png"
import Pump from "../assets/images/pump.png"


import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import "firebase/auth";
import {getDatabase, ref, onValue,set} from "firebase/database";
import  "firebase/firestore";
import  "firebase/functions";
import "firebase/storage";
import { onSnapshot } from 'firebase/firestore';

export default function TabOneScreen() {
  const fanCurrent = useRef(false)
  const pumpCurrent = useRef(false)
  useEffect(() => {
    
    const firebaseConfig = {
      apiKey: "AIzaSyCoqwBbJvccRpb6sj6QO4AB1CxWECPJj3k",
      authDomain: "garden-4ffef.firebaseapp.com",
      databaseURL: "https://garden-4ffef-default-rtdb.firebaseio.com",
      projectId: "garden-4ffef",
      storageBucket: "garden-4ffef.appspot.com",
      messagingSenderId: "513818263876",
      appId: "1:513818263876:web:a2ac69b11e818683b05711",
      measurementId: "G-31DJ97FS78"
    };
  
    const app = initializeApp(firebaseConfig);
    
  }, [])
  const db = getDatabase();


var valueFan="OFF";
var valuePump="OFF";
 function WriteDataToFirebase(pump,fan){
  set(ref(db,"VARIABLE/"),{
      Bom:pump,
      Quat:fan
  });
}
  const [switchFan,setSwitchFan]=useState(true);
  const onPressFan=()=>{
    setSwitchFan(!switchFan);
    fanCurrent.current = !fanCurrent.current
      if(switchFan){
          valueFan="ON";
      }else {
          valueFan="OFF";
      }
      WriteDataToFirebase(valuePump,valueFan);
      
      const dbRefFan = ref(db,"VARIABLE/Quat");
      onValue(dbRefFan, (snapshop) =>{
          if(snapshop.val()=="ON"){
              setSwitchFan(false)
              valueFan="ON";
          }else if(snapshop.val()=="OFF"){
              setSwitchFan(true)
              valueFan="OFF";
          }
      });
  };
  
  const [switchPump,setSwitchPump]=useState(false);
  const onPressPump=()=>{
    setSwitchPump(!switchPump)
    pumpCurrent.current = !pumpCurrent.current
      if(switchPump){
          valuePump="ON";
      }else{
          valuePump="OFF";
      }
      WriteDataToFirebase(valuePump,valueFan);

      const dbRefPump = ref(db,'VARIABLE/Bom');
      onValue(dbRefPump, (snapshop) =>{
        
          if(snapshop.val()=="ON"){
              setSwitchPump(false);
              valuePump="ON";
          }else if(snapshop.val()=="OFF"){
              setSwitchPump(true)
              valuePump="OFF";
          }
          
      });
     
  };
  
  console.log(switchFan)
  
  
  const temp = ref(db,'DISPLAY/Temperature');
  
  onValue(temp, (snapshop) =>{
    
     const tempe= snapshop.val()+"C";
     
    
  });
  
 
const valueHumid = ref(db,'DISPLAY/Humidity');
 onValue(valueHumid, (snapshot) =>{
   
   const humi=snapshot.val()+" %";
   
   
});
  



  return (
    <View style={styles.container}>
      <View
        style={{
          height: 100,
          backgroundColor: "#1824D2",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StatusBar barStyle={"light-content"} />
        <Text style={{ fontSize: 20, color: "#eee", fontWeight: "bold" }}>
          MANUAL
        </Text>
      </View>
      <View style={{ height: "100%", width: "100%" }}>
        {/* Hiển thị nhiệt độ độ ẩm */}
        <View
          style={{
            width: "100%",
            height: "20%",
            backgroundColor: "#9071FF",
            marginTop: 40,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 60,
          }}
        >
          <FontAwesome
            name="thermometer-empty"
            size={80}
            color="#fff"
            style={{ marginStart: 20 }}
          />
          <View>
         <Text style={{
          color:'black',
          fontSize:30,
          paddingStart: 20,
          
        }}
        
        >31°C</Text></View>
          <View style={{ flex: 1 }}></View>
          <FontAwesome
            name="tint"
            size={80}
            color="#fff"
            style={{ paddingEnd: 30 }}
          /><View>
          <Text style={{
          color:'black',
          fontSize:30,
          paddingEnd: 30,
          
        }}
        >67%</Text></View>
          {/*  */}
        </View>
        {/* List điều khiển */}
        <View style={{ flex: 1, marginTop: 20 }}>
          <View style={{ flexDirection: "row" }}>
            {/* List 1 */}
            <View
              style={{
                flex: 1,
                backgroundColor: "#28D945",
                borderRadius: 20,
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <Image
                source={Fan}
                style={{
                  width: "90%",
                  height: "50%",
                  marginTop: 30,
                  marginStart: 10,
                }}
              />
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Điều Khiển Quạt
                </Text>
              </View>
        
              <View style={{
                   
                   padding:10,
                   borderRadius:20
                  }}>
                <Button

                  title={fanCurrent.current ? "OFF" : "ON"}
                  
                  onPress={onPressFan}
                  color={fanCurrent.current ?'#767577':'#FFB02D'}
                  
                />
              </View>
            </View>
            {/* List2 */}
            <View
              style={{
                flex: 1,
                backgroundColor: "#FE6148",
                borderRadius: 20,
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <Image
                source={Pump}
                style={{
                  width: "80%",
                  height: "50%",
                  marginTop: 30,
                  marginStart: 20,
                }}
              />
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Điều Khiển Bơm
                </Text>
              </View>
              <View style={{
                   
                   padding:10,
                   borderRadius:20
                  }}>
                <Button

                  title={pumpCurrent.current ? "OFF" : "ON"}
                  
                  onPress={onPressPump}
                  color={pumpCurrent.current?'#767577':'#FFB02D'}
                  
                />
              </View>
            </View>
            
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor:'#000987'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'white'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
