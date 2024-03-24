import { useState, useEffect } from "react";
import { createVisit } from "../services/api";
import { useParams } from "react-router-dom";

type PageState = "loading" | "error" | "success";

function renderPageState(pageState: PageState, url?: string) {
  switch (pageState) {
    case 'loading':
      return <p>Creating visit...</p>
    case 'error':
      return <p>Error creating visit</p>
    case 'success':
      return <p>Redirecting to {`${url}`}...</p>
  }
}

function Visit() {
  const { slug } = useParams<{ slug: string }>()
  const [pageState, setPageState] = useState<PageState>('loading')
  const [url, setUrl] = useState<string | undefined>(undefined)

  const createTheVisit = async () => {
    if (!slug || slug.trim().length < 1) {
      setPageState('error');
      return;
    }

    if (pageState !== 'loading') return

    try {
      const { data } = await createVisit(slug);
      const url = data?.url;

      if (!url) {
        setPageState('error');
        return;
      }

      setUrl(url);
      setPageState('success');
      setTimeout(() => window.location.replace(url));
    } catch {
      setPageState('error');
    }
  }

  useEffect(() => {
    createTheVisit()
  })

  return(
  <>
  {renderPageState(pageState, url)}
  </>)
}

export default Visit;
