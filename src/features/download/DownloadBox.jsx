import { useEffect, useState } from 'react';
import SpinnerMini from '../../ui/SpinnerMini';
import { useParams } from 'react-router-dom';
import { getAllFileFormats, download } from '../../services/apiDownload';
import { useNavigateItems } from '../../context/NavigateItemContext';

function DownloadBox() {
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { curSources } = useNavigateItems();

  const { novelId, chapterId } = useParams();

  const handleDownLoad = (data, fileName, type) => {
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: `application/${type}` });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleFetchDownloadRequest = async type => {
    const requestBody = {
      novel_id: novelId,
      chapter_id: chapterId,
      type: type.toLowerCase(),
      domain: curSources[0]?.Id,
    };

    const data = await download(requestBody);

    handleDownLoad(data.bytes, data.filename, data.type);
  };

  useEffect(function () {
    async function getAllTypes() {
      setIsLoading(true);

      const data = await getAllFileFormats();
      setTypes(data);

      setIsLoading(false);
    }

    getAllTypes();
  }, []);

  return (
    <div className="absolute flex h-24 w-40 flex-col items-center justify-between rounded-lg bg-sky-950 px-3 py-2 text-white shadow-lg hover:bg-sky-950 hover:text-white">
      {isLoading ? (
        <SpinnerMini />
      ) : (
        <>
          <h3 className="text-medium">Định dạng</h3>
          <div className="flex gap-4">
            {types?.map(type => (
              <div
                key={type}
                className={`rounded-md shadow-lg ${type === 'PDF' ? 'bg-rose-700' : 'bg-sky-700'}`}
              >
                <label
                  className="cursor-pointer px-3 py-2"
                  htmlFor={type.toLowerCase()}
                >
                  .{type.toLowerCase()}
                </label>
                <input
                  type="radio"
                  className="hidden"
                  id={type.toLowerCase()}
                  name="format"
                  value={type.toLowerCase()}
                  onClick={e => handleFetchDownloadRequest(e.target.value)}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default DownloadBox;
