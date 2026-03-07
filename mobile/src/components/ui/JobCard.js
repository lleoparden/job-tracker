import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function JobCard({ job, onStatusChange, onDelete }) {
  const navigation = useNavigation();

  const statusColors = {
    saved: '#bfdbfe',       // blue-100
    applied: '#bbf7d0',     // green-100
    interview: '#fef9c3',   // yellow-100
    offer: '#e9d5ff',       // purple-100
    rejection: '#fecaca',   // red-100
  };

  return (
    <View style={[styles.card, { borderColor: statusColors[job.status] || '#ddd' }]}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.company}>{job.company}</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={job.status}
          onValueChange={(value) => onStatusChange(job.userJobDocId, value)}
          style={styles.picker}
        >
          <Picker.Item label="Saved" value="saved" />
          <Picker.Item label="Applied" value="applied" />
          <Picker.Item label="Interview" value="interview" />
          <Picker.Item label="Offer" value="offer" />
          <Picker.Item label="Rejection" value="rejection" />
        </Picker>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { jobId: job.userJobDocId })}>
          <Text style={styles.viewButton}>View Details</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(job.userJobDocId)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 16, fontWeight: '600' },
  company: { color: '#555', marginBottom: 8 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 },
  picker: { height: 40, width: '100%' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  viewButton: { color: '#2563eb', fontWeight: '500' },
  deleteButton: { color: '#dc2626', fontWeight: '500' },
});