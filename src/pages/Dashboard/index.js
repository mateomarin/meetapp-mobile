import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { MeetupList } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchMeetups() {
      const results = await api.get('meetups', { params: { date: format(date, 'yyyy-MM-dd') } });
      let tagged_meetups = results.data.meetups;
      if (results.data.meetups.length === 0) {
        setEndReached(true);
      }
      const booking_results = await api.get('bookings', { params: { date } });
      const books = booking_results.data.bookings;
      if (books && books.length !== 0) {
        books.map(b => {
          tagged_meetups = tagged_meetups.map(m =>
            m.id !== b.meetup_id ? m : { ...m, booked: true }
          );
          return b;
        });
      }
      setMeetups(
        tagged_meetups.map(m => ({
          ...m,
          date: format(parseISO(m.date), "d 'de' MMMM, 'às' HH'h'", {
            locale: pt,
          }),
        }))
      );
    }
    fetchMeetups();
  }, [date]);

  async function loadMore() {
    const next = page + 1;
    const results = await api.get('meetups', {
      params: { date: format(date, 'yyyy-MM-dd'), page: next },
    });
    setPage(page + 1);
    if (!results.data.meetups || results.data.meetups.length === 0) {
      setEndReached(true);
      return;
    }
    setMeetups([...meetups, ...results.data.meetups]);
  }

  async function signUp(item) {
    if (item.booked) {
      return;
    }
    setMeetups(
      meetups.map(m => (m.id !== item.id ? m : { ...m, updating: true }))
    );
    try {
      await api.post('bookings', { meetup_id: item.id });
      setMeetups(
        meetups.map(m =>
          m.id !== item.id ? m : { ...m, updating: false, booked: true }
        )
      );
    } catch (error) {
      Alert.alert('Erro', error.response.data.error, [
        { text: 'OK', onPress: () => {} },
      ]);
      setMeetups(
        meetups.map(m => (m.id !== item.id ? m : { ...m, updating: false }))
      );
    }
  }

  return (
    <Background>
      <Header />
      <DateInput date={date} onChange={setDate} />
      <MeetupList
        data={meetups}
        keyExtractor={meetup => String(meetup.id)}
        onEndReached={() => !endReached && loadMore()}
        renderItem={({ item }) => (
          <Meetup item={item} onSignUp={() => signUp(item)} />
        )}
      />
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};
