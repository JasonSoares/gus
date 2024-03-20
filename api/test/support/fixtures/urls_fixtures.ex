defmodule GUS.UrlsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `GUS.Urls` context.
  """

  @doc """
  Generate a link.
  """
  def link_fixture(attrs \\ %{}) do
    {:ok, link} =
      attrs
      |> Enum.into(%{
        url: "https://www.example.com"
      })
      |> GUS.Urls.create_link()

    link
  end
end
