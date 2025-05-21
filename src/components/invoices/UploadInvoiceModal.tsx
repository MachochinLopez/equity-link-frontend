import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { StyledButton } from "@/components/common/StyledButton";
import { Spinner } from "@/components/common/Spinner";
import { Modal } from "@/components/common/Modal";

interface UploadInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => Promise<void>;
  isLoading: boolean;
}

export function UploadInvoiceModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: UploadInvoiceModalProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (
        selectedFile.type === "text/xml" ||
        selectedFile.name.endsWith(".xml")
      ) {
        setFile(selectedFile);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/xml": [".xml"],
    },
    maxFiles: 1,
  });

  const handleSubmit = async () => {
    if (file) {
      await onSubmit(file);
      setFile(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Subir Factura">
      <div className="p-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-gray-300 hover:border-primary"
            }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="text-sm">
              <p>Archivo seleccionado:</p>
              <p className="font-medium">{file.name}</p>
            </div>
          ) : (
            <div>
              <p className="text-gray-600">
                {isDragActive
                  ? "Suelta el archivo aquí"
                  : "Arrastra y suelta un archivo XML aquí, o haz clic para seleccionar"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Solo se aceptan archivos XML
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <StyledButton onClick={onClose} variant="secondary">
            Cancelar
          </StyledButton>
          <StyledButton onClick={handleSubmit} disabled={!file || isLoading}>
            {isLoading ? <Spinner size="sm" /> : "Subir"}
          </StyledButton>
        </div>
      </div>
    </Modal>
  );
}
