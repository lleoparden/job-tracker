import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useCurrentJobs } from '../hooks/useCurrentJobs';
import JobCard from '../components/ui/JobCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function CurrentJobsScreen() {
  const { jobs, loading, error, changeStatus, removeJob } = useCurrentJobs();

  if (loading) return <LoadingSpinner />;
  if (error) return <Text style={styles.error}>{error}</Text>;
  if (jobs.length === 0) return <Text style={styles.empty}>No jobs yet 🚀</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {jobs.map(job => (
        <JobCard
          key={job.userJobDocId}
          job={job}
          onStatusChange={changeStatus}
          onDelete={removeJob}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  error: { color: '#dc2626', textAlign: 'center', marginTop: 20 },
  empty: { color: '#555', textAlign: 'center', marginTop: 20 },
});