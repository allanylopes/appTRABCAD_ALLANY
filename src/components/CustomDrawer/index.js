import React from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

import { styles } from './styles';
import { DrawerActions, useNavigation } from '@react-navigation/core';

import { BackHandler } from 'react-native';



const CustomDrawer= FC = () => {
    const navigation=  any= useNavigation();

    async function logout() {
        Alert.alert('Sair', `Sair do Aplicativo?`, [
            {
                text: 'Não',
                style: 'cancel',
            },

            {
                text: 'Sim',
                onPress: async () => {
                    try {
                       // await AsyncStorage.clear();
                       // navigation.navigate('Home');
                       // Para sair do aplicativo:
                    BackHandler.exitApp();
                    } catch (error) {
                        Alert.alert('Não foi possivel sair, tente novamente!')
                    }
                }
            }
        ])
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#3F3F3F' }}>
            <Image style={styles.logo} source={require('../../../assets/logo2.png')} />

            <View style={{ width: '90%', backgroundColor: 'c1c1c1#', height: 0.5, alignSelf: 'center', marginBottom: 5, marginTop: 20 }}></View>

            <ScrollView
                style={styles.container}
            >
                <View>
                    <TouchableOpacity
                        style={styles.Pages}
                        onPress={() => {
                            navigation.navigate("Cadastro")
                            navigation.dispatch(DrawerActions.closeDrawer())
                        }}
                    >
                        <MaterialIcons style={styles.iconRegistered} name="people-alt" size={30} color="gray" />

                        <Text style={styles.PagesText}>Cadastrar Carro</Text>
                    </TouchableOpacity>


                </View>



            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => logout()}
                    style={styles.Sair}
                >
                    <MaterialIcons name="subdirectory-arrow-left" size={20} color="black" />
                    <Text style={styles.SairText}>Sair da Conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CustomDrawer;