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
      <table className="w-full w-min-sm text-sm text-left text-indigo-500 mt-2 rtl:text-right border">
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
              <td className="px-2 sm:px-6 py-4">{buildShortUrl(link.slug)}</td>
              <td className="px-2 sm:px-6 py-4">{link.url}</td>
              <td className="px-2 sm:px-6 py-4 text-right">{link.visit_count.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <>
      <div className="w-full mt-4 py-10 px-10 shadow-md bg-white">
        {stats && <h1 className="text-xl font-bold">Stats</h1>}
        {loading && <p className="text-center font-bold">Loading...</p>}
        {stats && renderTable()}
        {!stats?.length && !loading && !error && <p className="my-4">No short URLs yet. Go <NavLink className="underline text-indigo-600" to="/">create</NavLink> some!</p>}
        {error && <p className="my-4">Error loading stats</p>}
      </div>
    </>
  )
}

export default Stats
