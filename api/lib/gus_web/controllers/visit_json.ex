defmodule GUSWeb.VisitJSON do
  alias GUS.Urls.Link
  alias GUS.Urls.Visit

  @doc """
  Renders a single visit.
  """
  def show(%{visit: visit, link: link}) do
    %{data: data(visit, link)}
  end

  defp data(%Visit{} = visit, %Link{} = link) do
    %{
      id: visit.id,
      url: link.url
    }
  end
end
