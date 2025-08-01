// screens/TermsScreen.tsx
import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TermsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Podmínky používání</Text>

        <Text style={styles.sectionTitle}>1. Úvod</Text>
        <Text style={styles.paragraph}>
          Tato aplikace poskytuje uživatelům přístup k rozborům vybraných literárních děl za účelem studijní podpory a osobního rozvoje. Používáním této aplikace souhlasíte s těmito podmínkami.
        </Text>

        <Text style={styles.sectionTitle}>2. Obsah a autorská práva</Text>
        <Text style={styles.paragraph}>
          Veškerý obsah aplikace (texty, rozbory, grafické prvky) je chráněn autorským právem a je určen výhradně pro osobní a nekomerční užití. Bez výslovného souhlasu autora nebo provozovatele nesmíte obsah kopírovat, šířit ani upravovat.
        </Text>

        <Text style={styles.sectionTitle}>3. Přístup k obsahu</Text>
        <Text style={styles.paragraph}>
          Některé části obsahu mohou být dostupné pouze pro uživatele s aktivním členstvím. Provozovatel si vyhrazuje právo měnit nabídku obsahu a podmínky členství.
        </Text>

        <Text style={styles.sectionTitle}>4. Omezení odpovědnosti</Text>
        <Text style={styles.paragraph}>
          Obsah aplikace slouží pouze pro informační a studijní účely. Přestože se snažíme o přesnost a kvalitu, neneseme odpovědnost za případné chyby nebo neúplné informace.
        </Text>

        <Text style={styles.sectionTitle}>5. Soukromí</Text>
        <Text style={styles.paragraph}>
          Aplikace nesbírá žádné osobní údaje. Nepožadujeme registraci ani nepoužíváme sledovací technologie.
        </Text>

        <Text style={styles.sectionTitle}>7. Kontakt</Text>
        <Text style={styles.paragraph}>
          V případě dotazů nás kontaktujte na: info@digiknihy-snadne.cz
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsScreen;

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
  },
});
