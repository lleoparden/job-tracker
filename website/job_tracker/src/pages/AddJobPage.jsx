import AddJobForm from "../components/add-job/AddJobForm";
import { useAddJob } from "../hooks/useAddJob";

export default function AddJobPage() {
  const addJob = useAddJob();

  return <AddJobForm {...addJob} />;
}