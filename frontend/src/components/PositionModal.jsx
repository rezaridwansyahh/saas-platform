// src/components/PositionModal.jsx
import { useState, useEffect } from "react";

const PositionModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    positionData: [
      { key: "", value: "" },
      { key: "", value: "" },
      { key: "", value: "" },
    ],
  });

  useEffect(() => {
    if (initialData) {
      // Convert applicant object into array
      const positionDataArray = Object.entries(initialData.applicant || {}).map(
        ([k, v]) => ({ key: k, value: v })
      );
      while (positionDataArray.length < 3) {
        positionDataArray.push({ key: "", value: "" });
      }

      setFormData({
        name: initialData.name || "",
        positionData: positionDataArray.slice(0, 3),
      });
    } else {
      setFormData({
        name: "",
        positionData: [
          { key: "", value: "" },
          { key: "", value: "" },
          { key: "", value: "" },
        ],
      });
    }
  }, [initialData]);

  const handleChange = (index, field, val) => {
    setFormData((prev) => {
      const newPositionData = [...prev.positionData];
      newPositionData[index][field] = val;
      return { ...prev, positionData: newPositionData };
    });
  };

  const handleSubmit = () => {
    for (const pair of formData.positionData) {
      const keyFilled = pair.key.trim() !== "";
      const valueFilled = pair.value.trim() !== "";
      if (keyFilled !== valueFilled) {
        alert("Each Title must have a Description and vice versa.");
        return;
      }
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Position" : "Add Position"}
        </h2>

        {/* Position Name */}
        <input
          type="text"
          placeholder="Position Name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className="border rounded px-3 py-2 w-full mb-4"
          required
        />

        {/* Key-Value Pairs */}
        {formData.positionData.map((pair, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder={`Title ${index + 1}`}
              value={pair.key}
              onChange={(e) => handleChange(index, "key", e.target.value)}
              className="border rounded px-3 py-2 flex-1"
            />
            <input
              type="text"
              placeholder={`Description ${index + 1}`}
              value={pair.value}
              onChange={(e) => handleChange(index, "value", e.target.value)}
              className="border rounded px-3 py-2 flex-1"
            />
          </div>
        ))}

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {initialData ? "Save Changes" : "Add Position"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PositionModal;
