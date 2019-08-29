import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { MeetupList } from './styles';

export default function Inscricoes() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchMeetups() {
      const results = await api.get('bookings/session');
      setBookings(
        results.data.bookings.map(b => ({
          ...b,
          meetup: {
            ...b.meetup,
            date: format(parseISO(b.meetup.date), "d 'de' MMMM, 'às' HH'h'", {
              locale: pt,
            }),
          },
        }))
      );
    }
    fetchMeetups();
  }, []);

  async function cancelBooking(item) {
    setBookings(
      bookings.map(b => (b.id !== item.id ? b : { ...b, updating: true }))
    );
    try {
      await api.delete(`bookings/${item.id}`);
      Alert.alert(item.meetup.title, 'Inscrição cancelada com sucesso!', [
        { text: 'OK', onPress: () => {} },
      ]);
      setBookings(bookings.filter(m => m.id !== item.id));
    } catch (error) {
      Alert.alert('Erro', error.response.data.error, [
        { text: 'OK', onPress: () => {} },
      ]);
      setBookings(
        bookings.map(b => (b.id !== item.id ? b : { ...b, updating: false }))
      );
    }
  }

  return (
    <Background>
      <Header />
      <MeetupList
        data={bookings}
        keyExtractor={booking => String(booking.id)}
        renderItem={({ item }) => (
          <Meetup
            item={item.meetup}
            cancel
            onCancel={() => cancelBooking(item)}
          />
        )}
      />
    </Background>
  );
}

Inscricoes.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
