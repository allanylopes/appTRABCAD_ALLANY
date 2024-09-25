import React,{useEffect, useState} from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, TextInput} from 'react-native';

import {useNavigation} from '@react-navigation/core';
import {Ionicons} from '@expo/vector-icons';

import {styles} from './style';
import {showMessage} from 'react-native-flash-message';

import api from '../../../services/api';

const Cadastro = FC = () => {
    const navigation = any =useNavigation();
    const[id, setId] = useState("");
    const[nome, setNome] = useState("");
    const[modelo, setModelo] = useState("");
    const[placa, setPlaca] = useState("");
    const[success,setSuccess] = useState(false);
    const[loading, setLoading] = useState(false);

async function saveData(){
    if(id == "" || nome == "" || modelo == "" || placa == "")
        {
            showMessage({
                message: "Erro ao Salvar",
                description: "Preencha todos os campos",
                type: 'warning',
            });
            return;
        }
        try{
            const obj={
                id: id,
                nome: nome,
                modelo: modelo,
                placa: placa,
            }
            const res = await api.post ("KadsCar/salvar.php" , obj);

            if(res.data.sucesso == false)
                {
                    showMessage({
                        message:"Erro ao Salvar",
                        description: res.data.mensagem,
                        type: 'warning',
                        duration: 3000,
                    });
                    return;
                }
                setSuccess(true);
                showMessage({
                    message:"Salvo com Sucesso",
                        description: "Registro Salvo",
                        type: 'success',
                        duration: 800,
                });
        }
        catch(error)
        {
            Alert,alert("Ops", "Alguma Coisa deu Errado");
            setSuccess(false);
        }
    
}
return (
    <View style={{ flex: 1, marginTop: 0, backgroundColor: '#000', }}>
        <View style={styles.Header}>
            
            {/*trocar a imagem*/}
            <Image style={styles.logo} source={require('../../../assets/logo2.png')} />         
    <TouchableOpacity
        onPress={ () =>  navigation.navigate("Home")}
    >
    <Ionicons style={{marginLeft:5, marginRight:5}} name="chevron-back-circle-outline" size={35} color="#FFF"></Ionicons>
    </TouchableOpacity>

        </View>

        <View style={styles.Title}>

                <Ionicons name="car-sport-outline" size={35} color="#ffffff" />
                    <Text style={styles.TitleText}>Cadastro de Carros</Text>
                </View>

        <ScrollView>  

            <View>  

            <Text style={styles.TitleInputs}>ID Usuário:</Text>

            <TextInput               
                placeholder="O id do seu carro é:"
                onChangeText={(text) => setId(text)}
                value={id}
                style={styles.TextInput}
            />
        </View>

        <View>  

            <Text style={styles.TitleInputs}>Nome:</Text>

            <TextInput               
                placeholder="Digite seu nome:"
                onChangeText={(text) => setNome(text)}
                value={nome}
                style={styles.TextInput}
            />
        </View>


        <View>
            <Text style={styles.TitleInputs}>Modelo:</Text>
            <TextInput
                placeholder="Digite a marca e modelo do carro:"
                onChangeText={(text) => setModelo(text)}
                value={modelo}
                style={styles.TextInput}

            />
        </View>

        <View>

            <Text style={styles.TitleInputs}>Placa:</Text>

            <TextInput
                placeholder="Digite a placa do carro:"
                onChangeText={(text) => setPlaca(text)}
                value={placa}
                style={styles.TextInput}

            />
        </View>


            <TouchableOpacity
                style={styles.Button}
                onPress={() => {
                    setSuccess(true);
                    saveData();
                    setSuccess(false);
                }}
            >
            
                <Text style={styles.ButtonText}>Salvar</Text>
            </TouchableOpacity>

            </ScrollView>                 

    </View>
);
}

export default Cadastro;

