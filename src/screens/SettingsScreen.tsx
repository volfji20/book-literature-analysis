import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BackButton from '../components/BackButton';
import SettingsButton from '../components/SettingsButton';
import CustomText from '../components/CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsLabel from '../components/SettingsLabel';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <CustomText style={styles.title}>Nastavení</CustomText>
      </View>

      <View style={styles.section}>
        <CustomText style={styles.sectionTitle}>Předplatné</CustomText>


        <SettingsLabel label="Členství" value="Basic" />

          <SettingsButton
            title={'Upgraduj nyní'}
            textColor="#2de07f"
            name="right"
          />      
      </View>

      <View style={styles.section}>
        <CustomText style={styles.sectionTitle}>Informace</CustomText>

    <SettingsButton title="O nás" onPress={() => navigation.navigate('AboutScreen')} />

      <SettingsButton
        title={'Podmínky používání'}
        onPress={() => navigation.navigate('TermsScreen')}
      />

      <SettingsButton
        title={'Nápověda'}
        onPress={() => navigation.navigate('HelpScreen')}
      />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#052332',
  },
  header: {
    height: 60,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    padding: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  membershipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#063142',
    marginHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  label: {
    color: '#ccc',
    fontSize: 14,
  },
  value: {
    color: '#ccc',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Settings;
