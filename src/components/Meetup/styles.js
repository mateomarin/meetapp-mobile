import styled from 'styled-components/native';

export const Container = styled.View`
  height: 345px;
  width: 100%;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
`;

export const MeetupInfo = styled.View`
  padding: 20px;
  flex: 1;
  justify-content: space-between;
`;

export const MeetupTitle = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: bold;
`;

export const MeetupImage = styled.Image`
  width: 100%;
  height: 150px;
`;

export const MeetupDetails = styled.View``;

export const MeetupDetail = styled.View`
  flex-direction: row;
  margin: 5px 0;
`;

export const MeetupDetailText = styled.Text`
  font-family: 'Helvetica';
  font-size: 13px;
  color: #999999;
  margin-left: 10px;
`;

export const SignupButton = styled.TouchableOpacity`
  background: ${props => (props.booked ? '#FFF' : '#f94d6a')};
  border: ${props => (!props.booked ? '1px solid #FFF' : '1px solid #f94d6a')};
  color: white;
  width: 295px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const SignupButtonText = styled.Text`
  color: ${props => (!props.booked ? '#FFF' : '#f94d6a')};
  font-family: 'Helvetica';
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
