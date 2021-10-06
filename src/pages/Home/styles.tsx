import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
background-color: #141a29;
flex: 1;
padding: 8px 0;
`;

export const SearchContainer = styled.View`
height: 64px;
flex-direction: row;
align-items: center;
padding: 0 16px;
width: 100%;
margin-bottom: 16px;
`;

export const SearchInput = styled.TextInput`
height: 54px;
background-color: rgba(255,255,255,0.15);
border-radius: 50px;
width: 85%;
padding: 8px 16px;
font-size: 18px;
color: #fff;
`;

export const SearchButton = styled.TouchableOpacity`
width: 15%;
height: 54px;
align-items: center;
justify-content: center;
`;

export const CategoryContainer = styled.View`
padding: 0 16px;
`;

export const CategoryTitle = styled.Text`
color: #fff;
margin-bottom: 16px;
font-size: 18px;
font-weight: bold;
`;

export const MovieSlider = styled.FlatList`
height: 224px;
margin-bottom: 24px;
`;
