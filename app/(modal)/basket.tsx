import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import useBasketStore from '@/store/basketStore';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Link, useNavigation } from 'expo-router';
import SwipeableRow from '@/Components/SwipeableRow';

const Basket = () => {
    const { products, total, clearCart, reduceProduct } = useBasketStore();
    const [order, setOrder] = useState(false);


    const FEES = {
        service: 2.99,
        entrega: 5.99,
    }

    const startCheckout = () => {
        setOrder(true);
        clearCart();

    };


    return (
        <>
            {order && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fallSpeed={2500} fadeOut={true} />}
            {order && (
                <View style={{ marginTop: '50%', padding: 20, alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Obrigado!</Text>

                    <Link href={'/'} asChild>
                        <TouchableOpacity style={styles.orderBtn}>
                            <Text style={styles.footerText}>Novo Pedido</Text>
                        </TouchableOpacity>

                    </Link>


                </View>
            )}

            {!order && (
                <>
                    <FlatList
                        data={products}
                        ListHeaderComponent={() => (
                            <Text style={styles.section}>Items</Text>
                        )}
                        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.grey }}></View>}
                        renderItem={({ item }) => (
                            <SwipeableRow onDelete={() => reduceProduct(item)}>

                                <View style={styles.row}>
                                    <Text style={{ color: Colors.primary, fontSize: 18 }}>
                                        {item.quantity}x
                                    </Text>
                                    <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
                                    <Text style={{ fontSize: 18 }}>${item.price * item.quantity}</Text>
                                </View>
                            </SwipeableRow>
                        )}
                        ListFooterComponent={
                            <View>
                                <View style={{ height: 1, backgroundColor: Colors.grey }}></View>
                                <View style={styles.totalRow}>
                                    <Text style={styles.total}>Subtotal</Text>
                                    <Text style={{ fontSize: 18 }}>${total}</Text>
                                </View>

                                <View style={{ height: 1, backgroundColor: Colors.grey }}></View>
                                <View style={styles.totalRow}>
                                    <Text style={styles.total}>Servico</Text>
                                    <Text style={{ fontSize: 18 }}>${FEES.service}</Text>
                                </View>

                                <View style={{ height: 1, backgroundColor: Colors.grey }}></View>
                                <View style={styles.totalRow}>
                                    <Text style={styles.total}>Entrega</Text>
                                    <Text style={{ fontSize: 18 }}>${FEES.entrega}</Text>
                                </View>


                                <View style={{ height: 1, backgroundColor: Colors.grey }}></View>
                                <View style={styles.totalRow}>
                                    <Text style={styles.total}>Valor Total</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>${(total + FEES.service + FEES.entrega).toFixed(2)}</Text>
                                </View>
                            </View>
                        }
                    />
                    <View style={styles.footer}>
                        <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#fff' }}>
                            <TouchableOpacity style={styles.fullButton} onPress={startCheckout}>
                                <Text style={styles.footerText}>Pedido?</Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </View>
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        gap: 20,
        alignItems: 'center',
    },

    section: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        paddingHorizontal: 10,
    },

    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
    },

    total: {
        fontSize: 18,
        color: Colors.medium,

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
    fullButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 50,

    },

    footerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },


    orderBtn: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        width: 250,
        height: 50,
        justifyContent: 'center',
        marginTop: 20,
    },



});

export default Basket;