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
  const [Deck, SetDeck] = useState(DECKOFCARDS);
  const [myCards, setMyCards] = useState([]);
  const [opponentCards, setOpponentCards] = useState([]);
  const [money, setMoney] = useState(1500);
  //*The game needs to have various game states to figure out what to render on the screen.
  //*Null - the player has not started the game yet.
  //*Playing - starting hand has been dealt, player must decide if they will draw again or stand.
  //*Lost - Player has busted
  const [gamestate, setGamestate] = useState(null);
  const [myCount, setMyCount] = useState(0);
  const [opponentCount, setOpponentCount] = useState(0);

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

  const drawCard = (cards, setCards, times) => {
    const deckPlaceholder = Deck;
    var cardsCopy = [...cards];

    for (let i = 0; i < times; i++) {
      var drawnCard = deckPlaceholder.shift();
      SetDeck(deckPlaceholder);
      // Reset the cardsCopy array to the original value of the cards array
      cardsCopy.push(drawnCard);
      console.log(cardsCopy);
    }
    setCards(cardsCopy);
  };

  const startGame = () => {
    shuffleDeck();
    //Draw two cards for the player
    drawCard(myCards, setMyCards, 2);

    //Draw two cards for the dealer
    drawCard(opponentCards, setOpponentCards, 2);
    //Prompt the user pick if he wants to hit, or stand.
    setGamestate('playing');
  };

  const Hit = () => {
    drawCard(myCards, setMyCards, 1);
  };

  const StartButtonComponent = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => startGame()}
          style={styles.startGameButton}>
          <Text style={styles.startText}>Start</Text>
        </TouchableOpacity>
      </>
    );
  };

  const PlayingButtonSComponenet = () => {
    return (
      <>
        <TouchableOpacity onPress={() => Hit()} style={styles.startGameButton}>
          <Text style={styles.startText}>Hit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={console.log('stand')}
          style={styles.startGameButton}>
          <Text style={styles.startText}>Stand</Text>
        </TouchableOpacity>
      </>
    );
  };

  const keepTrackOfCardCount = (cards, setCount) => {
    let sum = 0;
    let aceCount = 0;
    //Check if card is an ace, if not, add to sum
    for (const obj in cards) {
      if (cards[obj].value == 'A') {
        if (sum + 11 <= 21) {
          aceCount++;
        } else {
          sum += cards[obj].value;
        }
      } else {
        sum += cards[obj].value;
      }
    }

    //add correct number of aces
    while (aceCount > 0) {
      if (sum + 11 <= 21) {
        sum += 11;
      } else {
        sum += 1;
      }
      aceCount--;
    }

    if (sum > 21) {
      sum = 'Busted!';
    }

    console.log(sum);
    setCount(sum);
  };

  useEffect(() => {
    keepTrackOfCardCount(myCards, setMyCount);
    keepTrackOfCardCount(opponentCards, setOpponentCount);
  }, [myCards, opponentCards]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.moneyTextWrapper}>
        <Text style={styles.moneyText}>${money}</Text>
      </View>

      <View style={styles.flatlistWrapper}>
        <View style={styles.PlayerContainer}>
          <Text style={styles.dealerText}>Dealer:</Text>
          <Text style={styles.countText}>{opponentCount}</Text>
        </View>
        <FlatList
          contentContainerStyle={{alignItems: 'center'}}
          numColumns={4}
          scrollEnabled={false}
          data={opponentCards}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View>
              <Image style={styles.cardImg} source={item.img} />
            </View>
          )}
        />
      </View>
      <View style={styles.flatlistWrapper}>
        <View style={styles.PlayerContainer}>
          <Text style={styles.dealerText}>My Cards:</Text>
          <Text style={styles.countText}>{myCount}</Text>
        </View>
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
        {gamestate === null ? (
          <StartButtonComponent />
        ) : gamestate === 'playing' ? (
          <PlayingButtonSComponenet />
        ) : (
          <HitButtonComponent />
        )}
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
  moneyText: {
    color: 'yellow',
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 10,
  },

  buttonsWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dealerText: {
    fontSize: 15,
    marginLeft: 10,
    color: 'white',
  },
  countText: {
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 15,
    color: 'white',
  },
  flatlistWrapper: {
    height: 300,
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
  startGameButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
    height: 60,
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
