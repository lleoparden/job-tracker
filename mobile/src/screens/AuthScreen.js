import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function AuthScreen({ navigation }) {
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAuth = async () => {
    setError('');
    setIsProcessing(true);

    try {
      if (authMode === 'register') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setEmail('');
      setPassword('');
      navigation.replace('MainTabs');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JobTracker</Text>
      <Text style={styles.subtitle}>
        {authMode === 'login' ? 'Welcome back!' : 'Create your account'}
      </Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, authMode === 'login' && styles.toggleActive]}
          onPress={() => setAuthMode('login')}
        >
          <Text style={authMode === 'login' ? styles.toggleTextActive : styles.toggleText}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, authMode === 'register' && styles.toggleActive]}
          onPress={() => setAuthMode('register')}
        >
          <Text style={authMode === 'register' ? styles.toggleTextActive : styles.toggleText}>
            Register
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!isProcessing}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!isProcessing}
          onSubmitEditing={handleAuth}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleAuth}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
        <Text style={styles.footerText}>
          {authMode === 'login'
            ? "Don't have an account? Register"
            : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0F7FA', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#20aae4', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 20 },
  toggleContainer: { flexDirection: 'row', marginBottom: 20, borderRadius: 12, backgroundColor: '#ccc' },
  toggleButton: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 12 },
  toggleActive: { backgroundColor: '#20aae4' },
  toggleText: { color: '#555', fontWeight: '500' },
  toggleTextActive: { color: '#fff', fontWeight: '600' },
  form: { width: '100%', marginBottom: 20 },
  input: { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 12, borderWidth: 1, borderColor: '#ccc' },
  button: { backgroundColor: '#20aae4', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  errorText: { color: 'red', marginBottom: 12, textAlign: 'center' },
  footerText: { color: '#20aae4', fontWeight: '500', textAlign: 'center' },
});