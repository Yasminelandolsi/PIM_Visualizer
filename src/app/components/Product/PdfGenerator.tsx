'use client'
import React, { useState } from 'react';
import { Button } from "@mako/core";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PdfGeneratorProps {
  buttonLabel?: string;
  className?: string;
  onGenerate?: () => void;
  productInfoSelector?: string;
}

const PdfGenerator: React.FC<PdfGeneratorProps> = ({ 
  buttonLabel = "Generate PDF", 
  className = "",
  onGenerate,
  productInfoSelector = "#product-info-main"
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
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
    
    try {
      // Find the product info element in the DOM
      const element = document.querySelector(productInfoSelector);
      
      if (!element) {
        console.error("Could not find product info element with selector:", productInfoSelector);
        alert(`Could not find product information with selector: ${productInfoSelector}`);
        setIsGenerating(false);
        return;
      }
      
      // Important: Fix Next.js Image components before capturing
      const nextImages = element.querySelectorAll('[style*="objectFit"]');
      nextImages.forEach(img => {
        if (img instanceof HTMLImageElement) {
          const parent = img.parentElement;
          
          // Create a standard img tag to replace it
          if (parent && img.src) {
            const standardImg = document.createElement('img');
            standardImg.src = img.src;
            standardImg.alt = img.alt || 'Product image';
            standardImg.style.maxWidth = '100%';
            standardImg.style.height = 'auto';
            standardImg.style.display = 'block';
            standardImg.style.margin = '0 auto';
            
            // Store reference to replace back later
            img.dataset.replaced = 'true';
            parent.insertBefore(standardImg, img);
            img.style.display = 'none';
          }
        }
      });
      
      // Clone the element to modify it for better PDF generation
      const clonedElement = element.cloneNode(true) as HTMLElement;
      
      // Preserve styles better by copying computed styles
      const preserveStyles = (sourceEl: HTMLElement, targetEl: HTMLElement) => {
        const computedStyle = window.getComputedStyle(sourceEl);
        
        // Only copy certain properties to avoid issues with oklch
        const propertiesToCopy = [
          'display', 'width', 'height', 'margin', 'padding', 
          'border', 'borderRadius', 'fontSize', 'fontWeight', 
          'textAlign', 'lineHeight'
        ];
        
        propertiesToCopy.forEach(prop => {
          // @ts-expect-error - dynamic property access for style properties
          targetEl.style[prop] = computedStyle[prop];
        });
        
        // Process children recursively
        const sourceChildren = Array.from(sourceEl.children);
        const targetChildren = Array.from(targetEl.children);
        
        for (let i = 0; i < Math.min(sourceChildren.length, targetChildren.length); i++) {
          if (sourceChildren[i] instanceof HTMLElement && 
              targetChildren[i] instanceof HTMLElement) {
            preserveStyles(
              sourceChildren[i] as HTMLElement, 
              targetChildren[i] as HTMLElement
            );
          }
        }
      };
      
      // Preserve styles from original to clone
      preserveStyles(element as HTMLElement, clonedElement);
      
      // Remove any buttons or interactive elements
      const buttons = clonedElement.querySelectorAll('button');
      buttons.forEach(btn => btn.remove());
      
      // Simplify styling to avoid oklch color issues but preserve layout
      const simplifyStyles = (el: HTMLElement) => {
        // Basic reset to avoid incompatible color values
        el.style.color = '#000000';
        
        // Keep backgrounds but simplify
        if (getComputedStyle(el).backgroundColor !== 'rgba(0, 0, 0, 0)') {
          el.style.backgroundColor = '#FFFFFF';
        }
        
        // Keep borders but simplify
        if (el.style.borderColor) {
          el.style.borderColor = '#CCCCCC';
        }
        
        // Process children recursively
        Array.from(el.children).forEach(child => {
          if (child instanceof HTMLElement) {
            simplifyStyles(child);
          }
        });
      };
      
      // Apply simplified styles to avoid color issues
      simplifyStyles(clonedElement);
      
      // We need explicit width to ensure layout is preserved
      clonedElement.style.width = element.clientWidth + 'px';
      clonedElement.style.maxWidth = '100%';
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      document.body.appendChild(clonedElement);
      
      // Ensure all images are loaded before capturing
      const images = Array.from(clonedElement.querySelectorAll('img'));
      console.log(`Found ${images.length} images in cloned element`);
      
      // Wait for all images to be loaded
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => {
            console.warn('Image failed to load:', img.src);
            resolve();  // Continue even if image fails
          };
          // Ensure the image has a src
          if (!img.src && img.srcset) {
            // Try to extract src from srcset if available
            const srcMatch = img.srcset.match(/^\S+/);
            if (srcMatch) img.src = srcMatch[0];
          }
          if (!img.src) img.src = '/placeholder.png';
        });
      }));
      
      console.log('All images loaded, capturing element...');
      
      // Capture the element with html2canvas
      const canvas = await html2canvas(clonedElement, {
        scale: 2,  // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFFFFF',
        logging: false,  // Disable logging in production
        ignoreElements: (element) => {
          // Ignore elements that might cause problems
          return element.tagName === 'BUTTON' || 
                 element.classList.contains('ignore-pdf');
        },
        onclone: (doc) => {
          // Final touches to the cloned document
          const clone = doc.querySelector(productInfoSelector);
          if (clone && clone instanceof HTMLElement) {
            clone.style.overflow = 'visible';
            clone.style.height = 'auto';
          }
        }
      });
      
      // Clean up the cloned element
      document.body.removeChild(clonedElement);
      
      // Restore original images
      nextImages.forEach(img => {
        if (img instanceof HTMLImageElement && img.dataset.replaced) {
          const parent = img.parentElement;
          const replacement = parent?.querySelector('img:not([data-replaced])');
          if (parent && replacement) {
            parent.removeChild(replacement);
            img.style.display = '';
          }
        }
      });
      
      // Create and save PDF
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate image dimensions to preserve aspect ratio
      const imgWidth = pdfWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add the image to PDF
      pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
      
      // Add a footer
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, pdfWidth / 2, pdfHeight - 10, { align: 'center' });
      
      // Get product name for the filename
      const productNameEl = element.querySelector('h2');
      const fileName = productNameEl?.textContent 
        ? `${productNameEl.textContent.replace(/\s+/g, '_')}.pdf` 
        : 'product_information.pdf';
      
      pdf.save(fileName);
      console.log("PDF generated successfully");
      
      if (onGenerate) {
        onGenerate();
      }
    } catch (error) {
      console.error("Error in PDF generation:", error);
      alert("There was a problem generating the PDF. Please try again.");
    } finally {
      // Always clean up
      if (document.body.contains(loadingEl)) {
        document.body.removeChild(loadingEl);
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
        {isGenerating ? "Generating..." : buttonLabel}
      </Button>
    </div>
  );
};

export default PdfGenerator;