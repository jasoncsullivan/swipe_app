import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { Card, Button } from "react-native-elements";
import Deck from "./src/Deck";

export default function App() {
  const renderCard = (item) => {
    return (
      <Card key={item.id}>
        <Card.Title>{item.text}</Card.Title>
        <Card.Divider />

        <View>
          <Text style={{ marginBottom: 10 }}>
            I can customize the card further.
          </Text>

          <Image
            source={{ uri: item.uri }}
            style={styles.image}
            resizeMode="cover"
          />

          <Button
            icon={{ name: "code" }}
            backgroundColor="03A9F4"
            title="View Now!"
          />
        </View>
      </Card>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <Card title="All Done!">
        <Text style={{ marginBottom: 10 }}> There's no more content here!</Text>
        <Button title="Get more!" backgroundColor="03A9F4" />
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Deck
        data={DATA}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: { height: 200, width: 200, alignSelf: "center", marginBottom: 10 },
});

const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri:
      "http://womantowomanmentoring.com/wp-content/uploads/2013/09/smiley-face.jpg",
  },
  {
    id: 2,
    text: "Card #2",
    uri:
      "http://womantowomanmentoring.com/wp-content/uploads/2013/09/smiley-face.jpg",
  },
  {
    id: 3,
    text: "Card #3",
    uri:
      "http://womantowomanmentoring.com/wp-content/uploads/2013/09/smiley-face.jpg",
  },
  {
    id: 4,
    text: "Card #4",
    uri:
      "http://womantowomanmentoring.com/wp-content/uploads/2013/09/smiley-face.jpg",
  },
  {
    id: 5,
    text: "Card #5",
    uri:
      "http://womantowomanmentoring.com/wp-content/uploads/2013/09/smiley-face.jpg",
  },
  {
    id: 6,
    text: "Card #6",
    uri:
      "http://womantowomanmentoring.com/wp-content/uploads/2013/09/smiley-face.jpg",
  },
  {
    id: 7,
    text: "Card #7",
    uri:
      "http://womantowomanmentoring.com/wp-content/uploads/2013/09/smiley-face.jpg",
  },
  {
    id: 8,
    text: "Card #8",
    uri:
      "http://womantowomanmentoring.com/wp-content/uploads/2013/09/smiley-face.jpg",
  },
];
