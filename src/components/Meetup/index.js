import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  MeetupImage,
  MeetupTitle,
  MeetupInfo,
  MeetupDetails,
  MeetupDetail,
  MeetupDetailText,
  SignupButton,
  SignupButtonText,
} from './styles';

export default function Meetup({ item, cancel, onCancel, onSignUp }) {
  return (
    <Container>
      <MeetupImage source={{ uri: item.image.url }} />
      <MeetupInfo>
        <MeetupTitle>{item.title}</MeetupTitle>
        <MeetupDetails>
          <MeetupDetail>
            <Icon name="event" size={15} color="#999999" />
            <MeetupDetailText>{item.date}</MeetupDetailText>
          </MeetupDetail>
          <MeetupDetail>
            <Icon name="location-on" size={15} color="#999999" />
            <MeetupDetailText>{item.location}</MeetupDetailText>
          </MeetupDetail>
          <MeetupDetail>
            <Icon name="person" size={15} color="#999999" />
            <MeetupDetailText>Organizador: {item.user.name}</MeetupDetailText>
          </MeetupDetail>
        </MeetupDetails>
        {!cancel && (
          <SignupButton booked={item.booked} onPress={() => onSignUp()}>
            {!item.booked && !item.updating && (
              <SignupButtonText>Realizar Inscrição</SignupButtonText>
            )}
            {item.booked && !item.updating && (
              <SignupButtonText booked disabled>
                Inscrito
              </SignupButtonText>
            )}
            {item.updating && <ActivityIndicator size="small" color="#FFF" />}
          </SignupButton>
        )}
        {cancel && (
          <SignupButton onPress={() => onCancel()}>
            {!item.updating && (
              <SignupButtonText>Cancelar Inscrição</SignupButtonText>
            )}
            {item.updating && <ActivityIndicator size="small" color="#FFF" />}
          </SignupButton>
        )}
      </MeetupInfo>
    </Container>
  );
}

Meetup.defaultProps = {
  item: {
    booked: false,
    updating: false,
  },
  cancel: false,
  onCancel: () => {},
  onSignUp: () => {},
};

Meetup.propTypes = {
  item: PropTypes.shape({
    booked: PropTypes.bool,
    updating: PropTypes.bool,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }),
  cancel: PropTypes.bool,
  onCancel: PropTypes.func,
  onSignUp: PropTypes.func,
};
