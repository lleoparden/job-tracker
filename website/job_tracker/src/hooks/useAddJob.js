import { useState } from "react";
import { createJob, fetchJobFromLink } from "../services/api";

const initialState = {
  jobLink: "",
  title: "",
  company: "",
  description: "",
  notes: "",
  tags: "",
  status: "saved",
  image: null,
};

export function useAddJob() {
  const [formData, setFormData] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [inputMode, setInputMode] = useState("link");

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const fetchFromLink = async () => {
    if (!formData.jobLink.trim()) return;

    setIsProcessing(true);
    try {
      const jobData = await fetchJobFromLink(formData.jobLink);

      setFormData((prev) => ({
        ...prev,
        title: jobData.title || prev.title,
        company: jobData.company || prev.company,
        description: jobData.description || prev.description,
        image: jobData.image || null,
      }));

      setInputMode("manual");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to fetch job details");
    } finally {
      setIsProcessing(false);
    }
  };

  const submitJob = async () => {
    if (
      (inputMode === "link" && !formData.jobLink.trim()) ||
      (inputMode === "manual" &&
        (!formData.title.trim() || !formData.company.trim()))
    ) {
      return;
    }

    setIsProcessing(true);

    try {
      await createJob(formData);

      setShowSuccess(true);

      setFormData(initialState);
      setInputMode("link");

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Error saving job. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    formData,
    isProcessing,
    showSuccess,
    inputMode,
    setInputMode,
    updateField,
    fetchFromLink,
    submitJob,
  };
}