import { Image, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native'
import Constants from 'expo-constants';

//colors

export const Colors={
    primary:"#ffffff",
    secondary:"#E5E7EB",
    tertiary:"#1F2937",
    darkLight:"#9CA3AF",
    brand:"#6D28D9",
    green:"#10B981",
    red:"#EF4444"
}


const {primary,secondary,tertiary,darkLight,brand,green,red}=Colors;
const StatusBarHeight = Constants.statusBarHeight;

export const StyledContainer = styled.View`
    margin-vertical:0;
    flex:1;
    padding:25px;
    padding-top:${StatusBarHeight+10}px;
    background-color:${primary};
`
export const InnerContainer = styled.View`
    flex:1;
    width: 100%;
    align-items:center;
`;

export const PageLogo = styled.Image`
    width:250px;
    height:200px;
`
export const PageTitle = styled.Text`
    font-size:30px;
    text-align:center;
    font-weight:bold;
    color:${brand};
    padding:10px
`;

export const SubTitle = styled.Text`
    font-size:18px;
    margin-bottom:20px;
    font-weight:bold;
    color:${tertiary};
`

export const StyledFormArea=styled.View`
    width:90%;
`;

export const StyledTextInput=styled.TextInput`
    backgroundColor:${secondary};
    padding:15px;
    padding-left:55px;
    border-radius:5px;
    height:60px;
    margin-vertical:3px;
    margin-bottom:10px;
    color:${tertiary};
`;

export const StyledInputLabel=styled.Text`
    color:${tertiary};
    font-size:13px;
    text-align:left;
`;

export const LeftIcon = styled.View`
    left:15px;
    top:38px;
    position:absolute;
    z-index:1;
`;

export const RightIcon = styled.TouchableOpacity`
    right:15px;
    top:38px;
    position:absolute;
    z-index:1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding:15px;
    background-color:${brand};
    justify-content:center;
    align-items:center;
    border-radius:5px;
    margin-vertical:5px;
    height:60px;

    ${(props)=>props.google==true && `
        background-color:${grey};
        flex-direction:row;
        justify-content:center;
    `}

`;

export const StyledButton_Image = styled.TouchableOpacity`
    padding:15px;
    background-color:#E5E4E2;
    justify-content:center;
    align-items:center;
    border-radius:5px;
    height:60px;
    marginBottom:10px

    ${(props)=>props.google==true && `
        background-color:${green};
        flex-direction:row;
        justify-content:center;
    `}

`;


export const ButtonText=styled.Text`
    color:${primary};
    font-size:16px;

    ${(props)=>props.google==true && `
        padding : 25px;
        padding-top:0px;
        padding-bottom:0px;
    `}
`;
export const ButtonText_Image=styled.Text`
    color:#818589;
    font-size:16px;

    ${(props)=>props.google==true && `
        padding : 25px;
        padding-top:0px;
        padding-bottom:0px;
    `}
`;
export const MsgBox = styled.Text`
    text-align:center;
    font-size:13px;
`

export const Line=styled.View`
    height:1px;
    width:100%;
    background-color:${darkLight};
    margin-vertical:10px;
`

export const ExtraView=styled.View`
    justify-content:center;
    flex-direction:row;
    align-items:center;
    padding:10px;
`;

export const ExtraText=styled.Text`
    justify-content:center;
    flex-direction:row;
    color:${tertiary};
    font-size:15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
`

export const TextLinkContent =styled.Text`
    color:${brand};
    font-size:15px;
`