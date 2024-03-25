defmodule GUSWeb.VisitController do
  @moduledoc """
  The Visit controller.
  """
  use GUSWeb, :controller
  use OpenApiSpex.ControllerSpecs

  alias GUS.Urls
  alias GUS.Urls.Visit
  alias GUSWeb.Schemas
  alias OpenApiSpex.Schema

  action_fallback(GUSWeb.FallbackController)

  tags ["visits"]

  operation :create,
    summary: "Create a visit for a short link",
    parameters: [
      link_slug: [
        in: :path,
        type: %Schema{type: :string},
        description: "The short slug of the link",
        example: "elixir",
        required: true
      ]
    ],
    request_body: {},
    responses: [
      created: {"Visit", "application/json", Schemas.VisitResponse},
      not_found: {"NotFound", "application/json", OpenApiSpex.JsonErrorResponse}
    ]

  def create(conn, %{"link_slug" => link_slug}) do
    link = Urls.get_by_slug!(link_slug)

    with {:ok, %Visit{} = visit} <- Urls.create_visit(link) do
      conn
      |> put_status(:created)
      |> render(:show, visit: visit, link: link)
    end
  end
end
