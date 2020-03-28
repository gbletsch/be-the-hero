import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png'
import styles from './styles'

const Detail = () => {
  const navigation = useNavigation()
  const message = `
  Olá AAGUI.
  
  Estou entrando em contato pois gostaria de ajudar no seguinte caso:
  
  "Acabou o chocolate"
  
  Doando o valor de R$ 100,00.
  `

  const sendMail = () => {
    MailComposer.composeAsync({
      subject: 'Herói do caso: Acabou o chocolate',
      recipients: ['gbletsch@gmail.com'],
      body: message
    })
  }

  const sendWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=5548988052522&text=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name='arrow-left' size={28} color='#e02041' />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>AAGUI</Text>

        <Text style={styles.incidentProperty}>Caso:</Text>
        <Text style={styles.incidentValue}>Acabou o chocolate</Text>

        <Text style={styles.incidentProperty}>Valor:</Text>
        <Text style={styles.incidentValue}>R$ 100,00</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói deste caso.</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Detail
