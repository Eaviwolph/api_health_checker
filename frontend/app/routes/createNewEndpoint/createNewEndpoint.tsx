import React, { useState } from "react";
import { useNavigate } from "react-router";

import "./createNewEndpoint.css";
import { requester } from "../../components/requester";

type CreateEndpointFormData = {
  name: string;
  url: string;
  method: "GET" | "POST";
  expected_status: number;
};

export default function CreateNewEndpoint() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateEndpointFormData>({
    name: "",
    url: "",
    method: "GET",
    expected_status: 200,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "expected_status" ? parseInt(value, 10) || 200 : value,
    }));
  };

  const validateForm = (): boolean => {
    let isValid = true;

    if (!formData.name.trim()) {
      alert("Name is required");
      isValid = false;
    }

    if (!formData.url.trim()) {
      alert("URL is required");
      isValid = false;
    } else {
      try {
        new URL(formData.url);
      } catch {
        alert("Please enter a valid URL");
        isValid = false;
      }
    }

    if (!formData.method) {
      alert("Method is required");
      isValid = false;
    }

    if (formData.expected_status < 0) {
      alert("Status code must be a positive integer");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    requester("/", "POST", formData)
      .then((response) => {
        if (response.ok) {
          navigate("/");
        } else {
          alert("Failed to create endpoint. Please try again.");
          console.error("API Error:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Network Error:", error);
        alert("Network error. Please check your connection and try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="create-endpoint-container">
      <div className="create-endpoint-header">
        <h1>Create New Endpoint</h1>
        <p>Add a new API endpoint to monitor its health status</p>
      </div>

      <form onSubmit={handleSubmit} className="create-endpoint-form">
        <div className="form-group">
          <label htmlFor="name">Endpoint Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Production API"
            maxLength={255}
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">URL *</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder="https://api.example.com/health"
          />
        </div>

        <div className="form-group">
          <label htmlFor="method">HTTP Method *</label>
          <select
            id="method"
            name="method"
            value={formData.method}
            onChange={handleInputChange}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="expected_status">Expected Status Code *</label>
          <input
            type="number"
            id="expected_status"
            name="expected_status"
            value={formData.expected_status}
            onChange={handleInputChange}
            placeholder="200"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Endpoint"}
          </button>
        </div>
      </form>
    </div>
  );
}
