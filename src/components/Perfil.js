import React, { Component, useState } from 'react'
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import api from '../services/api'

export default class Perfil extends Component {

    state = {
        nome: '',
        foto: '',
        user: '',
        followers:0,
        following:0,
        Repos:"",
        nameRepo:""
       

    }

    loadNome = async (usuario) => {
        const response = await api.get('/'+usuario)
        const user = response.data

        const responseRepo = await api.get('/'+usuario+'/repos')
        const repo = responseRepo.data

        this.setState({
            nome: user.name,
            foto: user.avatar_url,
            followers:user.followers,
            following:user.following,
            qtdRepo:user.public_repos,
            nameRepo:repo[0].name
        })
    }
    // /users/afermanx/repos
    
    

    handleUser = (text) => {
        this.setState({ user: text })
    }

    handleButton = () => {
        this.loadNome(this.state.user)
        
    }

    render() {
        const pic = {
            uri: this.state.foto
        }

        return (
            <View style={ styles.container }>
                <Image style={ styles.foto } source={ pic } />

                <TextInput style={ styles.textInput } onChangeText={ this.handleUser } ></TextInput>
                <TouchableOpacity style={ styles.button } onPress={ this.handleButton } >
                    <Text style={ styles.buttonText }>Enviar</Text>
                </TouchableOpacity>
                <Text style={ styles.nome }>{ `Nome:${this.state.nome}` }</Text>
                <Text style={ styles.follow }>
                <Text >{ `Seguidores:${this.state.followers} ` }</Text>
                <Text >{ `Seguindo:${this.state.following}` }</Text>
                
                </Text>
                <Text style={ styles.follow }>{ `Repositórios:${this.state.qtdRepo}` }</Text>
                <Text style={ styles.follow }>{ `Repositórios:${this.state.nameRepo}` }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nome: {
      fontFamily: 'Roboto',
      fontSize: '2em',
      color: '#f55',
      fontWeight: 'bold'
    },

    follow: {
        fontFamily: 'Roboto',
        fontSize: '0.8em',
        color: '#f55',
        fontWeight: 'bold'
      },
    foto: {
        width: 200,
        height: 200,
        borderRadius: 100
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        height: 40, 
        backgroundColor: '#fff', 
        marginTop: 20, 
        borderRadius: 10,
        border: '5px solid',
        padding: 10, 
        fontSize: '1.2em', 
        textAlign: 'center', 
        color: '#f55'
    },
    button: {
        backgroundColor: '#f55',
        padding: 10,
        margin: 15,
        height: 40,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff'
    }
});