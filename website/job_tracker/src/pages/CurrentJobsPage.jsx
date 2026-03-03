import { useCurrentJobs } from "../hooks/useCurrentJobs";
import CurrentJobsView from "../components/current-jobs/CurrentJobsView";

export default function CurrentJobsPage() {
  const currentJobs = useCurrentJobs();

  return <CurrentJobsView {...currentJobs} />;
}