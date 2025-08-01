// screens/HelpScreen.tsx
import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HelpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nápověda</Text>

        <Text style={styles.sectionTitle}>Jak používat aplikaci?</Text>
        <Text style={styles.paragraph}>
          Na hlavní stránce najdete výběr doporučených a nových rozborů. Pomocí záložky "Prozkoumat" můžete vyhledávat konkrétní knihy podle názvu nebo autora. V sekci "Knihovna" si můžete uložit své oblíbené tituly.
        </Text>

        <Text style={styles.sectionTitle}>Co dělat, když nenajdu knihu?</Text>
        <Text style={styles.paragraph}>
          Databáze rozborů se průběžně rozšiřuje. Pokud vám nějaké dílo chybí, napište nám — rádi jej do budoucna zařadíme.
        </Text>

        <Text style={styles.sectionTitle}>Musím mít placené členství?</Text>
        <Text style={styles.paragraph}>
          Základní verze aplikace je zdarma. Některé rozbory však mohou být dostupné pouze pro členy s aktivním předplatným.
        </Text>

        <Text style={styles.sectionTitle}>Kontakt na podporu</Text>
        <Text style={styles.paragraph}>
          Pokud narazíte na chybu, nebo si s něčím nevíte rady, napište nám na:
        </Text>
        <Text style={styles.email}>info@digiknihy-snadne.cz</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpScreen;

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
