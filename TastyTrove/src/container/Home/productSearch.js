import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import axios from 'axios';
import {filterByCategory, filterByMeal} from '../../utilites/constant';
import {useState, useMemo, useEffect, useCallback} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import styles from '../search/style';
import ImageWrapper from '../../components/FastImage';
import {getProductByItem} from '../../utilites/commonFunction';
export default function ProductSearch(props) {
  const {searchItem} = props.route.params;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (searchItem) {
      getProductByItem(searchItem).then(res => {
        console.log(res);
        setListItem(res);
        setLoading(false);
      });
    }

    return () => {
      abortController.abort(signal);
    };
  }, []);

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <TouchableOpacity
          style={{
            width: Dimensions.get('screen').width * 0.42,
            padding: 5,
            margin: 10,
            paddingVertical: 12,
            borderRadius: 8,
            elevation: 5,

            alignItems: 'center',
            backgroundColor: '#252830',
          }}>
          <ImageWrapper
            url={item.strMealThumb}
            style={[
              styles.imageStyle,
              {
                height: Dimensions.get('screen').width * 0.25,
                width: Dimensions.get('screen').width * 0.25,
                borderRadius: (Dimensions.get('screen').width * 0.25) / 2,
              },
            ]}
          />

          <Text
            numberOfLines={2}
            style={[styles.textLabel, {fontSize: 14, marginTop: 10}]}>
            {item.strMeal}
          </Text>
        </TouchableOpacity>
      );
    },
    [searchItem],
  );

  const onEndReached = useMemo(() => {
    setLoading(true);
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <Animated.View
        style={{
          //   opacity: opacity,
          //   position: 'absolute',
          padding: 15,
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: 10,
          flex: 1,
          zIndex: 99999,
          backgroundColor: '#2C2F38',
        }}>
        <TouchableOpacity style={styles.backIcon}>
          <Ionicons
            name={'chevron-back'}
            size={25}
            style={{
              alignSelf: 'center',
            }}
            onPress={() => navigation.goBack()}
            color={'#686F82'}
          />
        </TouchableOpacity>

        <Text style={[styles.headerLabel]}>{searchItem}</Text>
      </Animated.View>
    );
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {!loading ? (
        <Animated.FlatList
          initialNumToRender={5}
          windowSize={5}
          updateCellsBatchingPeriod={2}
          showsVerticalScrollIndicator={false}
          data={listItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={renderItem}
          onEndReached={onEndReached}
          ListHeaderComponent={renderHeader}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}
