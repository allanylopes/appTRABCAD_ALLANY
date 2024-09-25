import React, {useEffect, useState} from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, RefreshControl, Alert, StatusBar} from 'react-native';

import {MaterialIcons} from '@expo/vector-icons';
import Load from '../../components/Load';
import {DrawerActions, useNavigation} from '@react-navigation/core';

import {useIsFocused} from '@react-navigation/native';

import api from '../../../services/api';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import { styles } from './style';

export default function Home(){
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const[dados,setDados] = useState([]);
    const[isLoading,setIsLoading] = useState(true);
    const[refreshing,setRefreshing] = useState(false);
    const[total,setTotal] = useState('');


    async function totalDadosCadastrados() {
        const res = await api.get('KadsCar/listar-cards.php');
    }
    async function getItem(id){
        navigation.navigate("Cadastro" , {id:id})
    }

    function mensagemDelete(id) {
        Alert.alert(
            "Excluir Registro",
            "Deseja excluir este registro?",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Sim", 
                    onPress: () => deleteItem(id)
                }
            ],
            { cancelable: true}
        )
    }

    async function deleteItem(id) {
        const res = await api.get('KadsCar/excluir.php?id=' + id);
        listarDados();
    }

    async function listarDados()
    {
        try{
            const res = await api.get('KadsCar/buscar.php');
            setDados(res.data.result);
        }
        catch(error)
        {
            console.log("Error ao Listar" + error);
        }
        finally{
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        listarDados();
    }, [isFocused]);

    const onRefresh = () => {
        setRefreshing(true);
        listarDados();
    }
    
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={styles.containerHeader}>

                        <TouchableOpacity
                            style={styles.menu}
                            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                        >
                            <MaterialIcons name="menu" size={35} color="black" />
                        </TouchableOpacity>
                        {/* logo imagem */}
                        <Image style={styles.logo} source={require('../../../assets/logo2.png')} />

                    </View>
                </View>



                {isLoading ?
                    <Load /> :

                    <ScrollView
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >

                        <View style={styles.circleProgressView}>
                            <View style={styles.textProgressContainer}>
                                <Text style={styles.textProgressTitle}>Quantidade de Corridas do Dia:</Text>
                                <Text style={styles.textProgress}>35 corridas efetudadas</Text>
                            </View>

                            <AnimatedCircularProgress
                                size={80}
                                width={8}
                                fill={35}
                                tintColor="#00e0ff"
                                backgroundColor="#e0e0e0"
                                lineCap={"round"}
                            >
                                {
                                    (fill) => (
                                        <Text style={styles.numberInside}>35</Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                        </View>


                        <View style={styles.containerBox}>

                            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                                <View>
                                    <View style={styles.box}>
                                        <MaterialIcons style={styles.iconRegistered} name="bar-chart" size={70} color="#000" />
                                        <View style={styles.textos}>
                                            <Text style={styles.rText}>ACESSAR CADASTRO</Text>
                                        <Text style={styles.lenghtText}>{total.total_usuarios}</Text>  
                                        </View>
                                    </View>
                                    <Text style={styles.textFooter}>Verificar Carro Cadastrado</Text>
                                    
                                </View>
                            </TouchableOpacity>

                        </View>



        {dados.map(item => (
        <View style={styles.griditem} key={item.id}><Text style={{color: '#585858'}}>{item.id} - {item.nome} - {item.modelo} - {item.placa}</Text>

    </View>
    ))}        

                    </ScrollView>
                }
            </View>
        </View>
    )
}