import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { listJobs, updateJob, deleteJob } from '../services/api';
import JobCard from '../components/JobCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function CurrentJobsScreen() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await listJobs();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userJobDocId, status) => {
    try {
      const updated = await updateJob(userJobDocId, { status });
      setJobs(prev => prev.map(job => job.userJobDocId === userJobDocId ? updated : job));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (userJobDocId) => {
    try {
      await deleteJob(userJobDocId);
      setJobs(prev => prev.filter(job => job.userJobDocId !== userJobDocId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) return <Text style={styles.error}>{error}</Text>;
  if (jobs.length === 0) return <Text style={styles.empty}>No jobs yet 🚀</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {jobs.map(job => (
        <JobCard
          key={job.userJobDocId}
          job={job}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  error: {
    color: '#dc2626',
    textAlign: 'center',
    marginTop: 20,
  },
  empty: {
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
});