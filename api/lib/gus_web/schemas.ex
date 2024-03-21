defmodule GUSWeb.Schemas do
  require OpenApiSpex
  alias OpenApiSpex.Schema

  defmodule Link do
    OpenApiSpex.schema(%{
      title: "Link",
      description: "A mapping of a short slug to a URL",
      type: :object,
      properties: %{
        id: %Schema{type: :integer, description: "The unique identifier of the link"},
        slug: %Schema{type: :string, description: "The short slug of the link"},
        url: %Schema{type: :string, description: "The URL at which the link points"}
      },
      required: [:url],
      example: %{
        id: 1,
        slug: "elixir",
        url: "https://elixir-lang.org/"
      }
    })
  end

  defmodule LinkRequest do
    OpenApiSpex.schema(%{
      title: "LinkRequest",
      description: "POST body for creating a link",
      type: :object,
      properties: %{
        link: %Schema{anyOf: [Link]}
      },
      required: [:link],
      example: %{
        "link" => %{
          "url" => "https://elixir-lang.org/"
        }
      }
    })
  end

  defmodule LinkResponse do
    OpenApiSpex.schema(%{
      title: "LinkResponse",
      description: "The response to a successful link creation",
      type: :object,
      properties: %{
        data: Link
      },
      example: %{
        "data" => %{
          "id" => 1,
          "slug" => "elixir",
          "url" => "https://elixir-lang.org/"
        }
      },
      "x-struct": __MODULE__
    })
  end

  defmodule LinksResponse do
    OpenApiSpex.schema(%{
      title: "LinksResponse",
      description: "Response for listing multiple links",
      type: :object,
      properties: %{
        data: %Schema{description: "A list of links", type: :array, items: Link}
      },
      example: %{
        "data" => [
          %{
            "id" => 1,
            "slug" => "elixir",
            "url" => "https://elixir-lang.org/"
          },
          %{
            "id" => 2,
            "slug" => "phoenix",
            "url" => "https://www.phoenixframework.org/"
          }
        ]
      },
      "x-struct": __MODULE__
    })
  end
end
