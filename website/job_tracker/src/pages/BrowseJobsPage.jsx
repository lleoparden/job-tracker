import { useBrowseJobs } from "../hooks/useBrowseJobs";
import BrowseJobsView from "../components/browse-jobs/BrowseJobsView";

export default function BrowseJobsPage() {
  const browseJobs = useBrowseJobs();

  return <BrowseJobsView {...browseJobs} />;
}