import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Warning } from './styles';

export default function Empty({msg}) {
  return (
    <Container>
      <Icon name="event-note" size={40} color="#FFF" />
      <Warning>{msg}</Warning>
    </Container>
  );
}
