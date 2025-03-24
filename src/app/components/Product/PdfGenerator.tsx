'use client'
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Button } from "@mako/core";

interface PdfGeneratorProps {
  buttonLabel?: string;
  className?: string;
  onGenerate?: () => void;
  productInfoSelector?: string;
  filename?: string;
}

const PdfGenerator: React.FC<PdfGeneratorProps> = ({ 
  buttonLabel = "Generate PDF", 
  className = "",
  onGenerate,
  productInfoSelector = "#product-info-main",
  filename = "product-information.pdf"
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  
  const handleGeneratePdf = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    console.log("Starting PDF generation...");
    
    // Create a loading indicator
    const loadingEl = document.createElement('div');
    loadingEl.style.position = 'fixed';
    loadingEl.style.top = '0';
    loadingEl.style.left = '0';
    loadingEl.style.width = '100%';
    loadingEl.style.height = '100%';
    loadingEl.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    loadingEl.style.display = 'flex';
    loadingEl.style.justifyContent = 'center';
    loadingEl.style.alignItems = 'center';
    loadingEl.style.zIndex = '9999';
    loadingEl.innerHTML = '<div style="padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">Generating PDF...</div>';
    document.body.appendChild(loadingEl);
    loadingRef.current = loadingEl;
    
    try {
      // Find the product info element in the DOM
      const element = document.querySelector(productInfoSelector);
      
      if (!element) {
        throw new Error(`Element with selector '${productInfoSelector}' not found in DOM`);
      }
      
      // Create a temporary wrapper div for our clone
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '800px'; // Fixed width for consistent rendering
      document.body.appendChild(tempContainer);
      
      // Clone the element to modify it for better PDF generation
      const clonedElement = element.cloneNode(true) as HTMLElement;
      tempContainer.appendChild(clonedElement);
      
      // Apply a stylesheet to neutralize problematic styles
      const cleanStylesheet = document.createElement('style');
      cleanStylesheet.textContent = `
        .pdf-clone * {
          font-family: Arial, sans-serif !important;
          color: #000 !important;
          background: #fff !important;
          border-color: #ccc !important;
          background-image: none !important;
          box-shadow: none !important;
          text-shadow: none !important;
        }
        .pdf-clone th, .pdf-clone td {
          padding: 8px;
          border-color: #ddd;
        }
        .pdf-clone button,
        .pdf-clone a[role="button"] {
          display: none !important;
        }
      `;
      document.head.appendChild(cleanStylesheet);
      
      // Give the clone a specific ID/class for our stylesheet
      clonedElement.classList.add('pdf-clone');
      
      // Process images in cloned element
      const images = clonedElement.querySelectorAll('img');
      images.forEach(img => {
        // Make sure image src is absolute for PDF
        if (img.src.startsWith('/')) {
          img.src = window.location.origin + img.src;
        }
        // Add crossorigin attribute for CORS support
        img.setAttribute('crossorigin', 'anonymous');
      });
      
      // Handle SVGs with potential OKLCH colors
      const svgs = clonedElement.querySelectorAll('svg');
      svgs.forEach(svg => {
        const paths = svg.querySelectorAll('path, rect, circle, ellipse, line, polyline, polygon');
        paths.forEach(path => {
          if (path instanceof SVGElement) {
            // Remove any fill or stroke that might use OKLCH
            path.setAttribute('fill', 'currentColor');
            path.setAttribute('stroke', 'currentColor');
          }
        });
      });
      
      // Recursively process styles to replace OKLCH colors
      const sanitizeStyles = (element: HTMLElement) => {
        // Set safe styles for this element
        element.style.color = '#000000';
        element.style.backgroundColor = '#FFFFFF';
        element.style.borderColor = '#CCCCCC';
        element.style.backgroundImage = 'none';
        
        // Process children
        Array.from(element.children).forEach(child => {
          if (child instanceof HTMLElement) {
            sanitizeStyles(child);
          }
        });
      };
      
      // Apply safe styles to the cloned element
      sanitizeStyles(clonedElement);
      
      // Force layout recalculation
      clonedElement.getBoundingClientRect();
      
      // Capture the sanitized element
      const canvas = await html2canvas(clonedElement, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFFFFF',
        logging: false,
        onclone: (doc) => {
          // Final passes of style removal in cloned document
          const clone = doc.querySelector('.pdf-clone');
          if (clone && clone instanceof HTMLElement) {
            sanitizeStyles(clone);
          }
        }
      });
      
      // Create PDF from canvas
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
      });
      
      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Save the PDF
      pdf.save(filename);
      
      // Clean up
      document.body.removeChild(tempContainer);
      document.head.removeChild(cleanStylesheet);
      
      console.log("PDF generated successfully");
      
      // Call the onGenerate callback if provided
      if (onGenerate) {
        onGenerate();
      }
    } catch (error) {
      console.error("Error in PDF generation:", error);
      alert("Failed to generate PDF. Please try again later.");
    } finally {
      // Remove loading indicator
      if (loadingRef.current) {
        document.body.removeChild(loadingRef.current);
        loadingRef.current = null;
      }
      setIsGenerating(false);
    }
  };

  return (
    <div className={className}>
      <Button
        shape="round"
        size="large"
        variant="primary"
        style={{ backgroundColor: '#041e50', color: 'white' }}
        onClick={handleGeneratePdf}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            {buttonLabel}
          </>
        )}
      </Button>
    </div>
  );
};

export default PdfGenerator;