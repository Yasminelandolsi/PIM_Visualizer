import React, { useEffect, useState } from "react";

const TechnicalSheet: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchTechnicalSheet = async () => {
      try {
        const response = await fetch("https://api.example.com/technical-sheet"); // Replace with actual API
        const data = await response.json();
        setPdfUrl(data.pdfUrl); // Assuming the API response contains { pdfUrl: "link-to-pdf" }
      } catch (error) {
        console.error("Error fetching technical sheet:", error);
      }
    };

    fetchTechnicalSheet();
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-700" style={{ color: '#041e50' }}>Documentation</h3>
      {pdfUrl ? (
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-4 border rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          <img src="/pdf-icon.png" alt="Technical Sheet" className="w-12 h-12 mb-2" />
          <span className="text-sm font-medium text-gray-700">Technical sheet</span>
        </a>
      ) : (
        <p className="text-gray-500 text-sm">No technical sheet available</p>
      )}
    </div>
  );
};

export default TechnicalSheet;
