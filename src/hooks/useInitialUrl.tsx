import { useState, useEffect } from 'react';
import { Linking } from 'react-native';

// NOTE: unused, but keeping here for reference in future
// for when the app is opened from a deep link and is not opened
const useInitialURL = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      // Resolves to a link if one was used
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  }, []);

  return { url, processing };
};

export default useInitialURL;
