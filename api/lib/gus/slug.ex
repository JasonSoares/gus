defmodule GUS.Slug do
  @moduledoc """
  Slug generator module
  """

  @mininum_length 6

  @doc """
  Generates a random slug of a given length.
  """
  @spec random(integer) :: String.t() | ArgumentError.t()
  def random(length) when length >= @mininum_length do
    # Extra bytes to allow us to replace the non-alphanumeric characters and still end up with a minimal length.
    :crypto.strong_rand_bytes(length * 2)
    |> Base.url_encode64(padding: false)
    |> String.replace(~r/[^A-Za-z0-9]/, "")
    |> String.slice(0..(length - 1))
  end

  def random(_) do
    raise ArgumentError, "Slug length must be >= #{@mininum_length}"
  end
end
