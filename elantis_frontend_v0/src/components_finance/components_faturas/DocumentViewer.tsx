interface DocumentViewerProps {
  documents: string[];
  onClose: () => void;
}

export default function DocumentViewer({ documents, onClose }: DocumentViewerProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Documentos</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Fechar
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{doc}</h3>
                  <p className="text-sm text-gray-500">PDF • {Math.floor(Math.random() * 1000)} KB</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    Visualizar
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}