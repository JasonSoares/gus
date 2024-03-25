import { useState, useEffect } from 'react'
import { Link } from '../types/Link'
import { getStats } from '../services/api'
import { buildShortUrl } from '../services/url'
import { NavLink } from 'react-router-dom'

function Stats() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<boolean>(false)
  const [stats, setStats] = useState<Array<Link> | undefined>([])

  useEffect(() => {
    getStats().then((response) => {
      if (Array.isArray(response.data)) {
        setStats(response.data)
      }
    }).catch(() => {
      setError(true)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  function renderTable() {
    return (
      <table className="w-full w-min-sm text-sm text-left text-gray-700 mt-2 rtl:text-right border">
        <thead className="text-xs text-indigo-700 uppercase bg-indigo-200">
          <tr>
            <th scope="col" className="px-2 sm:px-6 py-3">Short URL</th>
            <th scope="col" className="px-2 sm:px-6 py-3">Original URL</th>
            <th scope='col' className="px-2 sm:px-6 py-3 text-right">Visits</th>
          </tr>
        </thead>
        <tbody>
          {stats?.map((link) => (
            <tr key={link.slug} className="border-b">
              <td className="px-2 sm:px-6 py-4"><a href={buildShortUrl(link.slug)} className="text-indigo-600 underline">{buildShortUrl(link.slug)}</a></td>
              <td className="px-2 sm:px-6 py-4">{link.url}</td>
              <td className="px-2 sm:px-6 py-4 text-right">{link.visit_count.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  function renderCsvDownload() {
    if (!stats || stats.length < 1) return null

    const csv = `Short URL,Original URL,Visits\n${stats.map((link) => {
      return `${buildShortUrl(link.slug)},${link.url},${link.visit_count}`
    }).join('\n')}`

    if (!csv) return null

    return (
      <a
        href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`}
        download="short-url-stats.csv"
        className="block text-center text-white bg-indigo-600 py-2 px-4 mt-4 rounded-md"
      >
        Download CSV
      </a>
    )
  }

  return (
    <>
      <div className="w-full mt-4 py-10 px-10 shadow-md bg-white">
        {stats && <h1 className="text-xl font-bold">Stats</h1>}
        {loading && <p className="text-center font-bold">Loading...</p>}
        {stats && stats.length > 0 && renderTable()}
        {stats && stats.length > 0 && renderCsvDownload()}
        {!stats?.length && !loading && !error && <p className="my-4">No short URLs yet. Go <NavLink className="underline text-indigo-600" to="/">create</NavLink> some!</p>}
        {error && <p className="my-4">Error loading stats</p>}
      </div>
    </>
  )
}

export default Stats
