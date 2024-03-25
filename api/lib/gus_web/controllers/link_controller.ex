defmodule GUSWeb.LinkController do
  @moduledoc """
  The Link controller.
  """
  use GUSWeb, :controller
  use OpenApiSpex.ControllerSpecs

  alias GUS.Urls
  alias GUS.Urls.Link
  alias GUSWeb.Schemas
  alias OpenApiSpex.Schema

  action_fallback(GUSWeb.FallbackController)

  tags ["links"]

  operation :index,
    summary: "List short links",
    responses: [
      ok: {"Links", "application/json", Schemas.LinksResponse}
    ]

  def index(conn, _params) do
    links = Urls.list_links()
    render(conn, :index, links: links)
  end

  operation :show,
    summary: "Get a short link",
    parameters: [
      slug: [
        in: :path,
        type: %Schema{type: :string},
        description: "The short slug of the link",
        example: "elixir",
        required: true
      ]
    ],
    responses: %{
      ok: {"Link", "application/json", Schemas.LinkResponse},
      not_found: {"NotFound", "application/json", OpenApiSpex.JsonErrorResponse}
    }

  def show(conn, %{"slug" => slug}) do
    link = Urls.get_by_slug!(slug)
    render(conn, :show, link: link)
  end

  operation :create,
    summary: "Create a short link",
    parameters: [],
    request_body: {"Link params", "application/json", Schemas.LinkRequest, required: true},
    responses: [
      created: {"Link", "application/json", Schemas.LinkResponse},
      unprocessable_entity:
        {"Unprocessable Entity", "application/json", OpenApiSpex.JsonErrorResponse}
    ]

  def create(conn, %{"link" => link_params}) do
    with {:ok, %Link{} = link} <- Urls.create_link(link_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/links/#{link}")
      |> render(:show, link: link)
    end
  end
end
