
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { query } from 'firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet , View, Text, Image, TouchableOpacity} from 'react-native';
import { SIZES } from '../../constants';



const ChatHome = ({route,navigation}) => {
    const {itemId,picUrl} = route.params;
    const [users, setUsers] = useState(null);
    console.log(picUrl);

    const getUsers=async()=>{
        const users=await firestore().collection("users").where('uid','!=',itemId).get();
        // console.log(users);
        const allusers = users.docs.map((doc)=>doc.data());
        setUsers(allusers);
        // console.log(allusers);
    }

    useEffect(() => {
      navigation.setOptions({
          // headerRight: () => <ScreenHeaderBtn iconUrl={picUrl!=""?{uri:picUrl}:icons.menu} dimension="80%" />,
          headerRightContainerStyle:{marginRight:SIZES.medium},
          
      });
    }, [navigation]);

    useEffect(() => {
        getUsers();
    }, [])

    // const handlePress = () => {
    //     navigation.navigate("ChatScreen", {
    //       itemId: itemId,
    //       name:item.name,
    //     });
    //   }

    const RenderCard=({item})=>{
        return (
            <TouchableOpacity style={styles.mycard} onPress={()=>{
              navigation.navigate("ChatScreen", {
              senderitemId: itemId,
              name:item.name,
              rcvitemId:item.uid,
              picUrl:picUrl,
        });
            }}>
                <Image source={{uri:item.picture}} style={styles.img}/>
                <View>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>{item.email}</Text>
                </View>
            </TouchableOpacity>
        ) 
    }

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({item})=>(
            <RenderCard item={item}/>
        )}
        keyExtractor={item=>item.uid}
      />
    </View>
  )
}

export default ChatHome

const styles = StyleSheet.create({
    img:{
        width:60,
        height:60,
        borderRadius:30,
        backgroundColor:"green"
    },
    text:{
        fontSize:20,
        fontWeight:"bold",
        marginLeft:15,
    },
    mycard:{
        flexDirection:"row",
        padding:4,
        margin:4,
        backgroundColor:"white",
        borderBottomWidth:1,
        borderBottomColor:"grey"
    }
})