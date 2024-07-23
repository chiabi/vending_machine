import { useState } from 'react';
import { ModelViewer } from './components/ModelViewer';
import { LoadingOverlay } from './components/LoadingOverlay';

function App() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  return (
    <>
      <ModelViewer
        onProgress={setProgress}
        onLoadComplete={handleLoadComplete}
      />
      <LoadingOverlay progress={progress} isLoading={isLoading} />
    </>
  );
}

export default App;
