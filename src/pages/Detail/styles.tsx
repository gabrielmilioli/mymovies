import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
background-color: #191a30;
`;

export const Header = styled.View`
z-index: 99;
position: absolute;
top: 24px;
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: row;
padding: 0 16px;
height: 46px;
`;

export const HeaderButton = styled.TouchableOpacity`
background-color: rgba(25,26,48, 0.7);
border-radius: 50px;
width: 46px;
height: 46px;
align-items: center;
justify-content: center;
`;

export const BannerImage = styled.Image`
height: 300px;
border-bottom-left-radius: 32px;
border-bottom-right-radius: 32px;
`;

export const LinkButton = styled.TouchableOpacity`
background-color: #e72f49;
border-radius: 50px;
width: 52px;
height: 52px;
align-items: center;
justify-content: center;
position: absolute;
top: 274px;
right: 16px;
`;

export const ContainerDetail = styled.ScrollView`
padding: 0 16px;
`;

export const Title = styled.Text`
color: #fff;
font-size: 22px;
font-weight: bold;
margin-top: 24px;
`;

export const Overview = styled.Text`
margin-top: 8px;
color: #fff;
font-size: 14px;
text-align: justify;
line-height: 18px;
`;

export const RateContainer = styled.View`
flex-direction: row;
align-items: center;
margin-top: 16px;
justify-content: space-between;
`;

export const RateTitle = styled.Text`
color: #fff;
font-size: 18px;
`;

export const GenreSlider = styled.FlatList`
height: 32px;
margin-top: 8px;
`;