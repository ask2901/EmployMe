import { View, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import React, { useState, useCallback, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { Bubble ,InputToolbar} from 'react-native-gifted-chat'
import {kemal} from '../../assets/images/kemal.jpg'

const ChatScreen = ({route,navigation}) => {

  const {rcvitemId,senderitemId,name,picUrl} = route.params;
  const [messages, setMessages] = useState([])
  console.log(picUrl);

  useEffect(() => {
    const docid=senderitemId>rcvitemId ? senderitemId+"-"+rcvitemId:rcvitemId+"-"+senderitemId;
    firestore().collection("chatroom").doc(docid).collection("messages").orderBy("createdAt","desc").onSnapshot((querySnapshot)=>{
      const allmsg=querySnapshot.docs.map((doc)=>{
        const data=doc.data();
        if(data.createdAt){
            return{
              ...doc.data(),
              createdAt:data.createdAt.toDate(),
            }
        }
        else{
          return{
            ...doc.data(),
            createdAt:new Date(),
          }
        }
      })
      setMessages(allmsg);
    })
  }, [])

  const onSend =(messageArray) => {
    const msg=messageArray[0];
    const mymsg={
      ...msg,
      createdAt:new Date(),
      sentBy:senderitemId,
      sentTo:rcvitemId,
      
    }
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, mymsg)  
    )
    const docid=senderitemId>rcvitemId ? senderitemId+"-"+rcvitemId:rcvitemId+"-"+senderitemId;
    firestore().collection("chatroom").doc(docid).collection("messages").add({
      ...mymsg,
      createdAt:firestore.FieldValue.serverTimestamp(),
      user:{
        _id:senderitemId,
        avatar:picUrl,
      },
    })
    
  }
  

  return (
    <View style={{flex:1,backgroundColor:"#f5f5f5"}}>
    <GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
      user={{
        _id: senderitemId,
      }}
      // renderMessageImage={() => this.showImage}
      renderBubble={props => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: 'green'
              },
              left:{
                backgroundColor:"white"
              }
            }}
            textStyle={{
              right: {
                color: '#fff'
              }
            }}
          />
        )}}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{
                backgroundColor: 'white',
                borderTopColor: 'grey',
                padding: 3,
                
              }}
            />
          )
        }}
    />
    </View>
  )
}

export default ChatScreen
// /chatroom/lxtRdqkbaNa3ix7v7cajbL9eEyb2-UypHoPfu0APs2HhIfSzA2HEO6ee2