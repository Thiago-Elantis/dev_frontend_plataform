import { FiPlus, FiUpload } from 'react-icons/fi';

interface AgentHeaderProps {
  title: string;
  onAddAgent: () => void;
  onUploadDocuments: () => void;
}

export default function AgentHeader({ title, onAddAgent, onUploadDocuments }: AgentHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <div className="flex space-x-2">
        <button
          onClick={onUploadDocuments}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-50"
        >
          <FiUpload className="mr-2" />
          Upload Documentos
        </button>
        <button
          onClick={onAddAgent}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FiPlus className="mr-2" />
          Novo Fornecedor
        </button>
      </div>
    </div>
  );
}