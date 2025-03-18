// components/QualityControl.tsx
import { CheckCircleIcon, XCircleIcon } from "lucide-react";

interface QualityControlProps {
  verified: boolean;
}

const QualityControl: React.FC<QualityControlProps> = ({ verified }) => {
  return (
    <div className="flex items-center space-x-2">
      {verified ? (
        <CheckCircleIcon className="text-green-500" size={20} />
      ) : (
        <XCircleIcon className="text-gray-400" size={20} />
      )}
      <span className="text-gray-600">{verified ? "Vérifié" : "Non vérifié"}</span>
    </div>
  );
};

export default QualityControl;
