import { View, Text, StyleSheet, Image, TouchableOpacity, SectionList, ListRenderItem, ScrollView } from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import ParallaxScrollView from '@/Components/ParallaxScrollView';
import Colors from '@/constants/Colors';
import { loja } from '@/assets/data/loja';
import { Link, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useBasketStore from '@/store/basketStore';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Details = () => {
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);

    const opacity = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<TouchableOpacity[]>([]);

    const DATA = loja.produtos.map((item, index) => ({
        title: item.category,
        data: item.meals,
        index,
    }));

    const { items, total } = useBasketStore();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: Colors.primary,
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                </TouchableOpacity>

            ),
            headerRight: () => (
                <View style={styles.bar}>
                    <TouchableOpacity style={styles.roundButton}>
                        <Ionicons name="share-outline" size={24} color={Colors.primary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.roundButton}>
                        <Ionicons name="search-outline" size={24} color={Colors.primary} />
                    </TouchableOpacity>

                </View>
            ),
        });
    }, [navigation]);

    const selectCategory = (index: number) => {
        const selected = itemsRef.current[index];
        setActiveIndex(index);

        selected.measure((x) => {
            scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
        });
    };

    const onScroll = (event: any) => {
        const y = event.nativeEvent.contentOffset.y;

        if (y > 350) {
            opacity.value = withTiming(1);
        } else {
            opacity.value = withTiming(0);
        }
    };

    const renderItem: ListRenderItem<any> = ({ item, index }) => (
        <Link href={{ pathname: '/(modal)/dish', params: { id: item.id } }} asChild>
            <TouchableOpacity style={styles.item}>

                <View style={{ flex: 1 }}>
                    <Text style={styles.dish}>{item.name}</Text>
                    <Text style={styles.dishText}>{item.info}</Text>
                    <Text style={styles.dishText}>{item.price}</Text>
                </View>
                <Image source={item.img} style={styles.dishImage} />
            </TouchableOpacity>
        </Link>
    );

    return (
        <>
            <ParallaxScrollView
                scrollEvent={onScroll}
                backgroundColor={'#fff'}
                style={{ flex: 1 }}
                parallaxHeaderHeight={250}
                stickyHeaderHeight={100}
                renderBackground={() => <Image source={loja.img} style={{ height: 300, width: '100%' }} />}
                contentBackgroundColor={Colors.lightGrey}
                renderStickyHeader={() => (
                    <View key="sticky-header" style={styles.stickySection}>
                        <Text style={styles.stickySectionText}>{loja.name}</Text>
                    </View>
                )}
            >
                <View style={styles.detailsContainer}>
                    <Text style={styles.nomeLoja}>{loja.name}</Text>
                    <Text style={styles.descricacaoLoja}>
                        {loja.duration} . {loja.tags.map((tag, index) => `${tag}${index < loja.tags.length - 1 ? '.' : ''}`)}
                    </Text>
                    <Text style={styles.descricacaoLoja}>{loja.about}</Text>
                    <SectionList
                        contentContainerStyle={{ paddingBottom: 50 }}
                        keyExtractor={(item, index) => `${item.id + index}`}
                        scrollEnabled={false}
                        sections={DATA}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <View style={{ marginHorizontal: 16, height: 1, backgroundColor: Colors.grey }} />}
                        SectionSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.grey }} />}
                        renderSectionHeader={({ section: { title, index } }) => <Text style={styles.sectionHeader}>{title}</Text>}
                    />
                </View>
            </ParallaxScrollView>

            <Animated.View style={[styles.stickySegments, animatedStyles]}>
                <View style={styles.segmentsShadow}>
                    <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false}>
                        {loja.produtos.map((item, index) => (
                            <TouchableOpacity
                                ref={(ref) => (itemsRef.current[index] = ref!)}
                                key={index}
                                style={activeIndex === index ? styles.segmentButtonActive : styles.segmentButton}
                                onPress={() => selectCategory(index)}
                            >
                                <Text style={activeIndex === index ? styles.segmentTextActive : styles.segmentText}>{item.category}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Animated.View>

            {items > 0 && (
                <View style={styles.footer}>
                    <View style={styles.footerContainer}>
                        <Link href="/basket" asChild>
                            <TouchableOpacity style={styles.fullButton}>
                                <Text style={styles.basket}>{items}</Text>
                                <Text style={styles.footerText}>ver carrinho</Text>
                                <Text style={styles.basketTotal}>${total}</Text>
                            </TouchableOpacity>
                        </Link>

                    </View>
                </View>
            )}

        </>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: Colors.lightGrey,
    },

    stickySection: {
        backgroundColor: '#fff',
        marginLeft: 0,
        height: 77,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },

    stickySectionText: {
        fontSize: 20,
        margin: 10,
    },

    nomeLoja: {
        fontSize: 30,
        margin: 16,
    },

    descricacaoLoja: {
        fontSize: 16,
        margin: 16,
        lineHeight: 22,
        color: Colors.medium,
    },

    sectionHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 40,
        margin: 16,
    },

    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 8,
    },

    dishImage: {
        height: 80,
        width: 80,
        borderRadius: 4,
    },

    dish: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    dishText: {
        fontSize: 14,
        color: Colors.mediumDark,
        paddingVertical: 4,
    },

    segmentButton: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },

    segmentButtonActive: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },

    stickySegments: {
        position: 'absolute',
        height: 50,
        left: 0,
        right: 0,
        top: 100,
        backgroundColor: '#fff',
        overflow: 'hidden',
        paddingBottom: 4,
    },

    segmentsShadow: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        shadowColor: '#000',
        textShadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '100%',
    },

    segmentTextActive: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    segmentScrollView: {
        paddingHorizontal: 16,
        alignItems: 'center',
        gap: 20,
        paddingBottom: 4,
    },

    footer: {
        position: 'absolute',
        backgroundColor: '#fff',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        textShadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingTop: 20,
    },

    segmentText: {
        color: Colors.primary,
        fontSize: 16,
    },

    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
    },

    basket: {
        color: '#FFF',
        backgroundColor: '#1c67fc',
        fontWeight: 'bold',
        padding: 8,
        borderRadius: 2,

    },

    footerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },


    basketTotal: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    fullButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        height: 50,

    },

});

export default Details;
