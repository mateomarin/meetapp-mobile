import React from 'react';
import { Container, Logo } from './styles';

import logo from '~/assets/images/logo.png';

export default function Header() {
  return (
    <Container>
      <Logo source={logo} />
    </Container>
  );
}
