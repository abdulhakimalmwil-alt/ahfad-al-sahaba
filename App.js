import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Pressable,
  TextInput,
} from 'react-native';

const categories = [
  { id: 'prophets', title: 'قصص الأنبياء', icon: '🌙' },
  { id: 'companions', title: 'قصص الصحابة', icon: '⭐' },
  { id: 'seerah', title: 'السيرة النبوية', icon: '🕌' },
  { id: 'manners', title: 'الأخلاق والآداب', icon: '📖' },
];

const stories = [
  {
    id: '1',
    title: 'قصة نبي الله نوح عليه السلام',
    category: 'prophets',
    icon: '⛵',
    description: 'قصة الصبر والثبات والإيمان بالله.',
    duration: 'قصة تربوية',
  },
  {
    id: '2',
    title: 'نبي الله إبراهيم عليه السلام',
    category: 'prophets',
    icon: '🌟',
    description: 'رحلة الإيمان والتوكل على الله.',
    duration: 'قصة تربوية',
  },
  {
    id: '3',
    title: 'أبو بكر الصديق رضي الله عنه',
    category: 'companions',
    icon: '📜',
    description: 'مواقف من الوفاء والصداقة والشجاعة.',
    duration: 'قصة تربوية',
  },
  {
    id: '4',
    title: 'عمر بن الخطاب رضي الله عنه',
    category: 'companions',
    icon: '⚖️',
    description: 'دروس في العدل والقوة والرحمة.',
    duration: 'قصة تربوية',
  },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedStory, setSelectedStory] = useState(null);

  const filteredStories = stories.filter((story) => {
    const matchesCategory =
      activeCategory === 'all' || story.category === activeCategory;

    const matchesSearch = story.title.includes(search.trim());

    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#102D25" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>☾</Text>
          <Text style={styles.appName}>أحفاد الصحابة</Text>
          <Text style={styles.tagline}>حكايات تهدي، وقيم تُبنى</Text>
        </View>

        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>أهلاً يا بطل! 🌟</Text>
          <Text style={styles.welcomeText}>
            أي حكاية جميلة بدك تكتشف اليوم؟
          </Text>
        </View>

        {selectedStory ? (
          <View style={styles.details}>
            <Pressable
              style={styles.backButton}
              onPress={() => setSelectedStory(null)}>
              <Text style={styles.backText}>→ العودة إلى القصص</Text>
            </Pressable>

            <View style={styles.storyArtwork}>
              <Text style={styles.artworkIcon}>{selectedStory.icon}</Text>
            </View>

            <Text style={styles.detailTitle}>{selectedStory.title}</Text>

            <Text style={styles.description}>{selectedStory.description}</Text>

            <View style={styles.notice}>
              <Text style={styles.noticeText}>
                هذه نسخة تجريبية. ستتم إضافة الفيديو بعد مراجعة مصدره والتأكد من
                ملاءمته للأطفال.
              </Text>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.searchBox}>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="ابحث عن قصة..."
                placeholderTextColor="#9BA9A2"
                style={styles.searchInput}
                textAlign="right"
              />
            </View>

            <Text style={styles.sectionTitle}>اكتشف عالماً من القصص</Text>

            <View style={styles.categories}>
              {categories.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    setActiveCategory(
                      activeCategory === item.id ? 'all' : item.id
                    )
                  }
                  style={[
                    styles.category,
                    activeCategory === item.id && styles.categoryActive,
                  ]}>
                  <Text style={styles.categoryIcon}>{item.icon}</Text>
                  <Text style={styles.categoryTitle}>{item.title}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>قصص مختارة</Text>
              <Pressable onPress={() => setActiveCategory('all')}>
                <Text style={styles.showAll}>عرض الكل</Text>
              </Pressable>
            </View>

            {filteredStories.length === 0 ? (
              <Text style={styles.empty}>لا توجد قصص مطابقة لبحثك.</Text>
            ) : (
              filteredStories.map((story) => (
                <Pressable
                  key={story.id}
                  style={styles.storyCard}
                  onPress={() => setSelectedStory(story)}>
                  <View style={styles.storyIconBox}>
                    <Text style={styles.storyIcon}>{story.icon}</Text>
                  </View>

                  <View style={styles.storyInfo}>
                    <Text style={styles.storyTitle}>{story.title}</Text>
                    <Text style={styles.storyDescription}>
                      {story.description}
                    </Text>
                    <Text style={styles.duration}>{story.duration}</Text>
                  </View>

                  <Text style={styles.playIcon}>◀</Text>
                </Pressable>
              ))
            )}
          </>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>أحفاد الصحابة</Text>
          <Text style={styles.footerText}>
            نتعلم من القصص، ونرتقي بالأخلاق.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3EA',
  },
  header: {
    backgroundColor: '#102D25',
    paddingTop: 36,
    paddingBottom: 30,
    paddingHorizontal: 22,
    alignItems: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  logo: {
    color: '#E7C779',
    fontSize: 43,
    marginBottom: 5,
  },
  appName: {
    color: '#F1D58F',
    fontSize: 29,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tagline: {
    color: '#D6E2D8',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  welcome: {
    margin: 18,
    padding: 20,
    backgroundColor: '#E8DFC1',
    borderRadius: 20,
  },
  welcomeTitle: {
    color: '#17392E',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  welcomeText: {
    color: '#52645A',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'right',
  },
  searchBox: {
    marginHorizontal: 18,
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E1E3D9',
  },
  searchInput: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    color: '#18372D',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#17392E',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginHorizontal: 20,
    marginBottom: 14,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  category: {
    width: '46%',
    margin: '2%',
    minHeight: 112,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E5D9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  categoryActive: {
    backgroundColor: '#DCE9DD',
    borderColor: '#386A50',
    borderWidth: 2,
  },
  categoryIcon: {
    fontSize: 29,
    marginBottom: 9,
  },
  categoryTitle: {
    color: '#244535',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  showAll: {
    color: '#467B56',
    marginHorizontal: 20,
    marginBottom: 14,
    fontWeight: 'bold',
  },
  storyCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 17,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECE9DF',
  },
  storyIconBox: {
    width: 64,
    height: 70,
    borderRadius: 13,
    backgroundColor: '#E8DFC1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyIcon: {
    fontSize: 30,
  },
  storyInfo: {
    flex: 1,
    marginHorizontal: 12,
    alignItems: 'flex-end',
  },
  storyTitle: {
    color: '#17392E',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  storyDescription: {
    color: '#69766E',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'right',
  },
  duration: {
    color: '#8B713A',
    fontSize: 11,
    marginTop: 6,
  },
  playIcon: {
    color: '#477855',
    fontSize: 16,
    marginHorizontal: 4,
  },
  details: {
    padding: 18,
  },
  backButton: {
    alignSelf: 'flex-end',
    padding: 12,
  },
  backText: {
    color: '#386A50',
    fontWeight: 'bold',
  },
  storyArtwork: {
    height: 190,
    borderRadius: 22,
    backgroundColor: '#17392E',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18,
  },
  artworkIcon: {
    fontSize: 76,
  },
  detailTitle: {
    color: '#17392E',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  description: {
    color: '#59675E',
    fontSize: 16,
    textAlign: 'right',
    marginTop: 12,
    lineHeight: 26,
  },
  notice: {
    backgroundColor: '#E8DFC1',
    padding: 16,
    borderRadius: 15,
    marginTop: 20,
  },
  noticeText: {
    color: '#51482F',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'right',
  },
  empty: {
    color: '#69766E',
    textAlign: 'center',
    padding: 25,
  },
  footer: {
    backgroundColor: '#102D25',
    padding: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  footerTitle: {
    color: '#F1D58F',
    fontSize: 19,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#D6E2D8',
    marginTop: 8,
    fontSize: 13,
    textAlign: 'center',
  },
});
