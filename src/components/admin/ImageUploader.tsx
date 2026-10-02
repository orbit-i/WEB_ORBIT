import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Link, Check, Sparkles, RefreshCw } from 'lucide-react';

export interface ImagePreset {
  label: string;
  url: string;
}

interface ImageUploaderProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  presets?: ImagePreset[];
  aspectRatio?: 'square' | 'wide' | 'avatar' | 'auto';
  helperText?: string;
  placeholder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label = 'Upload Image',
  value = '',
  onChange,
  presets = [
    { label: 'CEO Abdul Samad', url: '/AbdulSamad.jpeg' },
    { label: 'Orbit Logo', url: '/orbit-circular-logo.png' },
    { label: 'Dark Branding', url: '/orbit-logo-dark.png' },
  ],
  aspectRatio = 'auto',
  helperText = 'Upload JPG, PNG, WebP or SVG from your device (Drag & Drop supported)',
  placeholder = 'Select image or paste URL...',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState(value);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setUploadError(null);
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }
    // Check size (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size exceeds 5MB. Please choose a smaller image for best performance.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        onChange(dataUrl);
        setUrlInput('');
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setShowUrlInput(false);
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Compute preview container aspect ratio
  const previewClass =
    aspectRatio === 'avatar'
      ? 'w-24 h-24 rounded-full'
      : aspectRatio === 'square'
      ? 'w-32 h-32 rounded-2xl'
      : aspectRatio === 'wide'
      ? 'w-full h-36 rounded-2xl'
      : 'w-full max-h-48 h-36 rounded-2xl';

  return (
    <div className="space-y-2.5">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-mono font-semibold text-gray-700">
            {label}
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="text-[11px] font-mono text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Link className="h-3 w-3" />
              <span>{showUrlInput ? 'Hide URL Input' : 'Enter URL / Preset'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Current Preview or Drag Zone */}
      {value ? (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
          <div
            className={`${previewClass} shrink-0 bg-gray-900 border border-gray-200 overflow-hidden flex items-center justify-center relative shadow-xs group`}
          >
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/orbit-circular-logo.png';
              }}
            />
          </div>

          <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left w-full">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <Check className="h-3 w-3" />
                <span>Image Loaded</span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono truncate max-w-[200px]">
                {value.startsWith('data:') ? 'Local file uploaded (Base64)' : value}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-black hover:bg-gray-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Change Image</span>
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <X className="h-3 w-3" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Upload Zone */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50/60 scale-[1.01]'
              : 'border-gray-300 hover:border-black bg-gray-50/50 hover:bg-gray-50'
          }`}
        >
          <div className="mx-auto w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-2">
            <UploadCloud className="h-5 w-5" />
          </div>
          <p className="text-xs font-bold text-gray-800">
            Click to upload from device <span className="text-gray-500 font-normal">or drag &amp; drop</span>
          </p>
          <p className="text-[11px] text-gray-500 mt-1 font-mono">{helperText}</p>
        </div>
      )}

      {/* URL Input Bar (Toggled) */}
      {showUrlInput && (
        <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-2 text-xs">
          <label className="block text-[11px] font-bold text-gray-700">
            Direct Image Link / CDN Path
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="/images/example.jpg or https://..."
              className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-mono focus:border-black focus:outline-none"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-bold hover:bg-gray-800"
            >
              Apply
            </button>
          </div>

          {/* Quick Presets */}
          {presets && presets.length > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <span className="text-[10px] font-mono text-gray-400 block mb-1">
                Quick Orbit Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => {
                      onChange(p.url);
                      setUrlInput(p.url);
                    }}
                    className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[11px] font-mono transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Error Banner */}
      {uploadError && (
        <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center justify-between">
          <span>{uploadError}</span>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-red-500 hover:text-red-800"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};
