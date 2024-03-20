defmodule GUSWeb.LinkController do
  @moduledoc """
  The Link controller.
  """
  use GUSWeb, :controller

  alias GUS.Urls
  alias GUS.Urls.Link

  action_fallback(GUSWeb.FallbackController)

  def index(conn, _params) do
    links = Urls.list_links()
    render(conn, :index, links: links)
  end

  def show(conn, %{"id" => slug}) do
    link = Urls.get_by_slug!(slug)
    render(conn, :show, link: link)
  end

  def create(conn, %{"link" => link_params}) do
    with {:ok, %Link{} = link} <- Urls.create_link(link_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/links/#{link}")
      |> render(:show, link: link)
    end
  end
end
