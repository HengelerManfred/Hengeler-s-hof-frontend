"use client";

import React, {
  useState,
  useRef,
  useCallback,
  CSSProperties,
  useEffect,
} from "react";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";

type ImagePickerProps = {
  onPreviewsChange: (previews: File[]) => void;
  initialPreviews?: File[];
  maxFiles?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
};

export function ImagePicker({
  onPreviewsChange,
  initialPreviews = [],
  maxFiles = 3,
  width = 130,
  height = 80,
  className = "",
}: ImagePickerProps) {
  const [files, setFiles] = useState<File[]>(initialPreviews);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const objectUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  useEffect(() => {
    setFiles(initialPreviews);
  }, [initialPreviews]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const replaceIndexRef = useRef<number | null>(null);

  const update = (newFiles: File[]) => {
    previews.forEach(url => URL.revokeObjectURL(url));
    setFiles(newFiles);
    onPreviewsChange(newFiles);
    setPreviews(newFiles.map((file) => URL.createObjectURL(file)));
  };

  const onDrop = useCallback(
    (accepted: File[]) => {
      if (!accepted.length) return;

      if (replaceIndexRef.current !== null) {
        const newList = [...files];
        newList[replaceIndexRef.current] = accepted[0];
        update(newList);
        replaceIndexRef.current = null;
      } else {
        const combined = [...files, ...accepted].slice(0, maxFiles);
        update(combined);
      }
    },
    [files, maxFiles]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    noClick: true,
    multiple: true,
    maxFiles,
  });

  const triggerReplace = (index: number) => {
    replaceIndexRef.current = index;
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    update(updated);
  };

  const boxStyle: CSSProperties = {
    width: typeof width === "number" ? `${width}%` : width,
    height: typeof height === "number" ? `${height}vw` : height,
    border: "2px dashed var(--section-border)",
    background: "var(--section-bg)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
    cursor: "pointer",
    position: "relative",
  };

  return (
    <div
      className={`flex flex-wrap gap-3 items-center ${className}`}
      {...getRootProps()}
    >
      {files.length < maxFiles && (
        <div style={boxStyle} className="min-h-[80px]" onClick={open}>
          <input {...getInputProps()} />
          <span
            style={{
              fontSize: 24,
              color: "var(--section-border)",
              userSelect: "none",
            }}
          >
            +
          </span>
        </div>
      )}

      {previews.map((src, idx) => (
        <div
          key={idx}
          style={{ ...boxStyle, border: "1px solid var(--section-border)" }}
          className="min-h-[80px]"
        >
          <img
            src={src}
            alt={`preview-${idx}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="!min-h-[80px]"
            onClick={() => triggerReplace(idx)}
          />
          <CloseIcon
            fontSize="small"
            onClick={(e) => {
              e.stopPropagation();
              removeImage(idx);
            }}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              backgroundColor: "rgba(255,255,255,0.7)",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        </div>
      ))}

      <input
        type="file"
        accept="image/*"
        className="!min-h-[80px]"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          if (!e.target.files?.length) return;
          onDrop([e.target.files[0]]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
