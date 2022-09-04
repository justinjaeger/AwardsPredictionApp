import { DataStore } from '@aws-amplify/datastore';
import React, { useEffect, useState } from 'react';
import { SongDraft } from '../../models';

const ApproveSongs = () => {
  const [songs, setSongs] = useState<SongDraft[]>([]);

  // Subscribe to SongDrafts
  useEffect(() => {
    // later we'll just use userId to get the user whose profile it is, but I want all users for experiment
    const sub = DataStore.observeQuery(SongDraft).subscribe(({ items }) => {
      setSongs(items);
    });
    return () => sub.unsubscribe();
  }, []);

  return <></>;
};

export default ApproveSongs;
