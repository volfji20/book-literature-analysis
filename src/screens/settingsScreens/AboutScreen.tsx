// screens/AboutScreen.tsx
import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>O aplikaci</Text>

        <Text style={styles.paragraph}>
          Tato aplikace byla vytvořena jako studijní pomůcka pro studenty a zájemce o literaturu. Nabízí více než 300 rozborů klasických i moderních literárních děl, které pomáhají lépe porozumět obsahu, tématům a souvislostem jednotlivých knih.
        </Text>

        <Text style={styles.paragraph}>
          Cílem je poskytnout přehledné a kvalitní materiály pro přípravu k maturitě, zkouškám nebo jen pro osobní rozvoj. Obsah je psán srozumitelným jazykem a je pravidelně aktualizován.
        </Text>

        <Text style={styles.paragraph}>
          Věříme, že literatura je klíčem k hlubšímu pochopení světa i nás samotných. Děkujeme, že aplikaci používáte.
        </Text>

        <Text style={styles.sectionTitle}>Kontakt</Text>
        <Text style={styles.paragraph}>
          V případě jakýchkoliv dotazů nebo zpětné vazby nás kontaktujte na:
        </Text>
        <Text style={styles.email}>info@digiknihy-snadne.cz</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#052332',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2de07f',
    marginTop: 20,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 22,
    marginBottom: 15,
  },
  email: {
    fontSize: 14,
    color: '#2de07f',
    fontWeight: 'bold',
  },
});
