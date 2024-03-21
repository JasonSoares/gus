defmodule GUSWeb.ApiSpec do
  @moduledoc false

  alias OpenApiSpex.{Info, OpenApi, Paths, Server}
  alias GUSWeb.{Endpoint, Router}

  @behaviour OpenApi

  @impl OpenApi
  def spec do
    %OpenApi{
      servers: [
        Server.from_endpoint(Endpoint)
      ],
      info: %Info{
        title: "GUS Url Shortener API",
        version: "0.1.0"
      },
      paths: Paths.from_router(Router)
    }
    |> OpenApiSpex.resolve_schema_modules()
  end
end
