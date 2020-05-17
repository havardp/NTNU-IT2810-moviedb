import React, { useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, StatusBar, KeyboardAvoidingView } from 'react-native';
import { GET_ADDITIONAL_INFO } from "../../queries/movieQueries";
import { useQuery } from "@apollo/react-hooks";
import * as Animatable from 'react-native-animatable';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import serverURL from "../../serverURL.js";
import Reviews from "../components/Reviews.js";

const MIN_HEIGHT = 78;
const MAX_HEIGHT = 500;

const styles = StyleSheet.create({
image: {
  flex: 1,
  height: MAX_HEIGHT,
  width: Dimensions.get('window').width,
  alignSelf: 'stretch',
  resizeMode: 'contain',
},
title: {
  fontSize: 20,
  color: "#B22222",
},
name: {
  fontWeight: 'bold',
  color: "#B22222"
},
section: {
  padding: 20,
  borderBottomWidth: 1,
  borderBottomColor: '#000',
  backgroundColor: "#333"
},
sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: "#B22222"
},
sectionContent: {
  fontSize: 16,
  textAlign: 'justify',
  color: "#B22222"
},
keywords: {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  color: "#B22222"
},
keywordContainer: {
  backgroundColor: '#434343',
  borderRadius: 10,
  margin: 10,
  padding: 10,
},
keyword: {
  fontSize: 16,
  color: "#B22222",
},
titleContainer: {
  flex: 1,
  alignSelf: 'stretch',
  justifyContent: 'center',
  alignItems: 'center',
},
imageTitle: {
  color: 'white',
  backgroundColor: 'transparent',
  fontSize: 24,
},
navTitleView: {
  height: MIN_HEIGHT,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 16,
  opacity: 0,
},
navTitle: {
  color: 'white',
  fontSize: 18,
  backgroundColor: 'transparent',
},
view: {
  flex: 1,
  backgroundColor: "red"
}
});

const AdditionalDetailScreen = ({ navigation }) => {
  const movie = navigation.getParam("movie")
  const navTitleView = useRef(null);
  const scrollRef = useRef(null);

  const { loading, error, data } = useQuery(GET_ADDITIONAL_INFO, {
    variables: {
      id: movie.id
    }
  });

  if (loading) {
    return (
      <View>
        <Text>loading!</Text>
      </View>
    );
  }

  // If there happens to be an error we can console log it and return an error toast
  if (error) {
    return (
      <View>
        <Text>error</Text>
      </View>
    );
  }

  return (
    <>
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HeaderImageScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        ref={scrollRef}
        scrollViewBackgroundColor={"#333"}
        fadeOutForeground
        renderHeader={() => <ImageBackground source={{uri: serverURL + "/img/" + movie.poster}} style={styles.image} />}
        renderFixedForeground={() => (
          <Animatable.View
            style={styles.navTitleView}
            ref={navTitleView}
          >
            <Text style={styles.navTitle}>
              {movie.originalTitle}, ({movie.year})
            </Text>
          </Animatable.View>
        )}
      >
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}
        >
          <Text style={styles.title}>
            <Text style={styles.name}>{movie.originalTitle}</Text>, ({movie.year})
          </Text>
        </TriggeringView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Duration: {movie.contentRating === "" ? "Not found" : (movie.duration.substr(2) + "inutes")}</Text>
          <Text style={[styles.sectionTitle, {paddingTop: 10}]}>IMDB rating: {movie.imdbRating === "" ? "Not found" : movie.imdbRating}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Synopsis</Text>
          <Text style={styles.sectionContent}>{data.movie.storyline}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genres</Text>
          <View style={styles.keywords}>
            {movie.genres.map(genre => (
              <View style={styles.keywordContainer} key={genre}>
                <Text style={styles.keyword}>{genre}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actors</Text>
          <View style={styles.keywords}>
            {movie.actors.map(actor => (
              <View style={styles.keywordContainer} key={actor}>
                <Text style={styles.keyword}>{actor}</Text>
              </View>
            ))}
          </View>
        </View>
        <Reviews movieId={movie.id} scrollCallback={() => scrollRef.current.scrollToEnd()} />
      </HeaderImageScrollView>
    </KeyboardAvoidingView>
    </>
  );
}

export default AdditionalDetailScreen;
