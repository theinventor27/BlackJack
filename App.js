import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {DECKOFCARDS} from './Data/DECKOFCARDS';

const App = () => {
  const [Deck, SetDeck] = useState();
  const [myCards, setMyCards] = useState([]);
  const [opponentCards, setOpponentCards] = useState([]);

  const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
  const values = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ];

  const shuffleDeck = () => {
    var deckPlaceholder = DECKOFCARDS;
    for (let i = deckPlaceholder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deckPlaceholder[i], deckPlaceholder[j]] = [
        deckPlaceholder[j],
        deckPlaceholder[i],
      ];
    }
    SetDeck(deckPlaceholder);
  };

  const drawCards = () => {
    var deckPlaceholder = Deck;
    const drawnCard = deckPlaceholder.shift();
    SetDeck(deckPlaceholder);
    myCardsCopy = [...myCards];
    myCardsCopy.push(drawnCard);
    setMyCards(myCardsCopy);
    console.log(myCards);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <Text style={styles.opponentText}>Opponent:</Text>
      </View>
      <View style={styles.flatlistWrapper}>
        <Text style={styles.opponentText}>My Cards:</Text>
        <FlatList
          contentContainerStyle={{alignItems: 'center'}}
          numColumns={4}
          scrollEnabled={false}
          data={myCards}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View>
              <Image style={styles.cardImg} source={item.img} />
            </View>
          )}
        />
      </View>
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity style={styles.start}>
          <Text style={styles.startText}>Generate Deck</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={shuffleDeck} style={styles.start}>
          <Text style={styles.startText}>Shuffle Deck</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={drawCards} style={styles.start}>
          <Text style={styles.startText}>Draw Cards</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'darkgreen',
  },
  buttonsWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  opponentText: {
    marginLeft: 10,
    color: 'white',
  },
  flatlistWrapper: {
    height: 400,
  },
  myCardsItems: {
    color: 'white',
  },
  start: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
    height: 30,
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  startText: {
    textAlign: 'center',
  },
  cardImg: {
    height: 90,
    width: 60,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
