import React from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {
  const query = useQuery();
  const q = query.get('q');

  return (
    <div>
      <h2>نتایج جستجو</h2>
      <p>در اینجا نتایج برای: <strong>{q || '—'}</strong></p>
      {/* در مرحله بعد اینجا کارت‌های نتایج از TMDB نمایش داده می‌شوند */}
    </div>
  )
}
