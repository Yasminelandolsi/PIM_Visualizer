import { CheckCircleIcon, XCircleIcon } from "lucide-react";

interface QualityControlProps {
  verified: boolean;
}

const QualityControl: React.FC<QualityControlProps> = ({ verified }) => {
  return (
    <div className="w-full flex items-center justify-center space-x-2">
      {verified ? (
        <>
          <CheckCircleIcon className="text-green-500" size={20} />
          <span className="font-medium">checked</span>
        </>
      ) : (
        <>
          <XCircleIcon className="text-gray-400" size={20} />
          <span className="font-medium text-gray-500">Not yet checked</span>
        </>
      )}
    </div>
  );
};

export default QualityControl;