import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Switch,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { RootTabScreenProps } from "../types";
import { useState } from "react";
import Colors from "../constants/Colors";
import Fan from "../assets/images/fan.png";
import Pump from "../assets/images/pump.png";

import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import { template } from "@babel/core";

export default function TabOneScreen() {
  const db = getDatabase();
  const [valueT, setvalueT] = useState(0);
  const [valueH, setvalueH] = useState(0);
  var switchFan = false;
  var switchPump = false;
  var valueFan = "ON";
  var valuePump = "ON";

  function WriteDataToFirebase(pump, fan) {
    set(ref(db, "VARIABLE/"), {
      Bom: pump,
      Quat: fan,
    });
  }
  function WriteData(temp, hum) {
    if (switchAuto) {
      set(ref(db, "VALUE/"), {
        Temp: temp,
        Humi: hum,
      });
    }
  }
  const [switchAuto, setswitchAuto] = useState(true);

  const onPressAuto = () => {
    setswitchAuto(!switchAuto);
    if (switchAuto) {
      onValue(ref(db, "DISPLAY/Temperature"), (snapshop) => {
        const teml = snapshop.val();
        onValue(ref(db, "VALUE/Temp"), (snapshop) => {
          if (teml >= snapshop.val()) {
            ref(db, "VARIABLE/Bom");
            switchPump = true;
            valuePump = "ON";
          } else {
            switchPump = false;
            valuePump = "OFF";
          }
        });
        WriteDataToFirebase(valuePump, valueFan);
      });
      onValue(ref(db, "DISPLAY/Humidity"), (snapshop) => {
        const humid = snapshop.val();
        onValue(ref(db, "VALUE/Humi"), (snapshop) => {
          if (humid >= snapshop.val()) {
            ref(db, "VARIABLE/Quat");
            switchFan = true;
            valueFan = "ON";
          } else {
            switchFan = false;
            valueFan = "OFF";
          }
        });
        WriteDataToFirebase(valuePump, valueFan);
      });
    }
  };
  

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 100,
          backgroundColor: "#1824D2",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <StatusBar barStyle={"light-content"} />
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: 20, color: "#eee", fontWeight: "bold" }}>
            AUTO
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 25,
            marginTop: 10,
          }}
        >
          <Button
            title={switchAuto ? "OFF" : "ON"}
            onPress={onPressAuto}
            color={switchAuto ? "#767577" : "#FFB02D"}
          />
        </View>
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
                  width: "80%",
                  height: "55%",
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
                  Nhập Độ Ẩm
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <TextInput
                  style={{
                    height: "50%",
                    width: "70%",
                    backgroundColor: "white",
                    borderRadius: 5,
                    textAlign: "center",
                  }}
                  autoCapitalize="none"
                  onChangeText={(text) => setvalueH(text)}
                />
                {WriteData(valueT, valueH)}
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
                  height: "55%",
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
                  Nhập Nhiệt Độ
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <TextInput
                  style={{
                    height: "50%",
                    width: "70%",
                    backgroundColor: "white",
                    borderRadius: 5,
                    textAlign: "center",
                  }}
                  autoCapitalize="none"
                  onChangeText={(text) => setvalueT(text)}
                />
                {WriteData(valueT, valueH)}
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

    backgroundColor: "#000987",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
