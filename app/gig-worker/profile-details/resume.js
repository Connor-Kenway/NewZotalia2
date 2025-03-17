import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function SupabasePDFViewer() {
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchResumeUri = async () => {
      try {
        // const response = await api.get(`/gig-workers/download-document`);
        // console.log('Fetched gig worker resume:', response.data);
        //test user doesn't have resume. hardcoding the url for now
        // setSupabaseUrl(response.data);
        setSupabaseUrl("https://pfdihlvpjcltmuiymzse.supabase.co/storage/v1/object/public/resume//139W_1.pdf");
      } catch (error) {
        console.error('Failed to fetch gig worker resume:', error);
      }
    };
    fetchResumeUri();
  }, []);

  useEffect(() => {
    const checkPdfUrl = async () => {
      try {
        const response = await fetch(supabaseUrl, { method: 'HEAD' });
        console.log('PDF URL response:', {
          status: response.status,
          contentType: response.headers.get('content-type'),
          contentLength: response.headers.get('content-length')
        });
      } catch (error) {
        console.error('Error checking PDF URL:', error);
      }
    };

    if (supabaseUrl) {
      checkPdfUrl();
    }
  }, [supabaseUrl]);

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resume</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Swap Resume</Text>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close Modal</Text>
            <Text>Imagine the user is swapping out their resume..put this feature on the roadmap</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <WebView
        source={{ uri: supabaseUrl }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9F9',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#479696',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  closeButton: {
    backgroundColor: '#479696',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  webview: {
    flex: 1,
    backgroundColor: '#F5F9F9',
  },
});