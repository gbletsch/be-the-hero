import React, { useEffect, useState } from 'react'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'

import logoImg from '../../assets/logo.png'
import styles from './styles'

const Incidents = () => {
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState([])
  const navigation = useNavigation()

  const navigateToDetail = () => {
    navigation.navigate('Detail')
  }

  const loadIncidents = async () => {
    try {
      const response = await api.get('incidents')
      setIncidents(response.data)
      setTotal(response.headers['x-total-count'])
    } catch (error) {
      window.alert('Problemas ao acessar banco de dados.')
    }
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo!!!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>Caso:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text
              style={styles.incidentValue}
            >
              {Intl.NumberFormat('pt-Br', { style: 'currency', currency: 'BRL' }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={navigateToDetail}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name='arrow-right' size={16} color='#e02041' />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

export default Incidents
