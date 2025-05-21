import Image from "next/image";
import { StyledButton } from "@/components/common/StyledButton";

interface TemporaryPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  temporaryPassword: string;
}

export function TemporaryPasswordModal({
  isOpen,
  onClose,
  temporaryPassword,
}: TemporaryPasswordModalProps) {
  if (!isOpen) return null;

  const handleCopyPassword = () => {
    console.log(temporaryPassword);
    navigator.clipboard.writeText(temporaryPassword);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-[1000]"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-md relative z-[1010]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-gray-100 hover:cursor-pointer p-2 rounded-full"
        >
          <Image
            src="/assets/images/close.svg"
            alt="Cerrar"
            width={20}
            height={20}
          />
        </button>
        <h2 className="text-2xl font-bold mb-6 pr-8">Contraseña Temporal</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            El usuario ha sido creado exitosamente. A continuación se muestra la
            contraseña temporal que deberá usar para iniciar sesión por primera
            vez:
          </p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 p-3 bg-gray-100 rounded-lg font-mono text-center">
              {temporaryPassword}
            </div>
            <StyledButton
              onClick={handleCopyPassword}
              className="whitespace-nowrap"
            >
              Copiar
            </StyledButton>
          </div>
          <p className="text-sm text-gray-500">
            Por favor, asegúrese de compartir esta contraseña con el usuario de
            manera segura.
          </p>
          <div className="flex justify-end mt-6">
            <StyledButton onClick={onClose}>Continuar</StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
}
