defmodule GUS.Urls.Link do
  @moduledoc """
  Schema representing a Link
  """
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Phoenix.Param, key: :slug}
  schema "links" do
    field(:url, :string)
    field(:slug, :string)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(link, attrs) do
    link
    |> cast(attrs, [:url])
    |> ensure_valid_url()
    |> put_change(:slug, generate_slug())
    |> validate_required([:url, :slug])
    |> unique_constraint(:slug)
  end

  defp ensure_valid_url(changeset) do
    validate_change(changeset, :url, fn _, url ->
      validate_url(url)
    end)
  end

  defp generate_slug(), do: GUS.Slug.random()

  defp valid_host?(host) when is_binary(host), do: String.trim(host) != ""
  defp valid_host?(_), do: false

  defp valid_scheme?(scheme) when is_binary(scheme), do: scheme in ["http", "https"]
  defp valid_scheme?(_), do: false

  defp validate_url(url) do
    %{host: host, scheme: scheme} = URI.parse(url)

    cond do
      not valid_scheme?(scheme) ->
        [url: "is expected to start with http or https"]

      not valid_host?(host) ->
        [url: "is expected to include the host"]

      true ->
        []
    end
  end
end
