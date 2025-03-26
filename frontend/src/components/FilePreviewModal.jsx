const FilePreviewModal = ({ preview, onClose }) => {
    if (!preview) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-60 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
          >
            <X size={24} />
          </button>
          
          {preview.fileType.startsWith('image/') ? (
            <img 
              src={preview.dataUrl} 
              alt={preview.fileName} 
              className="max-w-full max-h-[80vh] mx-auto object-contain"
            />
          ) : (
            <div className="p-6 text-center">
              <p className="text-xl font-bold mb-4">Document Preview</p>
              <p>File Name: {preview.fileName}</p>
              <p>File Type: {preview.fileType}</p>
              <p className="text-gray-500 mt-4">This file type cannot be previewed directly</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  export default FilePreviewModal