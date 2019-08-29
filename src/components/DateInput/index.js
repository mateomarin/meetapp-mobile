import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateText } from './styles';

export default function DateInput({ date, onChange }) {
  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  function prevDay() {
    onChange(addDays(date, -1));
  }

  function nextDay() {
    onChange(addDays(date, 1));
  }

  return (
    <Container>
      <TouchableOpacity onPress={() => prevDay()}>
        <Icon name="chevron-left" color="#fff" size={40} />
      </TouchableOpacity>
      <DateText>{dateFormatted}</DateText>
      <TouchableOpacity onPress={() => nextDay()}>
        <Icon name="chevron-right" color="#fff" size={40} />
      </TouchableOpacity>
    </Container>
  );
}

DateInput.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
